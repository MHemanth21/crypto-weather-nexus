'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCryptoData } from '@/store/slices/cryptoSlice';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { toggleFavoriteCrypto } from '@/store/slices/favoritesSlice';
import PriceChart from '@/components/PriceChart';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export default function CryptoDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.crypto);
  const { cryptos: favoriteCryptos } = useAppSelector((state) => state.favorites);
  
  // Decode the crypto ID from the URL
  const decodedId = decodeURIComponent(id as string);
  const crypto = data[decodedId];

  useEffect(() => {
    if (decodedId) {
      dispatch(fetchCryptoData([decodedId]));
    }
  }, [dispatch, decodedId]);

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

  if (error || !crypto) {
    return (
      <div className="w-full">
        <div className="text-red-400 text-sm sm:text-base">
          {error || `Cryptocurrency data not available for ${decodedId}`}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{crypto.name}</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            {new Date().toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => dispatch(toggleFavoriteCrypto(decodedId))}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 self-start sm:self-auto"
          aria-label={favoriteCryptos.includes(decodedId) ? "Remove from favorites" : "Add to favorites"}
        >
          {favoriteCryptos.includes(decodedId) ? (
            <HeartIconSolid className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 sm:h-8 sm:w-8" />
          )}
        </button>
      </div>

      {/* Price Chart */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Price Chart (7 Days)</h2>
        <PriceChart cryptoId={decodedId} />
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Price Information */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Price Information</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Current Price</p>
              <p className="text-xl sm:text-2xl font-bold text-white">${crypto.current_price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm sm:text-base">24h Change</p>
              <p className={`text-lg sm:text-xl ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Market Cap</p>
              <p className="text-lg sm:text-xl text-white">${(crypto.market_cap / 1e9).toFixed(2)}B</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Additional Information</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Rank</p>
              <p className="text-white text-sm sm:text-base">#{crypto.market_cap_rank}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Circulating Supply</p>
              <p className="text-white text-sm sm:text-base">{formatNumber(crypto.circulating_supply)} {crypto.symbol}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm sm:text-base">Total Supply</p>
              <p className="text-white text-sm sm:text-base">{formatNumber(crypto.total_supply)} {crypto.symbol}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 