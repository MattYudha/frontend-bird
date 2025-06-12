import React from 'react';
import { useQuery } from 'react-query';
import { FiClock, FiMic, FiTrendingUp } from 'react-icons/fi';
import birdService from '../services/birdService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HistoryPage = () => {
  const { data: history, isLoading, isError } = useQuery(
    'identificationHistory',
    () => birdService.getIdentificationHistory(),
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600">Memuat riwayat identifikasi...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Gagal Memuat Riwayat
          </h1>
          <p className="text-gray-600 mb-4">
            Terjadi kesalahan saat memuat riwayat identifikasi
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Riwayat Identifikasi
          </h1>
          <p className="text-xl text-green-100">
            Lihat kembali semua burung yang pernah Anda identifikasi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {history && history.length > 0 ? (
          <div className="space-y-6">
            {history.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <FiMic className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.audioFileName || 'Audio File'}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="w-4 h-4 mr-1" />
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiTrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                      {Math.round((item.confidence || 0) * 100)}% confidence
                    </span>
                  </div>
                </div>

                {item.results && item.results.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {item.results.slice(0, 3).map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {result.birdName || 'Unknown Bird'}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {result.scientificName || 'Scientific name not available'}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Rank #{resultIndex + 1}
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            {Math.round((result.confidence || 0) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🐦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Belum Ada Riwayat
            </h3>
            <p className="text-gray-600 mb-6">
              Anda belum melakukan identifikasi burung. Mulai identifikasi pertama Anda!
            </p>
            <a
              href="/identify"
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FiMic className="w-5 h-5 mr-2" />
              Mulai Identifikasi
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;