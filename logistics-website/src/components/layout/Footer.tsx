import Link from 'next/link';
import { Truck, Package, BarChart3, Globe2, Mail, Phone, Clock, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Main footer content */}
      <div className="relative pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Company Overview */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-400" />
                Saiyana Group
              </h3>
              <p className="text-gray-300 mb-6">
                Founded in 1996 by Namburi Sekhar, Saiyana Group has evolved from 
                stationery product marketing to becoming pioneers in warehousing and 
                logistics. We pride ourselves on building lasting relationships and 
                delivering cost-effective solutions for distributors and retailers.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Globe2 className="w-5 h-5 text-primary-400" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <BarChart3 className="w-5 h-5 text-primary-400" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Truck className="w-5 h-5 text-primary-400" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Navigation</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-primary-400 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-2 transition-all" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-primary-400 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-2 transition-all" />
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="text-gray-300 hover:text-primary-400 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-2 transition-all" />
                    Our Journey
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-primary-400 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-2 transition-all" />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Solutions</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/services#warehousing" className="text-gray-300 hover:text-primary-400 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-2 transition-all" />
                    Warehousing Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services#distribution" className="text-gray-300 hover:text-primary-400 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-2 transition-all" />
                    Distribution Services
                  </Link>
                </li>
                <li>
                  <Link href="/services#logistics" className="text-gray-300 hover:text-primary-400 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-2 transition-all" />
                    Logistics Management
                  </Link>
                </li>
                <li>
                  <Link href="/services#retail" className="text-gray-300 hover:text-primary-400 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:w-2 transition-all" />
                    Retail Solutions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-1" />
                  <div>
                    Kowluru Arcade, Opp: Papaji Dhaba Lane, Shivam Rd, 
                    New Nallakunta, Hyderabad, Telangana 500044, India
                  </div>
                </li>
                <li className="flex gap-3 items-center text-gray-300">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <a href="mailto:saiyanacfa@gmail.com" className="hover:text-primary-400">
                    saiyanacfa@gmail.com
                  </a>
                </li>
                <li className="flex gap-3 items-center text-gray-300">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <a href="tel:+919440649884" className="hover:text-primary-400">
                    +91 9440649884
                  </a>
                </li>
                <li className="flex gap-3 items-center text-gray-300">
                  <Clock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <div>
                    <div>MON-SAT | 9am to 6pm</div>
                    <div>SUN | 9am to 5pm</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {currentYear} Saiyana Group - Pioneering Logistics Since 1996. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}