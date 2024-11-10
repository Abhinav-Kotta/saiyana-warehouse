'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/50 z-10" />
      
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/api/placeholder/1200/600)' }}
      />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Trusted Logistics Partner
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Efficient warehousing and logistics solutions for your business needs.
            Global reach with local expertise.
          </motion.p>
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}