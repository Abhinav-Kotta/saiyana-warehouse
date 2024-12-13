'use client';

import { motion } from 'framer-motion';
import { Truck, Package, BarChart3, Globe2, Boxes, Clock, Shield, Users } from 'lucide-react';
import Card from '@/components/ui/Card';

const mainServices = [
  {
    title: '3PL Warehousing',
    description: 'State-of-the-art facilities with climate control, 24/7 security, and advanced inventory management systems',
    icon: Package,
    features: ['Climate-controlled storage', 'Real-time inventory tracking', 'Security monitoring', 'Quality control']
  },
  {
    title: 'Distribution Services',
    description: 'Efficient distribution networks covering major markets with optimized routing and delivery solutions',
    icon: Truck,
    features: ['Last-mile delivery', 'Cross-docking', 'Route optimization', 'Scheduled deliveries']
  },
  {
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain solutions with real-time visibility and performance analytics',
    icon: BarChart3,
    features: ['Demand forecasting', 'Inventory optimization', 'Performance analytics', 'Cost management']
  },
  {
    title: 'Global Logistics',
    description: 'Comprehensive international logistics services with customs clearance and documentation support',
    icon: Globe2,
    features: ['Customs clearance', 'International shipping', 'Documentation support', 'Compliance management']
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
    icon: Boxes,
    title: 'Flexible Storage',
    description: 'Scalable space solutions for varying business needs'
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
                Comprehensive logistics solutions tailored to your needs
              </p>
            </div>

            {/* Video Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                    <video
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="warehouse_overview.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center font-medium">Warehouse Management System</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="group"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                    <video
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="operations_compilation.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center font-medium">Daily Operations Overview</p>
                </motion.div>
              </div>
            </motion.div>

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