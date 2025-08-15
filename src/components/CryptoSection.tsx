'use client';

import { useAppSelector, useAppDispatch } from '@/store';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { toggleFavoriteCrypto } from '@/store/slices/favoritesSlice';
import Link from 'next/link';

interface CryptoSectionProps {
  showOnlyFavorites?: boolean;
}

export default function CryptoSection({ showOnlyFavorites = false }: CryptoSectionProps) {
  const dispatch = useAppDispatch();
  const { data: cryptoData, loading, error, lastUpdated } = useAppSelector((state) => state.crypto);
  const { cryptos: favoriteCryptos } = useAppSelector((state) => state.favorites);

  // Filter crypto data to show only favorite cryptos if showOnlyFavorites is true
  const filteredCryptoData = showOnlyFavorites
    ? Object.values(cryptoData).filter(crypto => favoriteCryptos.includes(crypto.id))
    : Object.values(cryptoData);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Cryptocurrency</h2>
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
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Cryptocurrency</h2>
        <div className="text-red-400 text-sm sm:text-base">
          <p>{error}</p>
          {error.includes('Rate limit') && (
            <p className="mt-2 text-xs sm:text-sm">Please wait a few minutes before trying again.</p>
          )}
        </div>
      </div>
    );
  }

  if (showOnlyFavorites && filteredCryptoData.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Cryptocurrency</h2>
        <p className="text-gray-400 text-sm sm:text-base">No favorite cryptocurrencies selected</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-0">Cryptocurrency</h2>
        {lastUpdated && (
          <span className="text-xs sm:text-sm text-gray-400">
            Updated {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="space-y-3 sm:space-y-4">
        {filteredCryptoData.map((crypto) => (
          <Link 
            key={crypto.id} 
            href={`/crypto/${crypto.id}`}
            className="block"
          >
            <div className="border border-gray-700 rounded-lg p-3 sm:p-4 bg-gray-800 hover:bg-gray-700 transition-all duration-200 hover:shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <img 
                    src={crypto.image} 
                    alt={crypto.name} 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-white text-sm sm:text-base">{crypto.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{crypto.symbol}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleFavoriteCrypto(crypto.id));
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 sm:p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-label={favoriteCryptos.includes(crypto.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favoriteCryptos.includes(crypto.id) ? (
                    <HeartIconSolid className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
              <div className="mt-2 sm:mt-3">
                <p className="text-lg sm:text-xl font-bold text-white">
                  ${crypto.current_price.toLocaleString()}
                </p>
                <div className="mt-1 sm:mt-2 space-y-1">
                  <p className={`text-xs sm:text-sm ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    24h: {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Market Cap: ${(crypto.market_cap / 1e9).toFixed(2)}B
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 