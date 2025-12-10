'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface WhatsAppButtonProps {
    phoneNumber: string;
    message?: string;
}

export default function WhatsAppButton({ phoneNumber, message = "Hello! I'd like to know more about your cafe." }: WhatsAppButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="fixed left-6 bottom-6 z-50">
            <motion.button
                onClick={handleClick}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-2xl overflow-hidden group"
                initial={{ width: '64px', height: '64px' }}
                animate={{
                    width: isHovered ? '200px' : '64px',
                    height: '64px'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Pulse Animation */}
                <motion.div
                    className="absolute inset-0 bg-[#25D366] rounded-full"
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

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 flex-shrink-0">
                    <MessageCircle className="w-7 h-7" fill="white" />
                </div>

                {/* Text */}
                <motion.span
                    className="relative z-10 font-semibold text-sm whitespace-nowrap pr-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    Chat with us
                </motion.span>

                {/* Ripple effect on click */}
                <motion.div
                    className="absolute inset-0 bg-white rounded-full"
                    initial={{ scale: 0, opacity: 0.5 }}
                    whileTap={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </motion.button>

            {/* Tooltip */}
            <motion.div
                className="absolute left-20 bottom-0 bg-[#2C1810] text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                    opacity: isHovered ? 0 : 1,
                    x: isHovered ? -10 : 0
                }}
                transition={{ duration: 0.2 }}
            >
                Need help? Click to chat!
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-[#2C1810]"></div>
            </motion.div>
        </div>
    );
}
