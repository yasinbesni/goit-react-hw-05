import { useState, useEffect } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import css from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { title, poster_path, overview, genres, release_date } = movie;

  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className={css.container}>
      <Link to={backLinkHref} className={css.goBack}>
        Go back
      </Link>

      {loading && <p>Loading movie details...</p>}
      {error && <p>Something went wrong: {error}</p>}

      <div className={css.movieDetails}>
        <img src={poster} alt={title} />
        <div className={css.info}>
          <h2>{title} ({release_date?.slice(0, 4)})</h2>
          <p><b>Overview:</b> {overview}</p>
          {genres && (
            <p>
              <b>Genres:</b> {genres.map(genre => genre.name).join(', ')}
            </p>
          )}
        </div>
      </div>

      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLinkHref }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkHref }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
