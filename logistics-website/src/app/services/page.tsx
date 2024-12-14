'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, Package, BarChart3, Boxes, Clock, Shield, Users, 
  ClipboardList
} from 'lucide-react';
import Card from '@/components/ui/Card';

interface ServiceFeature {
  title: string;
  description: string;
  icon: React.FC<any>;
  features: string[];
}

interface AdditionalFeature {
  icon: React.FC<any>;
  title: string;
  description: string;
}

const mainServices: ServiceFeature[] = [
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

const additionalFeatures: AdditionalFeature[] = [
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
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ top: '10%', left: '30%' }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ bottom: '10%', right: '20%' }}
          />
        </div>
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300">
              Comprehensive logistics solutions tailored to optimize your supply chain
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section with Video Integration */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Core Services</h2>
              <p className="text-gray-600 mb-8">Comprehensive solutions for your logistics needs</p>
              
              {/* Subtle Video Integration */}
              <div className="mb-12 rounded-xl overflow-hidden shadow-lg max-w-3xl mx-auto bg-gray-900">
                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover opacity-90"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/operations_compilation.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4 bg-gray-900 text-center">
                  <p className="text-sm text-gray-400">Example of modern warehouse operations</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {mainServices.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Card className="h-full p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="mb-4">
                      <div className="inline-block p-3 bg-primary-50 rounded-xl group-hover:bg-primary-100 transition-colors duration-300">
                        <service.icon className="h-6 w-6 text-primary-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
              <p className="text-gray-600">Enhanced capabilities to support your business</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="group"
                >
                  <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="inline-block p-3 bg-primary-50 rounded-xl mb-4 group-hover:bg-primary-100 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</div>
                    <div className="text-gray-600">{feature.description}</div>
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