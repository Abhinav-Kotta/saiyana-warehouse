'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface LogoConfig {
  src: string;
  alt: string;
}

interface PartnersProps {
  logos: LogoConfig[];
}

export default function Partners({ logos }: PartnersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animatedContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [isMobile, setIsMobile] = useState(false);

  // Refs for mobile auto-scroll
  const autoScrollRef = useRef<number | null>(null);
  const isTouchingRef = useRef(false);
  const scrollSpeedRef = useRef(0.5); // pixels per frame

  // Double the logos to create seamless loop
  const doubledLogos = [...logos, ...logos];

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile auto-scroll using native scrollLeft
  const startAutoScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const tick = () => {
      if (!isTouchingRef.current && container) {
        container.scrollLeft += scrollSpeedRef.current;

        // When we've scrolled past the first set of logos, jump back seamlessly
        const halfScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= halfScroll) {
          container.scrollLeft -= halfScroll;
        }
      }
      autoScrollRef.current = requestAnimationFrame(tick);
    };

    autoScrollRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    // Start auto-scroll
    startAutoScroll();

    // Touch handlers: pause on touch, resume on release
    const handleTouchStart = () => {
      isTouchingRef.current = true;
    };

    const handleTouchEnd = () => {
      // Small delay before resuming so the momentum scroll feels natural
      setTimeout(() => {
        isTouchingRef.current = false;
      }, 2000);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, startAutoScroll]);

  // Desktop auto-scroll animation
  useEffect(() => {
    if (isMobile) return;

    const startAnimation = async () => {
      if (!animatedContainerRef.current) return;
      
      const containerWidth = animatedContainerRef.current.scrollWidth / 2;
      
      await controls.start({
        x: [0, -containerWidth],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    startAnimation();

    return () => {
      controls.stop();
    };
  }, [controls, isMobile]);

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
      return 'w-32 md:w-48';
    }
    if (src.includes('rorito-logo')) {
      return 'w-28 md:w-40 bg-blend-multiply';
    }
    return 'w-28 md:w-40';
  };

  // Mobile: auto-scrolling + touch-to-pause scrollable layout
  if (isMobile) {
    return (
      <section className="relative overflow-hidden bg-gray-900">
        <div className="relative py-10">
          <div className="container mx-auto px-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-2 text-white">Trusted Partners</h2>
              <p className="text-sm text-gray-400">
                Successfully serving industry leaders across sectors
              </p>
            </motion.div>
          </div>

          {/* Auto-scrolling + touch-scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 px-4 py-4 overflow-x-auto hide-scrollbar"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {doubledLogos.map((logo, index) => (
              <div
                key={index}
                className={`flex-shrink-0 ${getLogoClasses(logo.src)}`}
              >
                <div className="p-3 rounded-xl bg-white flex items-center justify-center h-20">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain"
                    style={getLogoStyles(logo.src)}
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: auto-scrolling animation
  return (
    <section className="relative overflow-hidden bg-gray-900">
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

        <div className="relative overflow-hidden">
          <motion.div
            ref={animatedContainerRef}
            className="flex items-center space-x-16 py-8"
            animate={controls}
          >
            {doubledLogos.map((logo, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 ${getLogoClasses(logo.src)}`}
                whileHover={{ 
                  scale: 1.05,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
              >
                <div className="p-4 rounded-xl bg-white flex items-center justify-center h-24 md:h-28">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain"
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