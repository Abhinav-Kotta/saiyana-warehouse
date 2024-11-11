'use client';

import { motion } from 'framer-motion';
import { Truck, Package, BarChart3, Globe2 } from 'lucide-react';
import Card from '@/components/ui/Card';

const services = [
  {
    title: 'Smart Warehousing',
    description:
      'AI-powered inventory management with real-time tracking and automation',
    icon: Package,
  },
  {
    title: 'Intelligent Distribution',
    description: 'Machine learning optimized routing across global networks',
    icon: Truck,
  },
  {
    title: 'Predictive Analytics',
    description: 'Advanced forecasting and supply chain optimization',
    icon: BarChart3,
  },
  {
    title: 'Global Network',
    description: 'Seamless integration with international logistics partners',
    icon: Globe2,
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
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
          style={{ top: '20%', left: '10%' }}
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
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Solutions</h2>
          <p className="text-gray-700 text-lg">
            Next-generation logistics powered by cutting-edge technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="h-full p-6 backdrop-blur-sm bg-white/90 hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="mb-4 inline-block p-3 bg-primary-50 rounded-xl group-hover:bg-primary-100 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-700">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}