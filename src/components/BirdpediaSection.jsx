import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";
import Masonry from 'react-masonry-css';
import { realBirdData, getUniqueHabitats } from "../data/realBirdData";
import EnhancedBirdCard from "./birdpedia/EnhancedBirdCard";

const BirdpediaSection = () => {
  const { birdName } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [habitatFilter, setHabitatFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get unique habitats for filter dropdown
  const habitats = getUniqueHabitats();

  // Filter birds based on search term and habitat
  const filteredBirds = realBirdData.filter(
    (bird) => {
      const matchesSearch = !searchTerm || 
        bird.common_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bird.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bird.family?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesHabitat = !habitatFilter || 
        bird.habitat?.toLowerCase().includes(habitatFilter.toLowerCase());
      
      return matchesSearch && matchesHabitat;
    }
  );

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // If accessing specific bird by name (legacy route)
  if (birdName) {
    const selectedBird = realBirdData.find(
      (bird) => bird.common_name?.toLowerCase().replace(/\s+/g, "-") === birdName
    );

    if (!selectedBird) {
      return (
        <div className="container mx-auto mt-16 px-4 text-center min-h-screen flex items-center justify-center">
          <Helmet>
            <title>Burung Tidak Ditemukan - Kicau Finder</title>
          </Helmet>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">🐦</div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Burung Tidak Ditemukan
            </h1>
            <p className="text-text-secondary mb-8">
              Maaf, burung yang Anda cari tidak ada dalam database kami.
            </p>
            <motion.button
              onClick={() => navigate("/birdpedia")}
              className="bg-brand-sage text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-brand-forest hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-arrow-left mr-2" />
              Kembali ke Birdpedia
            </motion.button>
          </motion.div>
        </div>
      );
    }

    // Redirect to new detail page route
    navigate(`/birdpedia/${selectedBird.id}`);
    return null;
  }

  return (
    <div className="min-h-screen bg-ui-bg">
      <Helmet>
        <title>Birdpedia - Kicau Finder</title>
      </Helmet>
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-sage to-brand-forest text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              Birdpedia
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Jelajahi koleksi lengkap informasi burung dari berbagai spesies di seluruh dunia
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <motion.div 
          className="bg-ui-surface rounded-2xl shadow-lg p-6 mb-8 border border-ui-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-text-secondary" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari burung berdasarkan nama, nama ilmiah, atau famili..."
                className="block w-full pl-10 pr-3 py-3 border border-ui-border rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent bg-ui-bg text-text-primary placeholder-text-secondary"
              />
            </div>

            {/* Habitat Filter */}
            <div className="relative min-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="h-5 w-5 text-text-secondary" />
              </div>
              <select
                value={habitatFilter}
                onChange={(e) => setHabitatFilter(e.target.value)}
                className="block w-full pl-10 pr-8 py-3 border border-ui-border rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent appearance-none bg-ui-bg text-text-primary"
              >
                <option value="">Semua Habitat</option>
                {habitats.map((habitat) => (
                  <option key={habitat} value={habitat}>
                    {habitat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-text-secondary">
            Menampilkan {filteredBirds.length} dari {realBirdData.length} burung
          </div>
        </motion.div>

        {/* Birds Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-sage"></div>
            <p className="text-text-secondary mt-4 text-lg">Memuat burung...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredBirds.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid-column"
              >
                {filteredBirds.map((bird, index) => (
                  <motion.div
                    key={bird.id}
                    variants={itemVariants}
                    className="mb-6"
                  >
                    <EnhancedBirdCard bird={bird} index={index} />
                  </motion.div>
                ))}
              </Masonry>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-semibold text-text-primary mb-2">
                  Tidak ada burung ditemukan
                </h3>
                <p className="text-text-secondary">
                  Coba ubah kata kunci pencarian atau filter habitat
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BirdpediaSection;