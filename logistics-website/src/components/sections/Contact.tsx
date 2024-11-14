'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'New message from your website',
        html: `<p>${message}</p>`,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background styles... */}
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-black">Request a Quote</h2>
              <p className="text-black text-lg">
                Tell us about your logistics needs and we'll provide a customized solution.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="px-8 py-2 font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  Send Message
                </button>
              </div>
              {status === 'success' && <p className="text-green-600">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-600">Failed to send message. Please try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}