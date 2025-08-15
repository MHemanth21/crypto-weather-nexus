'use client';

import { useAppSelector } from '@/store';
import { RootState } from '@/store';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

export default function NewsSection() {
  const { items: newsItems, loading, error } = useAppSelector((state: RootState) => state.news);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">Latest News</h2>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">Latest News</h2>
        <p className="text-red-500 dark:text-red-400 text-sm sm:text-base">Error loading news data</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">Latest News</h2>
      <div className="space-y-3 sm:space-y-4">
        {newsItems.map((item: NewsItem, index: number) => (
          <div key={index} className="border-b dark:border-gray-700 pb-3 sm:pb-4 last:border-b-0">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-2 sm:p-3 rounded-lg transition-all duration-200 hover:shadow-sm"
            >
              <h3 className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 line-clamp-2 text-sm sm:text-base leading-relaxed">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-2 leading-relaxed">
                {truncateText(item.description, 120)}
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 sm:mt-3 gap-1 sm:gap-2">
                <span className="font-medium text-gray-500 dark:text-gray-400 text-xs">{item.source}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">{new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 