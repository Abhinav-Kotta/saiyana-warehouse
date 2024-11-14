// components/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import QuoteRequestForm from './QuoteRequestForm';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary-500/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: '20%', right: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-secondary-500/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: '10%', left: '10%' }}
        />
      </div>

      {/* Main content */}
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-black">Request a Quote</h2>
              <p className="text-black text-lg">
                Tell us about your logistics needs and we&apos;ll provide a customized solution.
              </p>
            </motion.div>
            
            <QuoteRequestForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}