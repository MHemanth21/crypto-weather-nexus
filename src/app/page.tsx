'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white leading-tight">
          Welcome to CryptoWeather Nexus
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-gray-300 leading-relaxed px-2">
          Your one-stop dashboard for cryptocurrency prices and weather information
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/crypto"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            View Cryptocurrencies
          </Link>
          <Link
            href="/weather"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Check Weather
          </Link>
        </div>
      </div>
    </div>
  );
}
