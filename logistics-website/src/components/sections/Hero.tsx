'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowRight, Boxes, BarChart2, Truck } from 'lucide-react';

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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-transparent z-10" />
      
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/api/placeholder/1200/600)' }}
      />

      {/* Large Letter S with Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-0"
      >
        <svg width="800" height="1000" viewBox="0 0 800 1000" className="opacity-30">
          <defs>
            <linearGradient id="sGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="white" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3"/>
            </linearGradient>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          
          {/* Grid Background */}
          <rect width="800" height="1000" fill="url(#gridPattern)" />
          
          {/* Base S Shape */}
          <path
            d="M600,750 
               C600,850 500,900 350,900 
               C200,900 100,850 90,750 
               L200,750 
               C210,800 250,825 350,825 
               C450,825 475,800 475,750 
               C475,650 90,700 90,450 
               C90,350 190,300 340,300 
               C490,300 590,350 600,450 
               L490,450 
               C480,400 440,375 340,375 
               C240,375 215,400 215,450 
               C215,550 600,500 600,750 Z"
            fill="url(#sGradient)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          
          {/* Warehouse Design Elements */}
          <g className="warehouse-elements" stroke="rgba(255,255,255,0.2)" fill="none">
            {/* Grid Lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`grid-${i}`}
                x1="100"
                y1={350 + i * 50}
                x2="700"
                y2={350 + i * 50}
                strokeWidth="1"
              />
            ))}
            
            {/* Vertical Support Lines */}
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={`support-${i}`}
                x1={200 + i * 100}
                y1="300"
                x2={200 + i * 100}
                y2="900"
                strokeWidth="1"
              />
            ))}

            {/* Box Elements */}
            {Array.from({ length: 15 }).map((_, i) => (
              <rect
                key={`box-${i}`}
                x={150 + (i % 5) * 120}
                y={400 + Math.floor(i / 5) * 150}
                width="80"
                height="80"
                stroke="rgba(255,255,255,0.2)"
                fill="rgba(255,255,255,0.05)"
              />
            ))}
          </g>
        </svg>
      </motion.div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary-600/20 blur-3xl"
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
          className="absolute w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl"
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

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto lg:mr-[35%]"
        >
          <div className="flex flex-col gap-8">
            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div 
                className="inline-block bg-primary-600/90 text-white px-4 py-1 rounded-full text-sm font-medium"
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
                Streamline Your <span className="text-primary-500">Supply Chain</span>
                <br />With Saiyana
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
                  className="flex items-center gap-2 text-white"
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
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-gray-900 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
              >
                View Services
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}