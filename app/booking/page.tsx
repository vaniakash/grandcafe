'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function BookingPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "👋 Hello! I'm your AI booking assistant. I can help you schedule an appointment. What date and time would you like to book?",
            timestamp: new Date(),
        },
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
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/gemini-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    // Filter out the initial greeting message from history
                    // Gemini requires first message to be from user
                    history: messages
                        .filter((msg) => msg.role === 'user' || msg.content !== messages[0].content)
                        .map((msg) => ({
                            role: msg.role,
                            content: msg.content,
                        })),
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error: any) {
            const errorMessage: Message = {
                role: 'assistant',
                content: `❌ Sorry, I encountered an error: ${error.message}. Please try again.`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        🤖 AI Booking Assistant
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Powered by Gemini 2.5 Flash
                    </p>
                </div>
            </header>

            {/* Chat Container */}
            <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-180px)] flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 scroll-smooth">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                    : 'bg-white shadow-md border border-purple-100'
                                    }`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">🤖</span>
                                        <span className="text-xs font-semibold text-purple-600">
                                            AI Assistant
                                        </span>
                                    </div>
                                )}
                                <p
                                    className={`text-sm whitespace-pre-wrap ${message.role === 'user' ? 'text-white' : 'text-gray-800'
                                        }`}
                                >
                                    {message.content}
                                </p>
                                <p
                                    className={`text-xs mt-2 ${message.role === 'user' ? 'text-purple-200' : 'text-gray-400'
                                        }`}
                                >
                                    {message.timestamp.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start animate-fadeIn">
                            <div className="bg-white shadow-md border border-purple-100 rounded-2xl px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                    <span className="text-sm text-gray-600">AI is thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-4">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message... (e.g., 'I want to book for tomorrow at 2 PM')"
                            className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? '⏳' : '📤'} Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Examples */}
            <div className="max-w-4xl mx-auto px-4 pb-6">
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 border border-purple-100">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                        💡 Try these examples:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'Check availability for tomorrow',
                            'Book for December 15 at 2 PM',
                            'What times are available today?',
                        ].map((example, index) => (
                            <button
                                key={index}
                                onClick={() => setInput(example)}
                                className="px-3 py-1.5 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce {
          animation: bounce 0.6s infinite;
        }
      `}</style>
        </div>
    );
}
