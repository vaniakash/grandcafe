'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CarouselItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface ModernCarouselProps {
    items: CarouselItem[];
    autoPlayInterval?: number;
}

export default function ModernCarousel({ items, autoPlayInterval = 5000 }: ModernCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? -45 : 45,
        }),
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4">
            {/* Carousel Container */}
            <div className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.4 },
                            rotateY: { duration: 0.6 },
                        }}
                        className="absolute w-full"
                        style={{ perspective: '1000px' }}
                    >
                        <motion.div
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto max-w-4xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image Side */}
                                <div className="relative h-64 md:h-full bg-gradient-to-br from-[#2C1810] to-[#6B4423]">
                                    <div className="absolute inset-0 flex items-center justify-center p-8">
                                        <div className="w-48 h-48 bg-[#D4AF37] rounded-full opacity-20"></div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="text-[#D4AF37] font-semibold mb-2 text-sm uppercase tracking-wider">
                                            Item {currentIndex + 1} of {items.length}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                            {items[currentIndex].title}
                                        </h3>
                                        <p className="text-[#6B4423] text-lg leading-relaxed mb-6">
                                            {items[currentIndex].description}
                                        </p>
                                        <motion.button
                                            className="px-6 py-3 bg-[#D4AF37] text-[#2C1810] rounded-full font-semibold hover:bg-[#E8C147] transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Learn More
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-20">
                <motion.button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#D4AF37] transition-colors group z-30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft className="w-6 h-6 text-[#2C1810] group-hover:text-white" />
                </motion.button>
                <motion.button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#D4AF37] transition-colors group z-30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight className="w-6 h-6 text-[#2C1810] group-hover:text-white" />
                </motion.button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {items.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#D4AF37]/30'
                            }`}
                        whileHover={{ scale: 1.2 }}
                    />
                ))}
            </div>
        </div>
    );
}
