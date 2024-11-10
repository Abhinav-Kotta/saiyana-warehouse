'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Warehouses', value: '50+' },
  { label: 'Countries Served', value: '30+' },
  { label: 'Happy Clients', value: '1000+' },
  { label: 'Deliveries', value: '1M+' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center text-white"
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}