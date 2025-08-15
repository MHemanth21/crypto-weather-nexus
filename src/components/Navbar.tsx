'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/crypto', label: 'Crypto' },
  { href: '/weather', label: 'Weather' },
  { href: '/favorites', label: 'Favorites', icon: StarIcon },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-lg sm:text-xl font-bold text-white hover:text-blue-300 transition-colors">
                CryptoWeather
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? 'border-blue-400 text-white'
                      : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                  } inline-flex items-center px-2 sm:px-3 py-2 border-b-2 text-sm font-medium transition-all duration-200 hover:scale-105`}
                >
                  {link.icon && <link.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />}
                  <span className="hidden sm:inline">{link.label}</span>
                  <span className="sm:hidden">{link.label.charAt(0)}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-3 sm:px-4 pt-2 pb-4 space-y-1 bg-gray-800 border-t border-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? 'bg-gray-900 border-l-4 border-blue-400 text-white'
                  : 'border-l-4 border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white'
              } block pl-4 pr-4 py-3 text-base font-medium transition-all duration-200 rounded-r-lg`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                {link.icon && <link.icon className="h-5 w-5 mr-3" />}
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 