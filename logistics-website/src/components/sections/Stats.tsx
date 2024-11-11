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
  { label: 'Warehouses', value: 50, suffix: '+' },
  { label: 'Countries Served', value: 30, suffix: '+' },
  { label: 'Happy Clients', value: 1000, suffix: '+' },
  { label: 'Deliveries', value: 1, suffix: 'M+' },
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
    <span ref={elementRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function Stats() {
  return (
    <section className="py-20 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center text-white"
            >
              <div className="text-4xl font-bold mb-2">
                <Counter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  duration={2} 
                />
              </div>
              <div className="text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}