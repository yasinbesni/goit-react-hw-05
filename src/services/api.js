import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDQ5MGM3YmJkOTdlZDIwYjFkMjI5ZjZlMjIzMGRiMCIsIm5iZiI6MTc0NjI5MTAxMS42NTUsInN1YiI6IjY4MTY0OTQzNTQ2NTE5OTc4M2Y5NDgyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EV0ufK7ofjGsd0PWua-xu18dKU8L7cDnjgnG22FiSoo'; 


axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

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
