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
      });
      
      return response.data;
    } catch (error) {
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

  async searchBirds(query) {
    try {
      const response = await apiClient.get('/birds/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  }

  async saveIdentificationResult(result) {
    try {
      const response = await apiClient.post('/identifications', result);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to save result');
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