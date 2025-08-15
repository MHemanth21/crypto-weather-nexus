'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { fetchWeatherData } from '@/store/slices/weatherSlice';
import { fetchCryptoData } from '@/store/slices/cryptoSlice';
import { fetchNewsData } from '@/store/slices/newsSlice';
import { useWebSocket } from '@/hooks/useWebSocket';
import WeatherSection from '@/components/WeatherSection';
import CryptoSection from '@/components/CryptoSection';
import NewsSection from '@/components/NewsSection';

const DEFAULT_CITIES = ['New York', 'London', 'Tokyo'];
const DEFAULT_CRYPTOS = ['bitcoin', 'ethereum', 'cardano'];

export default function Dashboard() {
  const dispatch = useAppDispatch();
  useWebSocket();

  useEffect(() => {
    dispatch(fetchWeatherData(DEFAULT_CITIES));
    dispatch(fetchCryptoData(DEFAULT_CRYPTOS));
    dispatch(fetchNewsData());

    const interval = setInterval(() => {
      dispatch(fetchWeatherData(DEFAULT_CITIES));
      dispatch(fetchCryptoData(DEFAULT_CRYPTOS));
      dispatch(fetchNewsData());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">
        CryptoWeather Nexus
      </h1>
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
        {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Weather Section */}
          <div className="md:col-span-1">
            <WeatherSection />
          </div>
          
          {/* Crypto Section */}
          <div className="md:col-span-1">
            <CryptoSection />
          </div>
          
          {/* News Section - Full width on mobile, spans 2 on tablet, 1 on desktop */}
          <div className="md:col-span-2 lg:col-span-1">
            <NewsSection />
          </div>
        </div>
      </div>
    </div>
  );
} 