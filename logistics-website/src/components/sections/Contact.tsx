'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, Package, Truck, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    companyName: '',
    serviceType: 'warehousing',
    shipmentVolume: '',
    startDate: '',
    requirements: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote requested:', formState);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.01,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
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
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-black">Request a Quote</h2>
              <p className="text-black text-lg">
                Tell us about your logistics needs and we&apos;ll provide a customized solution.
              </p>
            </motion.div>
            
            <motion.form 
              variants={itemVariants}
              onSubmit={handleSubmit} 
              className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={inputVariants} whileFocus="focus">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-primary-500" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black placeholder-black/60"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your full name"
                    required
                  />
                </motion.div>

                <motion.div variants={inputVariants} whileFocus="focus">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-primary-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black placeholder-black/60"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="Enter your email address"
                    required
                  />
                </motion.div>
              </div>

              <motion.div variants={inputVariants} whileFocus="focus">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-primary-500" />
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black placeholder-black/60"
                  value={formState.companyName}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, companyName: e.target.value }))
                  }
                  placeholder="Enter your company name"
                  required
                />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={inputVariants} whileFocus="focus">
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
                  >
                    <Truck className="w-4 h-4 text-primary-500" />
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black"
                    value={formState.serviceType}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, serviceType: e.target.value }))
                    }
                    required
                  >
                    <option value="warehousing">Warehousing</option>
                    <option value="distribution">Distribution</option>
                    <option value="supply-chain">Supply Chain Management</option>
                    <option value="transportation">Transportation</option>
                  </select>
                </motion.div>

                <motion.div variants={inputVariants} whileFocus="focus">
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-primary-500" />
                    Desired Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black"
                    value={formState.startDate}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                  />
                </motion.div>
              </div>

              <motion.div variants={inputVariants} whileFocus="focus">
                <label
                  htmlFor="requirements"
                  className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-primary-500" />
                  Service Requirements
                </label>
                <textarea
                  id="requirements"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black placeholder-black/60"
                  value={formState.requirements}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, requirements: e.target.value }))
                  }
                  placeholder="Describe your logistics requirements, including volume, frequency, and any specific needs..."
                  required
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full py-3 flex items-center justify-center gap-2 text-lg font-semibold">
                  Request Quote
                  <Send className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}