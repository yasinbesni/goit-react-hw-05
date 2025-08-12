import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}  
          >
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
