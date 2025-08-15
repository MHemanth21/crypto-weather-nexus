'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { fetchWeatherData } from '@/store/slices/weatherSlice';
import WeatherSection from '@/components/WeatherSection';

const DEFAULT_CITIES = ['New York', 'London', 'Tokyo'];

export default function WeatherPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWeatherData(DEFAULT_CITIES));
    const interval = setInterval(() => {
      dispatch(fetchWeatherData(DEFAULT_CITIES));
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">
        Weather
      </h1>
      <WeatherSection />
    </div>
  );
} 