'use client';

import { useAppSelector } from '@/store';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { fetchWeatherData } from '@/store/slices/weatherSlice';
import { fetchCryptoData } from '@/store/slices/cryptoSlice';
import WeatherSection from '@/components/WeatherSection';
import CryptoSection from '@/components/CryptoSection';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const { cities: favoriteCities, cryptos: favoriteCryptos } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    if (favoriteCities.length > 0) {
      dispatch(fetchWeatherData(favoriteCities));
    }
    if (favoriteCryptos.length > 0) {
      dispatch(fetchCryptoData(favoriteCryptos));
    }
  }, [dispatch, favoriteCities, favoriteCryptos]);

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">
        My Favorites
      </h1>
      
      {favoriteCities.length === 0 && favoriteCryptos.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <p className="text-gray-400 text-lg sm:text-xl mb-2">You haven't added any favorites yet.</p>
          <p className="text-gray-500 text-sm sm:text-base">Add cities and cryptocurrencies to your favorites to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {favoriteCities.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">Favorite Cities</h2>
              <WeatherSection showOnlyFavorites={true} />
            </div>
          )}
          
          {favoriteCryptos.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">Favorite Cryptocurrencies</h2>
              <CryptoSection showOnlyFavorites={true} />
            </div>
          )}
        </div>
      )}
    </div>
  );
} 