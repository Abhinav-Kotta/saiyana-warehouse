'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface CounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

const stats: Stat[] = [
  { label: 'Years in Industry', value: 25, suffix: '+' },
  { label: 'Storage Space (sft)', value: 50000, suffix: '+' },
  { label: 'Customers Served', value: 30, suffix: '+' },
];

const Counter = ({ value, suffix, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.min(Math.floor(value * progress), value));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration, isInView]);

  return (
    <span ref={elementRef} className="relative">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function Stats() {
  return (
    <section className="py-10 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 3px 3px, white 1px, transparent 0)`,
              backgroundSize: '30px 30px',
            }}
            animate={{
              x: [0, -15],
              y: [0, -15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-8 justify-between text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-white group w-full"
            >
              <motion.div
                className="text-6xl font-bold mb-2 w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Counter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  duration={2} 
                />
              </motion.div>
              <div className="text-lg text-primary-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
