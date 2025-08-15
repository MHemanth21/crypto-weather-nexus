'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchWeatherData } from '@/store/slices/weatherSlice';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { toggleFavoriteCity } from '@/store/slices/favoritesSlice';

export default function WeatherDetail() {
  const { city } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.weather);
  const { cities: favoriteCities } = useAppSelector((state) => state.favorites);
  
  // Decode the city name from the URL
  const decodedCity = decodeURIComponent(city as string);
  const weather = data[decodedCity];

  useEffect(() => {
    if (decodedCity) {
      dispatch(fetchWeatherData([decodedCity]));
    }
  }, [dispatch, decodedCity]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse space-y-6">
          <div className="h-6 sm:h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2 mb-6 sm:mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="h-24 sm:h-32 bg-gray-800 rounded"></div>
            <div className="h-24 sm:h-32 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="w-full">
        <div className="text-red-400 text-sm sm:text-base">
          {error || `Weather data not available for ${decodedCity}`}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{decodedCity}</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            {new Date(weather.dt * 1000).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => dispatch(toggleFavoriteCity(decodedCity))}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 self-start sm:self-auto"
          aria-label={favoriteCities.includes(decodedCity) ? "Remove from favorites" : "Add to favorites"}
        >
          {favoriteCities.includes(decodedCity) ? (
            <HeartIconSolid className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 sm:h-8 sm:w-8" />
          )}
        </button>
      </div>

      {/* Weather Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Current Weather */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Current Weather</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Temperature</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{Math.round(weather.main.temp)}°C</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Feels Like</p>
              <p className="text-lg sm:text-xl text-white">{Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Humidity</p>
              <p className="text-lg sm:text-xl text-white">{weather.main.humidity}%</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Wind Speed</p>
              <p className="text-lg sm:text-xl text-white">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Additional Information</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Pressure</p>
              <p className="text-white text-sm sm:text-base">{weather.main.pressure} hPa</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Conditions</p>
              <p className="text-white text-sm sm:text-base capitalize">{weather.weather[0].description}</p>
            </div>
            {weather.visibility && (
              <div>
                <p className="text-gray-400 text-sm sm:text-base">Visibility</p>
                <p className="text-white text-sm sm:text-base">{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
            )}
            {weather.sys?.sunrise && (
              <div>
                <p className="text-gray-400 text-sm sm:text-base">Sunrise</p>
                <p className="text-white text-sm sm:text-base">
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}
            {weather.sys?.sunset && (
              <div>
                <p className="text-gray-400 text-sm sm:text-base">Sunset</p>
                <p className="text-white text-sm sm:text-base">
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 