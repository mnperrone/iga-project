import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para CORS
});

export const getCourses = async () => {
  try {
    const response = await apiClient.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};