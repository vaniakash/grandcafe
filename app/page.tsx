'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Coffee, Croissant, Home as HomeIcon, MapPin, Phone, Mail, Clock, Twitter, Github, Linkedin, ChevronDown, Sparkles } from 'lucide-react';
import ModernCarousel from '@/components/ModernCarousel';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#2C1810] via-[#3E2723] to-[#6B4423]"
          style={{ y: heroY }}
        >
          <motion.div
            className="absolute inset-0 opacity-40"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/Cinematic_Coffee_Pour_Hero_Video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="mb-8 flex justify-center" variants={scaleIn}>
            <Image
              src="/logo.png"
              alt="Cafe Logo"
              width={300}
              height={300}
              className="drop-shadow-2xl"
            />
          </motion.div>
          <motion.h1
            className="text-7xl md:text-8xl font-bold text-[#F5E6D3] mb-6 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
            variants={fadeInUp}
          >
            Welcome to Paradise
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-[#E8DCC4] mb-8 font-light"
            variants={fadeInUp}
          >
            Where Every Cup Tells a Story
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            variants={fadeInUp}
          >
            <motion.a
              href="/services"
              className="px-6 md:px-8 py-3 md:py-4 bg-[#D4AF37] text-[#2C1810] rounded-full font-semibold text-base md:text-lg shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: '#E8C147' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Menu
            </motion.a>
            <motion.a
              href="/contact"
              className="px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-[#F5E6D3] text-[#F5E6D3] rounded-full font-semibold text-base md:text-lg"
              whileHover={{ scale: 1.05, backgroundColor: '#F5E6D3', color: '#2C1810' }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Us
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-[#F5E6D3]" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center">
          <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl">
            <Image
              src="/here.png"
              alt="Our cafe interior"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-2 md:mb-4 lg:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Our Story
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#3E2723] mb-2 md:mb-4 lg:mb-6 leading-relaxed">
              Nestled in the heart of the city, our cafe is more than just a place to grab your morning coffee.
              It's a sanctuary where artisanal craftsmanship meets warm hospitality.
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#3E2723] mb-3 md:mb-4 lg:mb-6 leading-relaxed hidden sm:block">
              Every bean is carefully selected, every brew is thoughtfully prepared, and every moment is crafted
              to provide you with an unforgettable experience.
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4 mt-4 md:mt-6 lg:mt-8">
              <div className="text-center p-2 md:p-3 lg:p-4 bg-white rounded-md md:rounded-lg shadow-md">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#D4AF37]">15+</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-[#6B4423]">Years</div>
              </div>
              <div className="text-center p-2 md:p-3 lg:p-4 bg-white rounded-md md:rounded-lg shadow-md">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#D4AF37]">50+</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-[#6B4423]">Blends</div>
              </div>
              <div className="text-center p-2 md:p-3 lg:p-4 bg-white rounded-md md:rounded-lg shadow-md">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#D4AF37]">10k+</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-[#6B4423]">Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-[#F5E6D3] to-[#E8DCC4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-3 md:mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            Experience the Ambiance
          </h2>
          <p className="text-xl text-[#6B4423] text-center mb-12">A visual journey through our space</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
                <source src="/Cozy_Café_Interior_Cinematic_Video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-xl">Cozy Interior</p>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
                <source src="/Cozy_Rainy_Cafe_Ambience_Video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-xl">Rainy Day Vibes</p>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
                <source src="/Cozy_Café_Night_Ambience_Video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-xl">Night Ambience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 bg-[#2C1810] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5E6D3] mb-3 md:mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            Meet Our Team
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#E8DCC4] text-center mb-6 md:mb-8 lg:mb-12">Passionate people behind your perfect cup</p>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl">
              <Image
                src="/staff.png"
                alt="Our amazing team"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3 md:space-y-4 lg:space-y-6">
              <div className="bg-[#3E2723] p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl border-l-2 md:border-l-4 border-[#D4AF37]">
                <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#D4AF37] mb-1 md:mb-2">Expert Baristas</h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#E8DCC4]">
                  Our team of certified baristas brings years of experience and passion to every cup they craft.
                </p>
              </div>
              <div className="bg-[#3E2723] p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl border-l-2 md:border-l-4 border-[#D4AF37]">
                <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#D4AF37] mb-1 md:mb-2">Warm Hospitality</h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#E8DCC4]">
                  We believe in treating every guest like family, creating a welcoming atmosphere for all.
                </p>
              </div>
              <div className="bg-[#3E2723] p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl border-l-2 md:border-l-4 border-[#D4AF37]">
                <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#D4AF37] mb-1 md:mb-2">Continuous Innovation</h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#E8DCC4]">
                  Always learning, always improving, always striving to bring you the best coffee experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-[#E8DCC4] to-[#F5E6D3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-3 md:mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            What We Offer
          </h2>
          <p className="text-xl text-[#6B4423] text-center mb-12">Premium quality in every aspect</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#D4AF37]">
              <motion.div
                className="w-16 h-16 bg-[#2C1810] rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Coffee className="w-8 h-8 text-[#D4AF37]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#2C1810] mb-3">Artisan Coffee</h3>
              <p className="text-[#6B4423]">
                Hand-selected beans from the world's finest coffee-growing regions, roasted to perfection.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#D4AF37]">
              <motion.div
                className="w-16 h-16 bg-[#2C1810] rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Croissant className="w-8 h-8 text-[#D4AF37]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#2C1810] mb-3">Fresh Pastries</h3>
              <p className="text-[#6B4423]">
                Baked daily with love, our pastries complement your coffee experience perfectly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#D4AF37]">
              <motion.div
                className="w-16 h-16 bg-[#2C1810] rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <HomeIcon className="w-8 h-8 text-[#D4AF37]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#2C1810] mb-3">Cozy Atmosphere</h3>
              <p className="text-[#6B4423]">
                A perfect space to work, relax, or catch up with friends in a warm, inviting environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Works/Process Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-2 md:mb-4 lg:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Our Process
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#3E2723] mb-3 md:mb-4 lg:mb-6 leading-relaxed">
              From bean to cup, we follow a meticulous process to ensure excellence in every sip.
            </p>
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs md:text-sm lg:text-base font-bold">1</div>
                <div>
                  <h4 className="font-bold text-[#2C1810] text-xs sm:text-sm md:text-base lg:text-lg">Source</h4>
                  <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#6B4423]">Ethically sourced beans from sustainable farms</p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs md:text-sm lg:text-base font-bold">2</div>
                <div>
                  <h4 className="font-bold text-[#2C1810] text-xs sm:text-sm md:text-base lg:text-lg">Roast</h4>
                  <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#6B4423]">Small-batch roasting for optimal flavor</p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs md:text-sm lg:text-base font-bold">3</div>
                <div>
                  <h4 className="font-bold text-[#2C1810] text-xs sm:text-sm md:text-base lg:text-lg">Brew</h4>
                  <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#6B4423]">Expert preparation with precision and care</p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs md:text-sm lg:text-base font-bold">4</div>
                <div>
                  <h4 className="font-bold text-[#2C1810] text-xs sm:text-sm md:text-base lg:text-lg">Serve</h4>
                  <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#6B4423]">Delivered with a smile and attention to detail</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] rounded-lg md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl">
            <Image
              src="/works.png"
              alt="Coffee making process"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-white to-[#F5E6D3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Featured Specials
            </motion.h2>
            <motion.p
              className="text-xl text-[#6B4423]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our handpicked selections
            </motion.p>
          </div>

          <ModernCarousel
            items={[
              {
                id: 1,
                title: "Morning Blend",
                description: "Start your day with our signature morning blend, crafted from the finest Arabica beans.",
                image: "/placeholder1.jpg"
              },
              {
                id: 2,
                title: "Afternoon Delight",
                description: "A perfect afternoon pick-me-up with our smooth and rich espresso blend.",
                image: "/placeholder2.jpg"
              },
              {
                id: 3,
                title: "Evening Comfort",
                description: "Unwind with our specialty decaf, full of flavor without the caffeine.",
                image: "/placeholder3.jpg"
              }
            ]}
            autoPlayInterval={5000}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-[#2C1810] via-[#3E2723] to-[#6B4423] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5E6D3] mb-4 md:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Visit Us Today
          </h2>
          <p className="text-lg md:text-xl text-[#E8DCC4] mb-6 md:mb-8">
            Experience the perfect blend of flavor, atmosphere, and hospitality
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="px-6 md:px-8 py-3 md:py-4 bg-[#D4AF37] text-[#2C1810] rounded-full font-semibold text-base md:text-lg hover:bg-[#E8C147] transition-all hover:scale-105 shadow-lg">
              Find Us
            </a>
            <a href="/services" className="px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-[#F5E6D3] text-[#F5E6D3] rounded-full font-semibold text-base md:text-lg hover:bg-[#F5E6D3] hover:text-[#2C1810] transition-all hover:scale-105">
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A0F0A] text-[#E8DCC4]">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* About Column */}
            <div>
              <div className="mb-4">
                <Image
                  src="/logo.png"
                  alt="Cafe Logo"
                  width={80}
                  height={80}
                  className="mb-4"
                />
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Crafting exceptional coffee experiences since 2009. Every cup tells a story of passion and dedication.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2C1810] rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.4 }}
                >
                  <Twitter className="w-5 h-5 text-[#E8DCC4]" />
                </motion.a>
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2C1810] rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.4 }}
                >
                  <Github className="w-5 h-5 text-[#E8DCC4]" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2C1810] rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.4 }}
                >
                  <Linkedin className="w-5 h-5 text-[#E8DCC4]" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[#D4AF37] font-bold text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-[#D4AF37] transition-colors text-sm">Home</a></li>
                <li><a href="/about" className="hover:text-[#D4AF37] transition-colors text-sm">About Us</a></li>
                <li><a href="/services" className="hover:text-[#D4AF37] transition-colors text-sm">Menu</a></li>
                <li><a href="/contact" className="hover:text-[#D4AF37] transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-[#D4AF37] font-bold text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span>123 Coffee Street<br />Downtown, City 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                  <a href="tel:+1234567890" className="hover:text-[#D4AF37] transition-colors">+1 (234) 567-890</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <a href="mailto:hello@cafe.com" className="hover:text-[#D4AF37] transition-colors">hello@cafe.com</a>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-[#D4AF37] font-bold text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>Opening Hours</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-[#D4AF37]">7AM - 8PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-[#D4AF37]">8AM - 9PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-[#D4AF37]">8AM - 7PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2C1810]">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#8B7355]">
              <p>&copy; 2024 Cafe Paradise. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}