'use client';

import { motion } from 'framer-motion';
import { Building2, Clock, Users, BarChart } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { label: 'Founded', value: '1996', icon: Building2 },
  { label: 'Delivery Time', value: '18hrs', icon: Clock },
  { label: 'Service Accuracy', value: '99.7%', icon: BarChart },
  { label: 'Years Experience', value: '27+', icon: Users },
];

export default function AboutPage() {
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
            <h1 className="text-5xl font-bold mb-6">About Saiyana Group</h1>
            <p className="text-xl text-gray-300">
              Pioneering logistics excellence since 1996
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative overflow-hidden">
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
            {/* Founder and Company Story */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <span className="font-semibold text-gray-900">Saiyana Group</span> was 
                    established by <span className="font-semibold text-gray-900">Namburi Sekhar</span>, 
                    who holds a Postgraduate Diploma in Management from Jain Institute, Chennai.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Since our inception in 1996, when we began marketing stationery products—especially 
                    Reynolds pens and writing instruments—we have continuously expanded, starting with 
                    service to Joint Andhra Pradesh in the same year.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our strength lies in building long-term relationships with our clients, ensuring 
                    high turnovers with minimal operational costs. As pioneers in warehousing and 
                    logistics, we specialize in efficient delivery solutions for distributors and 
                    retailers, utilizing multiple transportation modes.
                  </p>
                </div>
              </motion.div>

              {/* Founder Image Space */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="aspect-[3/4] rounded-2xl bg-gray-100 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image 
                      src="/api/placeholder/600/800"
                      alt="Namburi Sekhar - Founder of Saiyana Group"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="inline-block p-3 bg-primary-50 rounded-xl mb-4">
                    <stat.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}