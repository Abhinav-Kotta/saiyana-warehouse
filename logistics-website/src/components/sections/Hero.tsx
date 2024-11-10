'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gray-900/50 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/api/placeholder/1200/600)' }}
      />

      <div className="container relative z-20 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-5xl font-bold mb-6">
            Your Trusted Logistics Partner
          </h1>
          <p className="text-xl mb-8">
            Efficient warehousing and logistics solutions for your business needs.
            Global reach with local expertise.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}