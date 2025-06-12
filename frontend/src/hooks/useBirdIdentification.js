import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import birdService from '../services/birdService';
import { toast } from 'react-hot-toast';

export const useBirdIdentification = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const queryClient = useQueryClient();

  const identifyMutation = useMutation(
    (audioFile) => birdService.identifyBird(audioFile),
    {
      onSuccess: (data) => {
        toast.success('Burung berhasil diidentifikasi!');
        // Invalidate and refetch identification history
        queryClient.invalidateQueries('identificationHistory');
      },
      onError: (error) => {
        toast.error(error.message || 'Gagal mengidentifikasi burung');
      },
    }
  );

  const saveResultMutation = useMutation(
    (result) => birdService.saveIdentificationResult(result),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('identificationHistory');
      },
      onError: (error) => {
        console.error('Failed to save result:', error);
      },
    }
  );

  const identifyBird = async (file) => {
    if (!file) {
      toast.error('Silakan berikan file audio');
      return;
    }

    try {
      const result = await identifyMutation.mutateAsync(file);
      
      // Save the result to history if user is authenticated
      try {
        await saveResultMutation.mutateAsync({
          audioFileName: file.name,
          results: result.map(bird => ({
            birdName: bird.common_name,
            scientificName: bird.scientific_name,
            confidence: bird.confidence,
          })),
          confidence: result[0]?.confidence || 0,
        });
      } catch (saveError) {
        // Don't fail the identification if saving fails
        console.warn('Failed to save identification result:', saveError);
      }

      return { predictions: result };
    } catch (error) {
      throw error;
    }
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleRecordingComplete = (recordedBlob) => {
    const audioFile = new File([recordedBlob.blob], 'recorded-audio.wav', {
      type: 'audio/wav',
    });
    setAudioFile(audioFile);
  };

  const handleFileUpload = (file) => {
    setAudioFile(file);
  };

  const clearAudio = () => {
    setAudioFile(null);
  };

  return {
    audioFile,
    isRecording,
    isIdentifying: identifyMutation.isLoading,
    identificationResult: identifyMutation.data,
    identifyBird,
    startRecording,
    stopRecording,
    handleRecordingComplete,
    handleFileUpload,
    clearAudio,
    error: identifyMutation.error,
  };
};