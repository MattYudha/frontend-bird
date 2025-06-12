import apiClient from '../config/api';

class BirdService {
  async identifyBird(audioFile) {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);
      
      const response = await apiClient.post('/birds/upload-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds for audio processing
      });
      
      return response.data;
    } catch (error) {
      console.error('Bird identification error:', error);
      throw new Error(error.response?.data?.message || 'Bird identification failed');
    }
  }

  async getBirdDetails(birdId) {
    try {
      const response = await apiClient.get(`/birds/${birdId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bird details');
    }
  }

  async getAllBirds(params = {}) {
    try {
      const response = await apiClient.get('/birds', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch birds');
    }
  }

  async getBirdByCommonName(name) {
    try {
      const response = await apiClient.get(`/birds/name/${encodeURIComponent(name)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Bird not found');
    }
  }

  async getBirdsByHabitat(habitat) {
    try {
      const response = await apiClient.get(`/birds/habitat/${encodeURIComponent(habitat)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch birds by habitat');
    }
  }

  async saveIdentificationResult(result) {
    try {
      const response = await apiClient.post('/identifications', result);
      return response.data;
    } catch (error) {
      // Don't throw error for saving results - it's not critical
      console.warn('Failed to save identification result:', error);
      return null;
    }
  }

  async getIdentificationHistory() {
    try {
      const response = await apiClient.get('/identifications/history');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch history');
    }
  }
}

export default new BirdService();