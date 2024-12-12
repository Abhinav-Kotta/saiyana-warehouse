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

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null as string | null,
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
    setStatus({ ...status, submitting: true, error: null });

    try {
      const response = await fetch('/api/contact/pageRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus({
        submitting: false,
        submitted: true,
        error: null,
      });
      setFormState({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
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
              <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
              <p className="text-gray-600">Get in touch with our team</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-6">
                  {/* ... (contact information section remains unchanged) ... */}
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="p-6">
                {status.submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-8"
                  >
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-primary-500" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-gray-600">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                    </div>
                    <Button
                      onClick={() => setStatus({ ...status, submitted: false })}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name
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
                        disabled={status.submitting}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
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
                        disabled={status.submitting}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        required
                        placeholder="Tell us about your logistics needs..."
                        disabled={status.submitting}
                      />
                    </div>
                    {status.error && (
                      <div className="text-red-500 text-sm">{status.error}</div>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full py-3 flex items-center justify-center gap-2"
                      disabled={status.submitting}
                    >
                      {status.submitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}