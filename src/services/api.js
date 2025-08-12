import axios from 'axios';

const token = import.meta.env.VITE_TMDB_TOKEN;
if (!token) {
  console.error("❌ TMDB API token not found! Check your .env settings.");
}

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function getTrendingMovies() {
  const response = await axios.get('/trending/movie/day');
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await axios.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
}

export async function getMovieDetails(movieId) {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      language: 'en-US',
    },
  });
  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      language: 'en-US',
    },
  });
  return response.data.cast; 
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
}
