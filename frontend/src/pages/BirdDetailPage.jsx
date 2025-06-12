import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { 
  FiArrowLeft, 
  FiMapPin, 
  FiVolumeX, 
  FiHeart, 
  FiEye, 
  FiStar,
  FiInfo,
  FiHome
} from 'react-icons/fi';
import birdService from '../services/birdService';
import BirdCard from '../components/birdpedia/BirdCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BirdDetailPage = () => {
  const { birdId } = useParams();

  // Fetch specific bird details
  const { 
    data: bird, 
    isLoading: birdLoading, 
    isError: birdError,
    error: birdErrorMessage 
  } = useQuery(
    ['birdDetails', birdId],
    () => birdService.getBirdDetails(birdId),
    {
      enabled: !!birdId,
      staleTime: 5 * 60 * 1000,
    }
  );

  // Fetch all birds for recommendations (use cached data if available)
  const { data: allBirds } = useQuery(
    'allBirds',
    () => birdService.getAllBirds(),
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  // Get other birds for recommendations
  const otherBirds = React.useMemo(() => {
    if (!allBirds || !bird) return [];
    return allBirds
      .filter(b => b.id !== bird.id)
      .slice(0, 4);
  }, [allBirds, bird]);

  if (birdLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600">Memuat detail burung...</p>
        </div>
      </div>
    );
  }

  if (birdError || !bird) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">🐦</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Burung Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-4">
            {birdErrorMessage?.message || 'Burung yang Anda cari tidak ditemukan'}
          </p>
          <Link
            to="/birdpedia"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Kembali ke Birdpedia
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = bird.foto_voice && bird.foto_voice.length > 0 
    ? bird.foto_voice[0].foto_url 
    : 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/birdpedia"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Birdpedia
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bird Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={imageUrl}
                  alt={bird.common_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {bird.common_name}
                  </h1>
                  <p className="text-lg italic opacity-90">
                    {bird.scientific_name}
                  </p>
                </div>
              </div>

              {/* Scrollable Content Panel */}
              <div className="max-h-[600px] overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
                        Panjang
                      </p>
                      <p className="text-lg font-bold text-green-800">
                        {bird.size_length_cm ? `${bird.size_length_cm} cm` : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                        Berat
                      </p>
                      <p className="text-lg font-bold text-blue-800">
                        {bird.size_weight_g ? `${bird.size_weight_g} g` : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                        Rentang Sayap
                      </p>
                      <p className="text-lg font-bold text-purple-800">
                        {bird.size_wingspan_cm ? `${bird.size_wingspan_cm} cm` : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
                        Status
                      </p>
                      <p className="text-sm font-bold text-orange-800">
                        {bird.conservation_status || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Description Section */}
                  {bird.description && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiInfo className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Deskripsi</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {bird.description}
                      </p>
                    </div>
                  )}

                  {/* Habitat Section */}
                  {bird.habitat && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiMapPin className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Habitat</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {bird.habitat}
                      </p>
                    </div>
                  )}

                  {/* Vocalization Section */}
                  {bird.vocalization && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiVolumeX className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Suara</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {bird.vocalization}
                      </p>
                    </div>
                  )}

                  {/* Diet Section */}
                  {bird.diet && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiHeart className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Makanan</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {bird.diet}
                      </p>
                    </div>
                  )}

                  {/* Behavior Section */}
                  {bird.behavior && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiEye className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Perilaku</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {bird.behavior}
                      </p>
                    </div>
                  )}

                  {/* Nesting Section */}
                  {bird.nesting && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiHome className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Bersarang</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {bird.nesting}
                      </p>
                    </div>
                  )}

                  {/* Cool Facts Section */}
                  {bird.cool_facts && Array.isArray(bird.cool_facts) && bird.cool_facts.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiStar className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Fakta Menarik</h2>
                      </div>
                      <ul className="space-y-2">
                        {bird.cool_facts.map((fact, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Finding Tips Section */}
                  {bird.finding_tips && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiEye className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Tips Menemukan</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {bird.finding_tips}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Other Birds */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Burung Lainnya
              </h3>
              
              {otherBirds.length > 0 ? (
                <div className="space-y-6">
                  {otherBirds.map((otherBird) => (
                    <div key={otherBird.id} className="transform scale-95">
                      <BirdCard bird={otherBird} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">🐦</div>
                  <p className="text-gray-500">Tidak ada burung lain tersedia</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdDetailPage;