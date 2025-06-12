import React from 'react';
import { Link } from 'react-router-dom';
import { FiMic, FiUpload, FiSearch, FiBookOpen } from 'react-icons/fi';
import birdImage from '../assets/bird.png';

const HomePage = () => {
  const features = [
    {
      icon: <FiMic className="w-8 h-8" />,
      title: 'Record Audio',
      description: 'Record bird sounds directly from your device',
      color: 'bg-blue-500',
    },
    {
      icon: <FiUpload className="w-8 h-8" />,
      title: 'Upload Files',
      description: 'Upload existing audio files for identification',
      color: 'bg-green-500',
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: 'AI Identification',
      description: 'Advanced AI technology identifies bird species',
      color: 'bg-purple-500',
    },
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      title: 'Learn More',
      description: 'Explore detailed information about each species',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Birds by Their
                  <span className="text-green-500 block">Beautiful Songs</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Use advanced AI technology to identify bird species from their sounds. 
                  Record, upload, or analyze bird calls and discover the amazing world of avian life.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/identify"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <FiMic className="w-5 h-5 mr-2" />
                  Start Identifying
                </Link>
                <Link
                  to="/birdpedia"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-500 font-semibold rounded-lg border-2 border-green-500 hover:bg-green-50 transform hover:scale-105 transition-all duration-200"
                >
                  <FiBookOpen className="w-5 h-5 mr-2" />
                  Explore Birdpedia
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-green-200 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src={birdImage}
                  alt="Colorful bird"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology makes bird identification simple and accurate. 
              Follow these easy steps to discover the birds around you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Your Bird Discovery Journey?
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Join thousands of bird enthusiasts who use Kicau Finder to explore 
              and learn about the amazing world of birds.
            </p>
            <Link
              to="/identify"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <FiMic className="w-5 h-5 mr-2" />
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;