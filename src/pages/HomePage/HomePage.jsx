import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending today</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
