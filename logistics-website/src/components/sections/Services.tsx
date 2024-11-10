'use client';

import { motion } from 'framer-motion';
import { Truck, Package, BarChart3, Globe2 } from 'lucide-react';
import Card from '@/components/ui/Card';

const services = [
  {
    title: 'Warehousing',
    description:
      'State-of-the-art facilities with climate control and 24/7 security',
    icon: Package,
  },
  {
    title: 'Distribution',
    description: 'Efficient distribution networks covering major global markets',
    icon: Truck,
  },
  {
    title: 'Inventory Management',
    description: 'Real-time tracking and advanced inventory solutions',
    icon: BarChart3,
  },
  {
    title: 'Global Logistics',
    description: 'End-to-end supply chain management and optimization',
    icon: Globe2,
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600">
            Comprehensive logistics solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full">
                <service.icon className="h-10 w-10 text-primary-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}