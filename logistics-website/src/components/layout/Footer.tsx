import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Saiyana</h3>
            <p className="text-gray-400">
              Your trusted partner in pharmaceutical care and solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Pharmaceutical Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Distribution
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Supply Chain
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>2-2-1109/5/1, Vaibhav Colony</li>
              <li>Bagh Amberpet, Hyderabad</li>
              <li>Telangana 500013, India</li>
              <li>
                <a href="mailto:info@saiyanapharmacare.com" className="hover:text-white">
                  info@saiyanapharmacare.com
                </a>
              </li>
              <li>
                <a href="tel:+919440649884" className="hover:text-white">
                  +91 9440649884
                </a>
              </li>
              <li>MON-SAT | 9am to 6pm</li>
              <li>SUN | 9am to 5pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Saiyana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}