'use client';

import { useAppSelector, useAppDispatch } from '@/store';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { toggleFavoriteCity } from '@/store/slices/favoritesSlice';
import Link from 'next/link';

interface WeatherSectionProps {
  showOnlyFavorites?: boolean;
}

export default function WeatherSection({ showOnlyFavorites = false }: WeatherSectionProps) {
  const dispatch = useAppDispatch();
  const { data: weatherData, loading, error } = useAppSelector((state) => state.weather);
  const { cities: favoriteCities } = useAppSelector((state) => state.favorites);

  // Filter weather data to show only favorite cities if showOnlyFavorites is true
  const filteredWeatherData = showOnlyFavorites
    ? Object.values(weatherData).filter(cityData => favoriteCities.includes(cityData.city))
    : Object.values(weatherData);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Weather</h2>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Weather</h2>
        <p className="text-red-400 text-sm sm:text-base">Error loading weather data</p>
      </div>
    );
  }

  if (showOnlyFavorites && filteredWeatherData.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Weather</h2>
        <p className="text-gray-400 text-sm sm:text-base">No favorite cities selected</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Weather</h2>
      <div className="space-y-3 sm:space-y-4">
        {filteredWeatherData.map((cityData) => (
          <Link
            key={cityData.city}
            href={`/weather/${encodeURIComponent(cityData.city)}`}
            className="block"
          >
            <div className="border border-gray-700 rounded-lg p-3 sm:p-4 bg-gray-800 hover:bg-gray-700 transition-all duration-200 hover:shadow-md">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-white text-sm sm:text-base">{cityData.city}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleFavoriteCity(cityData.city));
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 sm:p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-label={favoriteCities.includes(cityData.city) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favoriteCities.includes(cityData.city) ? (
                    <HeartIconSolid className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
              <div className="mt-2 sm:mt-3">
                <p className="text-xl sm:text-2xl font-bold text-white">{cityData.temperature}°C</p>
                <div className="mt-1 sm:mt-2 space-y-1">
                  <p className="text-gray-400 text-xs sm:text-sm">Humidity: {cityData.humidity}%</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Conditions: {cityData.conditions}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 