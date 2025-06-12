import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiArrowLeft, FiShare2, FiMic } from 'react-icons/fi';
import BirdCard from '../components/birdpedia/BirdCard';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get results from navigation state
  const results = location.state?.results || [];
  const audioFile = location.state?.audioFile;

  // If no results, redirect to identify page
  React.useEffect(() => {
    if (results.length === 0) {
      navigate('/identify');
    }
  }, [results, navigate]);

  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (results.length === 0) return null;

    return {
      labels: results.map((bird) => bird.common_name || 'Unknown'),
      datasets: [
        {
          label: 'Confidence (%)',
          data: results.map((bird) => Math.round((bird.confidence || 0) * 100)),
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',   // green-500
            'rgba(59, 130, 246, 0.8)',  // blue-500
            'rgba(168, 85, 247, 0.8)',  // purple-500
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(168, 85, 247, 1)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    };
  }, [results]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Tingkat Kepercayaan Identifikasi',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#374151',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Kepercayaan: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Kepercayaan (%)',
          font: {
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Spesies Burung',
          font: {
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const handleShare = async () => {
    const shareText = results
      .map((bird, index) => 
        `${index + 1}. ${bird.common_name || 'Unknown'} (${Math.round((bird.confidence || 0) * 100)}%)`
      )
      .join('\n');
    
    const fullText = `🐦 Hasil Identifikasi Burung dari Kicau Finder:\n\n${shareText}\n\nCoba sendiri di Kicau Finder!`;

    // Try to use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hasil Identifikasi Burung',
          text: fullText,
        });
        return;
      } catch (error) {
        console.log('Web Share API failed, falling back to clipboard');
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(fullText);
      alert('Hasil berhasil disalin ke clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Gagal menyalin hasil. Silakan coba lagi.');
    }
  };

  if (results.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/identify"
              className="inline-flex items-center text-green-100 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Identifikasi Lagi
            </Link>
            
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <FiShare2 className="w-4 h-4 mr-2" />
              Bagikan
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hasil Identifikasi
            </h1>
            <p className="text-xl text-green-100">
              Berikut adalah {results.length} prediksi teratas untuk suara burung Anda
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Audio File Info */}
        {audioFile && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <FiMic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  File Audio yang Dianalisis
                </h3>
                <p className="text-gray-600">
                  {audioFile.name} • {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results Cards */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Prediksi Burung
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((bird, index) => (
                  <div
                    key={bird.id || index}
                    className="relative animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Ranking Badge */}
                    <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                    
                    <BirdCard bird={bird} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Grafik Kepercayaan
              </h3>
              
              {chartData && (
                <div className="h-80">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              )}
              
              {/* Summary Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Prediksi Terbaik:</span>
                    <span className="font-semibold text-green-600">
                      {Math.round((results[0]?.confidence || 0) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rata-rata Kepercayaan:</span>
                    <span className="font-semibold text-gray-900">
                      {Math.round(
                        results.reduce((acc, bird) => acc + (bird.confidence || 0), 0) / results.length * 100
                      )}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Prediksi:</span>
                    <span className="font-semibold text-gray-900">
                      {results.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/identify"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FiMic className="w-5 h-5 mr-2" />
            Identifikasi Lagi
          </Link>
          
          <Link
            to="/birdpedia"
            className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border-2 border-green-500 hover:bg-green-50 transition-all duration-200 transform hover:scale-105"
          >
            Jelajahi Birdpedia
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;