import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/api';
import css from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  if (cast.length === 0) {
    return <p>No cast information found.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map(actor => {
        const profile = actor.profile_path
          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
          : 'https://via.placeholder.com/200x300?text=No+Image';
        return (
          <li key={actor.cast_id} className={css.item}>
            <img src={profile} alt={actor.name} className={css.photo} />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieCast;
