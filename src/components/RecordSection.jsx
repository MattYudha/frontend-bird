import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AudioRecorder from "./AudioRecorder";
import AudioDropzone from "./AudioDropzone";
import UrlInput from "./UrlInput";
import { simulateIdentification } from "../services/birdIdentificationService";
import { useBirdStore } from "../store/birdStore";

const RecordSection = () => {
  const navigate = useNavigate();
  const {
    audioFile,
    isLoading,
    error,
    uploadProgress,
    setAudioFile,
    setLoading,
    setError,
    setUploadProgress,
    setResults,
    addHistoryItem
  } = useBirdStore();

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAudioFile(file);
      console.log("Dropped file: ", file);
      setError(null);
    }
  };

  const handleUrlSubmit = async (audioUrl) => {
    try {
      setLoading(true);
      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }
      const blob = await response.blob();
      if (!blob.type.startsWith("audio/")) {
        throw new Error("File is not a valid audio format");
      }
      const file = new File([blob], "audio-from-url.mp3", { type: blob.type });
      setAudioFile(file);
      console.log("Fetched audio from URL: ", file);
      setError(null);
    } catch (error) {
      console.error("Error fetching audio from URL:", error);
      throw new Error(
        "Failed to fetch audio. Make sure the URL is accessible and in a supported format."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAudioFromRecorder = (recording) => {
    setAudioFile(recording.blob);
    console.log("Audio from recorder: ", recording);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!audioFile) {
      alert("Please record, upload, or insert a URL for an audio file first!");
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Use our realistic bird identification simulation
      const identificationResult = await simulateIdentification(audioFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Format results for the store
      const results = [
        identificationResult.primary,
        ...identificationResult.alternatives
      ];
      
      setResults(results);
      
      // Add to history with detailed information
      addHistoryItem({
        results: results.map(bird => ({
          birdName: bird.common_name,
          scientificName: bird.scientific_name,
          confidence: bird.confidence,
          species_code: bird.species_code,
          family: bird.family
        })),
        audioFileName: audioFile.name || 'Recorded Audio',
        audioFileSize: audioFile.size,
        processingTime: identificationResult.processingTime,
        primaryBirdId: identificationResult.primary.id
      });
      
      // Navigate to results with the identification data
      navigate("/results", { 
        state: { 
          identificationResult,
          audioFile 
        } 
      });
      
    } catch (error) {
      console.error("Error identifying bird:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-20">
      {/* Full-bleed nature background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        }}
      />
      
      {/* Nature overlay */}
      <div className="absolute inset-0 nature-overlay" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-lime-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4 text-shadow-soft">
            Identifikasi suara burung
            <span className="block text-brand-lime-accent">dalam hitungan detik</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-shadow-soft">
            Teknologi AI canggih bertemu dengan simfoni alam
          </p>
        </motion.div>

        {/* Main Glassmorphism Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`max-w-4xl mx-auto glass-panel-strong rounded-3xl p-8 md:p-12 shadow-2xl ${
            audioFile ? 'shadow-glow-lime' : ''
          }`}
        >
          {/* Audio Recorder Component */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AudioRecorder 
              onAudioReady={handleAudioFromRecorder}
              className="mb-8"
            />
          </motion.div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="px-4 text-white/70 text-sm font-medium">ATAU</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          {/* File Upload Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AudioDropzone 
              onFileDrop={handleFileDrop}
              className="!w-full !bg-white/5 !border-white/30 hover:!bg-white/10 hover:!border-brand-lime-accent/50"
            />
            <UrlInput 
              onUrlSubmit={handleUrlSubmit} 
              isLoading={isLoading}
              className="!w-full"
            />
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div 
              className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-red-200 mb-2">Terjadi Kesalahan:</h3>
              <p className="text-red-100 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Current Audio File Display */}
          {audioFile && (
            <motion.div 
              className="mt-6 p-4 bg-brand-lime-accent/20 border border-brand-lime-accent/30 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-brand-lime-accent mb-2 flex items-center">
                <i className="fas fa-file-audio mr-2"></i>
                File Audio Terpilih:
              </h3>
              <p className="text-white/90">
                {audioFile.name || 'Audio Rekaman'} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </motion.div>
          )}

          {/* Upload Progress */}
          {isLoading && uploadProgress > 0 && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/20 rounded-full h-3 backdrop-blur-sm">
                <motion.div 
                  className="bg-gradient-to-r from-brand-lime-accent to-brand-sage h-3 rounded-full shadow-glow-lime"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-white/80 mt-2 text-center">
                {uploadProgress < 90 ? `Mengunggah: ${uploadProgress}%` : 'Menganalisis suara burung...'}
              </p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              onClick={handleSubmit}
              disabled={isLoading || !audioFile}
              className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ${
                isLoading || !audioFile
                  ? 'bg-gray-400/50 text-gray-300 cursor-not-allowed'
                  : 'bg-brand-lime-accent text-brand-forest hover:bg-brand-lime-accent/90 hover:scale-105 shadow-glow-lime-strong'
              }`}
              whileHover={!isLoading && audioFile ? { scale: 1.05 } : {}}
              whileTap={!isLoading && audioFile ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-6 w-6 mr-3 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Mengidentifikasi Burung...
                </span>
              ) : (
                <>
                  <i className="fas fa-search mr-2"></i>
                  Identifikasi Burung
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecordSection;