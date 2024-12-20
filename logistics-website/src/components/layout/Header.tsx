'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHeaderStyles = () => {
    if (isHomePage) {
      return scrolled ? 'bg-white shadow-md' : 'bg-transparent';
    }
    return 'bg-white shadow-md';
  };

  const getLinkStyles = () => {
    if (isHomePage) {
      return scrolled 
        ? 'text-gray-700 hover:text-primary-600' 
        : 'text-white hover:text-gray-200';
    }
    return 'text-gray-700 hover:text-primary-600';
  };

  const getLogoStyles = () => {
    if (isHomePage) {
      return scrolled 
        ? 'text-primary-600' 
        : 'text-white';
    }
    return 'text-primary-600';
  };

  const getMenuButtonStyles = () => {
    if (isHomePage) {
      return scrolled 
        ? 'text-gray-700' 
        : 'text-white';
    }
    return 'text-gray-700';
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${getHeaderStyles()}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className={`text-2xl font-bold transition-colors duration-300 ${getLogoStyles()}`}
          >
            Saiyana 3PL
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-300 ${getLinkStyles()}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className={`md:hidden transition-colors duration-300 ${getMenuButtonStyles()}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg rounded-b-lg"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}