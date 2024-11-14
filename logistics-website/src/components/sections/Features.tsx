'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Boxes, HeadphonesIcon, Flame } from 'lucide-react';

const features = [
  {
    title: 'Secure Storage',
    description: '24/7 monitored facilities with inventory protection',
    icon: ShieldCheck,
  },
  {
    title: 'Flexible Space',
    description: 'Scalable warehousing with multi-client capabilities',
    icon: Boxes,
  },
  {
    title: 'Dedicated Support',
    description: 'Dedicated customer support to ensure complete assistance at all times',
    icon: HeadphonesIcon,
  },
  {
    title: 'Pest and fire control',
    description: 'We ensure regular pest control & installation of fire extinguishers at all our storage facilities',
    icon: Flame,
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
            Your trusted partner in third-party logistics excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
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