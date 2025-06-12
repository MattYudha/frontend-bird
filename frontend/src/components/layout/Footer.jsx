import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐦</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-xl">Kicau</span>
                <span className="font-bold text-xl text-green-400">Finder</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Identify bird species by their sounds using advanced AI technology. 
              Connect with nature and discover the rich diversity of bird life around you.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:support@kicaufinder.com"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <FiMail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/identify"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Identify Birds
                </Link>
              </li>
              <li>
                <Link
                  to="/birdpedia"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Birdpedia
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@kicaufinder.com"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Kicau Finder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;