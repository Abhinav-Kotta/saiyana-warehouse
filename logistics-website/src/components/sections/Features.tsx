'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Users, Trophy } from 'lucide-react';

const features = [
  {
    title: 'Security First',
    description: 'Advanced security systems and 24/7 monitoring',
    icon: Shield,
  },
  {
    title: 'Fast Delivery',
    description: 'Optimized routes and efficient delivery networks',
    icon: Clock,
  },
  {
    title: 'Expert Team',
    description: 'Highly trained and experienced professionals',
    icon: Users,
  },
  {
    title: 'Quality Service',
    description: 'Award-winning customer service and support',
    icon: Trophy,
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600">
            Experience excellence in logistics with our premium features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="mb-4 inline-block p-4 bg-primary-50 rounded-full">
                <feature.icon className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}