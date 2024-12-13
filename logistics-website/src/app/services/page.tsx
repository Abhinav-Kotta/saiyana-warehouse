'use client';

import { motion } from 'framer-motion';
import { Truck, Package, BarChart3, Globe2, Boxes, Clock, Shield, Users, ClipboardList } from 'lucide-react';
import Card from '@/components/ui/Card';

const mainServices = [
  {
    title: 'C&F Services',
    description: 'End-to-end Carrying and Forwarding solutions ensuring efficient inventory management and seamless distribution across regions',
    icon: ClipboardList,
    features: [
      'Inventory management and order processing',
      'Handling and forwarding goods across regions',
      'Coordination with distributors and retailers',
      'Timely delivery with focus on accuracy'
    ]
  },
  {
    title: 'Warehousing Solutions',
    description: 'Modern warehousing facilities designed with advanced technology for real-time tracking and optimal storage efficiency',
    icon: Package,
    features: [
      'Secure and spacious storage solutions',
      'Advanced inventory tracking systems',
      'Flexible storage options',
      'Cost-effective distribution planning'
    ]
  },
  {
    title: 'Transportation Services',
    description: 'Reliable and timely transportation services with optimized logistics solutions to minimize transit time and costs',
    icon: Truck,
    features: [
      'Last-mile delivery within 18 hours',
      'Multi-modal transportation options',
      'Real-time shipment tracking',
      'Efficient fleet management'
    ]
  },
  {
    title: 'Super Stockist',
    description: 'Comprehensive super stockist services bridging manufacturers and distributors with efficient bulk inventory management',
    icon: Boxes,
    features: [
      'Efficient bulk inventory management',
      'Manufacturer-distributor coordination',
      'Quick order fulfillment',
      'Streamlined supply chain operations'
    ]
  }
];

const additionalFeatures = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Advanced security systems protecting your valuable inventory'
  },
  {
    icon: Clock,
    title: 'Time-Critical Logistics',
    description: 'Express delivery services for urgent shipments'
  },
  {
    icon: BarChart3,
    title: 'Supply Chain Analytics',
    description: 'Data-driven insights for operational optimization'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: '24/7 customer service and dedicated account managers'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
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

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">Our Services</h1>
              <p className="text-lg text-gray-700">
                Comprehensive logistics solutions tailored to your business needs
              </p>
            </div>

            {/* Main Services */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-8">
                {mainServices.map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <Card className="h-full p-6 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="mb-4">
                        <div className="inline-block p-3 bg-primary-50 rounded-xl group-hover:bg-primary-100 transition-colors duration-300">
                          <service.icon className="h-6 w-6 text-primary-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                      <p className="text-gray-700 mb-6">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-gray-700">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="group"
                >
                  <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="inline-block p-3 bg-primary-50 rounded-xl mb-4 group-hover:bg-primary-100 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</div>
                    <div className="text-gray-700">{feature.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}