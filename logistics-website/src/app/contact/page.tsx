// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Copy, ExternalLink, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  companyName: string;
  serviceType: string;
  startDate?: string;
  requirements: string;
}

const serviceTypes = [
  "Pharmaceutical Distribution",
  "Medical Supply Chain",
  "Healthcare Logistics",
  "Inventory Management",
  "Temperature-Controlled Storage",
  "Other"
];

export default function ContactPage() {
  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    companyName: '',
    serviceType: '',
    startDate: '',
    requirements: ''
  });

  const emailAddress = 'saiyanacfa@gmail.com';
  const phoneNumber = '+91 9440649884';
  const address = 'Kowluru Arcade, Opp: Papaji Dhaba Lane, Shivam Rd, New Nallakunta, Hyderabad, Telangana 500044, India';
  const googleMapsUrl = 'https://maps.app.goo.gl/X9p99j1DyjYbfLzH8';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopySuccess(true);
      toast({
        description: "Email address copied to clipboard",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      toast({
        variant: "destructive",
        description: "Failed to copy email address",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contactPage/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Reset form
      setFormState({
        name: '',
        email: '',
        message: '',
        companyName: '',
        serviceType: '',
        startDate: '',
        requirements: ''
      });

      toast({
        description: "Message sent successfully! We'll get back to you soon.",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        description: "Failed to send message. Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-gray-600">Get in touch with our pharmaceutical care team</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">Office Location</h3>
                        <p className="text-gray-600 mb-2">{address}</p>
                        <a 
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-600 hover:text-primary-700"
                        >
                          Get Directions
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <div className="space-y-2">
                          <p className="text-gray-600">{emailAddress}</p>
                          <div className="flex space-x-2">
                            <a 
                              href={`mailto:${emailAddress}`}
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              Open in Email Client
                            </a>
                            <button
                              onClick={handleCopyEmail}
                              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              {copySuccess ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">Phone</h3>
                        <a 
                          href={`tel:${phoneNumber}`}
                          className="text-gray-600 hover:text-primary-600"
                        >
                          {phoneNumber}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">Working Hours</h3>
                        <p className="text-gray-600">MON-SAT | 9am to 6pm</p>
                        <p className="text-gray-600">SUN | 9am to 5pm</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company Name*
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={formState.companyName}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, companyName: e.target.value }))
                      }
                      required
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, email: e.target.value }))
                      }
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="serviceType"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Service Type*
                    </label>
                    <select
                      id="serviceType"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={formState.serviceType}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, serviceType: e.target.value }))
                      }
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Desired Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={formState.startDate}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, startDate: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="requirements"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Requirements*
                    </label>
                    <textarea
                      id="requirements"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={formState.requirements}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, requirements: e.target.value }))
                      }
                      required
                      placeholder="Tell us about your pharmaceutical care needs..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}