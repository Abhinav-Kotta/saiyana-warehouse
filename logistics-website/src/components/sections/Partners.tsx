'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface LogoConfig {
  src: string;
  alt: string;
}

interface PartnersProps {
  logos: LogoConfig[];
}

export default function Partners({ logos }: PartnersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Double the logos to create seamless loop
  const doubledLogos = [...logos, ...logos];

  useEffect(() => {
    const startAnimation = async () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      
      await controls.start({
        x: [-containerWidth / 2, -containerWidth],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    startAnimation();
  }, [controls]);

  const getLogoStyles = (src: string): React.CSSProperties => {
    if (src.includes('rorito-logo')) {
      return {
        filter: 'brightness(1.1) contrast(1.2)',
        backgroundColor: 'transparent',
      };
    }
    return {};
  };

  const getLogoClasses = (src: string): string => {
    if (src.includes('amway-logo')) {
      return 'h-24 w-44';
    }
    if (src.includes('rorito-logo')) {
      return 'h-20 w-36 bg-blend-multiply';
    }
    return 'h-20 w-36';
  };

  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* Main content */}
      <div className="relative py-24">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />

        <div className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Trusted Partners</h2>
            <p className="text-lg text-gray-400">
              Successfully serving industry leaders across sectors
            </p>
          </motion.div>
        </div>

        <div className="relative" ref={containerRef}>
          <motion.div
            className="flex items-center space-x-16 py-8"
            animate={controls}
          >
            {doubledLogos.map((logo, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 relative ${getLogoClasses(logo.src)}`}
                whileHover={{ 
                  scale: 1.05,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
              >
                <div className="p-4 rounded-xl bg-white">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-full w-full object-contain"
                    style={getLogoStyles(logo.src)}
                    loading="eager"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}