'use client';

import { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Copy, ExternalLink, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ContactPage() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const emailAddress = 'saiyanacfa@gmail.com';
  const phoneNumber = '+91 9440649884';
  const address = 'Kowluru Arcade, Opp: Papaji Dhaba Lane, Shivam Rd, New Nallakunta, Hyderabad, Telangana 500044, India';
  const googleMapsUrl = 'https://maps.app.goo.gl/X9p99j1DyjYbfLzH8';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">Get in Touch</h1>
              <p className="text-gray-700 text-lg">Connect with Saiyana's logistics experts</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div variants={itemVariants} className="space-y-8">
                <Card className="p-8 backdrop-blur-sm bg-white/80 hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="space-y-8">
                    <motion.div 
                      className="flex items-start space-x-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-primary-50 rounded-xl">
                        <MapPin className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900">Office Location</h3>
                        <p className="text-gray-700 mb-2">{address}</p>
                        <motion.a 
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                          whileHover={{ x: 3 }}
                        >
                          Get Directions
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </motion.a>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start space-x-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-primary-50 rounded-xl">
                        <Mail className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900">Email</h3>
                        <div className="space-y-2">
                          <p className="text-gray-700">{emailAddress}</p>
                          <div className="flex space-x-4">
                            <motion.a 
                              href={`mailto:${emailAddress}`}
                              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                              whileHover={{ x: 3 }}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </motion.a>
                            <motion.button
                              onClick={handleCopyEmail}
                              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                              whileHover={{ x: 3 }}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              {copySuccess ? 'Copied!' : 'Copy'}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start space-x-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-primary-50 rounded-xl">
                        <Phone className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900">Phone</h3>
                        <a 
                          href={`tel:${phoneNumber}`}
                          className="text-gray-700 hover:text-primary-600"
                        >
                          {phoneNumber}
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start space-x-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-3 bg-primary-50 rounded-xl">
                        <Clock className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900">Working Hours</h3>
                        <p className="text-gray-700">MON-SAT | 9am to 6pm</p>
                        <p className="text-gray-700">SUN | 9am to 5pm</p>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <Card className="p-8 backdrop-blur-sm bg-white/80 hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-gray-900 placeholder-gray-500"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-gray-900 placeholder-gray-500"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-gray-900 placeholder-gray-500"
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Tell us about your logistics needs..."
                        required
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full py-3 flex items-center justify-center gap-2 text-lg font-semibold">
                        Send Message
                        <Send className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </form>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}