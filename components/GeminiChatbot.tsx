'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function GeminiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hello! Welcome to our cafe. I'm your AI assistant powered by Google Gemini. How can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/gemini-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.response || 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again later.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="fixed right-6 bottom-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`bg-white rounded-2xl shadow-2xl mb-4 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
                            } flex flex-col overflow-hidden border border-[#E8DCC4]`}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#6B4423] to-[#8B6F47] text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                <div>
                                    <h3 className="font-bold text-sm">Cafe AI Assistant</h3>
                                    <p className="text-xs opacity-90">Powered by Gemini Flash 2.5</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="hover:bg-white/20 p-1 rounded transition-colors"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="hover:bg-white/20 p-1 rounded transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5E6D3]">
                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === 'user'
                                                    ? 'bg-[#D4AF37] text-[#2C1810]'
                                                    : 'bg-white text-[#2C1810] border border-[#E8DCC4]'
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed">{message.content}</p>
                                                <p className="text-xs opacity-60 mt-1">
                                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white rounded-2xl px-4 py-3 border border-[#E8DCC4]">
                                                <div className="flex gap-1">
                                                    <motion.div
                                                        className="w-2 h-2 bg-[#6B4423] rounded-full"
                                                        animate={{ y: [0, -8, 0] }}
                                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                    />
                                                    <motion.div
                                                        className="w-2 h-2 bg-[#6B4423] rounded-full"
                                                        animate={{ y: [0, -8, 0] }}
                                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                    />
                                                    <motion.div
                                                        className="w-2 h-2 bg-[#6B4423] rounded-full"
                                                        animate={{ y: [0, -8, 0] }}
                                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 bg-white border-t border-[#E8DCC4]">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Ask me anything..."
                                            className="flex-1 px-4 py-2 border border-[#E8DCC4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
                                            disabled={isLoading}
                                        />
                                        <motion.button
                                            onClick={sendMessage}
                                            disabled={isLoading || !input.trim()}
                                            className="bg-[#D4AF37] text-white p-2 rounded-full hover:bg-[#E8C147] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Send className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#6B4423] to-[#8B6F47] text-white rounded-full shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    className="absolute inset-0 bg-[#D4AF37] rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <Sparkles className="w-7 h-7 relative z-10" />
            </motion.button>
        </div>
    );
}
