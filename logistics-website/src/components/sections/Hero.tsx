'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowRight, Shield, Activity, Heart } from 'lucide-react';

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
    { icon: Shield, text: "Quality Assurance" },
    { icon: Activity, text: "Healthcare Innovation" },
    { icon: Heart, text: "Patient Care" },
  ];

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-transparent z-10" />
      
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/api/placeholder/1200/600)' }}
      />

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
          style={{ top: '10%', left: '20%' }}
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
          className="max-w-4xl"
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
                Leading Healthcare Solutions
              </motion.div>
              <motion.h1 
                className="text-6xl font-bold text-white leading-tight"
                variants={textRevealVariants}
              >
                Transforming <span className="text-primary-500">Healthcare</span>
                <br />Through Innovation
              </motion.h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-200 max-w-2xl"
            >
              Delivering excellence in pharmaceutical care with cutting-edge solutions
              and unwavering commitment to quality healthcare services.
            </motion.p>

            {/* Features */}
            <motion.div 
              variants={itemVariants}
              className="flex gap-8 mb-8"
            >
              {features.map((feature, index) => (
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
                  Get Started
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
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}