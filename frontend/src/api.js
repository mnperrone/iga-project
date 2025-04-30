import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
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