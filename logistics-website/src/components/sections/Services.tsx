'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, TruckIcon, ClipboardCheck, Users } from 'lucide-react';
import Card from '@/components/ui/Card';

const services = [
  {
    title: 'Warehousing & Storage',
    description:
      'Climate-controlled facilities, inventory management, and advanced security systems for safe storage',
    icon: Package,
  },
  {
    title: 'Transportation',
    description: 'Integrated shipping solutions with LTL and FTL',
    icon: TruckIcon,
  },
  {
    title: 'Inventory',
    description: 'Get daily reports of inward, outward and current stock of your goods.',
    icon: ClipboardCheck,
  },
  {
    title: 'Manpower',
    description: 'Loading, unloading jobs and manager for your inventory.',
    icon: Users,
  },
];

export default function Services() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

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
      {/* Background decorative elements */}
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
          <h2 className="text-4xl font-bold mb-4 text-gray-900">3PL Services</h2>
          <p className="text-gray-700 text-lg">
            End-to-end warehousing and logistics solutions for your business
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-xl h-full flex items-center"
          >
            <video
              ref={videoRef}
              className="w-full h-64 object-cover rounded-xl"
              loop
              muted
              playsInline
            >
              <source src="/videos/operations_compilation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 grid md:grid-cols-2 gap-6"
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
      </div>
    </section>
  );
}