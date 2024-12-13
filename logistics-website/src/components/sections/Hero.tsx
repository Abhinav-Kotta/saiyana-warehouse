'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, Boxes, BarChart2, Truck } from 'lucide-react';

const rightScrollStyles = `
@keyframes slideRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-slideshow {
  animation: slideRight 20s linear infinite;
}

.animate-slideshow:hover {
  animation-play-state: paused;
}
`;

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingIconVariants = {
    initial: { y: 0 },
    float: {
      y: [-10, 0, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const features = [
    { icon: Boxes, text: "Warehouse Management" },
    { icon: Truck, text: "Distribution Solutions" },
    { icon: BarChart2, text: "Supply Chain Optimization" },
  ];

  const scrollToQuote = () => {
    const headerHeight = 64;
    const quoteSection = document.getElementById('quote-request-section');
    if (quoteSection) {
      const topOffset = quoteSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Custom animation styles */}
      <style>{rightScrollStyles}</style>

      {/* Background images */}
      <div className="absolute inset-0 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="flex animate-slideshow" style={{ width: '200%' }}>
            {/* First set of images */}
            <div className="flex min-w-full">
              <div 
                className="w-1/2 h-full bg-center bg-no-repeat bg-cover"
                style={{ 
                  backgroundImage: 'url(/close-up-warehouse-view.jpg)',
                  backgroundPosition: '50% 35%',
                }}
              />
              <div 
                className="w-1/2 h-full bg-center bg-no-repeat bg-cover"
                style={{ 
                  backgroundImage: 'url(/row-of-trucks.PNG)',
                  backgroundPosition: '50% 35%',
                }}
              />
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex min-w-full">
              <div 
                className="w-1/2 h-full bg-center bg-no-repeat bg-cover"
                style={{ 
                  backgroundImage: 'url(/close-up-warehouse-view.jpg)',
                  backgroundPosition: '50% 35%',
                }}
              />
              <div 
                className="w-1/2 h-full bg-center bg-no-repeat bg-cover"
                style={{ 
                  backgroundImage: 'url(/row-of-trucks.PNG)',
                  backgroundPosition: '50% 35%',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40 z-10" />

      {/* Animated background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary-600/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: '10%', left: '30%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: '10%', right: '20%' }}
        />
      </div>

      {/* Main content */}
      <div className="container relative z-20 mx-auto px-4 pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto lg:mr-[35%] relative"
        >
          <div className="flex flex-col gap-8">
            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div 
                className="inline-block bg-primary-600/90 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Advanced 3PL Solutions
              </motion.div>
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                variants={textRevealVariants}
              >
                Streamline Your <span className="text-primary-400">Supply Chain</span>
                <br />With Saiyana 3PL
              </motion.h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-200 max-w-2xl"
            >
              Comprehensive warehousing and third-party logistics solutions tailored 
              to optimize your distribution network and enhance operational efficiency.
            </motion.p>

            {/* Features */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.text}
                  variants={floatingIconVariants}
                  initial="initial"
                  animate="float"
                  className="flex items-center gap-2 text-white backdrop-blur-sm bg-gray-900/30 px-4 py-2 rounded-lg"
                >
                  <feature.icon className="w-5 h-5 text-primary-400" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex gap-4"
            >
              <div className="group">
                <Button 
                  size="lg"
                  onClick={scrollToQuote}
                  className="group relative overflow-hidden transition-transform hover:scale-105 active:scale-95"
                >
                  Request a Quote
                  <motion.span
                    className="relative inline-block ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </div>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-gray-900 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}