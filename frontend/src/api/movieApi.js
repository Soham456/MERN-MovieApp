import axios from 'axios';

const API_BASE_URL = 'https://mern-movieapp.up.railway.app/api';


const movieApi = {
  getAllMovies: async () => axios.get(`${API_BASE_URL}/movies`),
  searchMovies: async (query) => axios.get(`${API_BASE_URL}/movies/search?query=${query}`),
  sortedMovies: async (sortBy) => axios.get(`${API_BASE_URL}/movies/sorted?sortBy=${sortBy}`),
  addMovie: async (movieData, token) => axios.post(`${API_BASE_URL}/movies`, movieData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  editMovie: async (id,movieData, token) => axios.put(`${API_BASE_URL}/movies/`+id, movieData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  deleteMovie: async (id, token) => axios.delete(`${API_BASE_URL}/movies/`+id, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  loginUser: async (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials)
};

export default movieApi;