'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Users, Trophy } from 'lucide-react';

const features = [
  {
    title: 'Enterprise Security',
    description: 'Military-grade encryption and blockchain tracking',
    icon: Shield,
  },
  {
    title: 'Real-Time Delivery',
    description: 'Live tracking with predictive ETA technology',
    icon: Clock,
  },
  {
    title: 'Expert Solutions',
    description: 'Industry veterans and AI-powered support',
    icon: Users,
  },
  {
    title: 'Premium Service',
    description: '99.9% satisfaction rate with 24/7 support',
    icon: Trophy,
  },
];

export default function Features() {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Saiyana</h2>
          <p className="text-gray-400 text-lg">
            Next-level logistics excellence powered by innovation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="mb-6 inline-block relative">
                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full transform group-hover:scale-110 transition-transform" />
                <div className="relative p-5 bg-gray-800 rounded-2xl border border-gray-700">
                  <feature.icon className="h-8 w-8 text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}