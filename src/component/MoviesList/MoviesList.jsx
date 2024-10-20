import { List } from "antd";
import MovieCard from "../MovieCard/MovieCard.jsx";
import PropTypes from "prop-types";

export default function MoviesList({ movies, loading, movieApi }) {
  return (
    <List
      dataSource={movies}
      grid={{
        gutter: [32, 16],
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      loading={{ spinning: loading, fullscreen: loading }}
      renderItem={(movie) => (
        <>
          <List.Item key={movie.id}>
            <MovieCard movie={movie} movieApi={movieApi} />
          </List.Item>
        </>
      )}
    />
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  movieApi: PropTypes.object.isRequired,
};
