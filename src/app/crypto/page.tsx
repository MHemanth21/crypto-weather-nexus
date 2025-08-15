'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { fetchCryptoData } from '@/store/slices/cryptoSlice';
import CryptoSection from '@/components/CryptoSection';

const DEFAULT_CRYPTOS = ['bitcoin', 'ethereum', 'cardano'];

export default function CryptoPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData(DEFAULT_CRYPTOS));
    const interval = setInterval(() => {
      dispatch(fetchCryptoData(DEFAULT_CRYPTOS));
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">
        Cryptocurrency
      </h1>
      <CryptoSection />
    </div>
  );
} 