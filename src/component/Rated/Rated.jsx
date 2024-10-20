import MovieCard from "../MovieCard/MovieCard.jsx";
import { List } from "antd";
import { useContext, useEffect, useState } from "react";
import { MovieApiContext } from "../../context/MovieApiContext.jsx";

export default function Rated() {
  const { movieApi } = useContext(MovieApiContext);
  const [ratedMovies, setRatedMovies] = useState([]);

  async function getRatedMovies() {
    const guestSessionId = localStorage.getItem("guestSession");
    const ratedMovies = await movieApi.getRatedList(guestSessionId);
    setRatedMovies(ratedMovies.results);
  }
  useEffect(() => {
    getRatedMovies();
  }, []);
  return (
    <List
      grid={{
        gutter: [32, 16],
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      dataSource={ratedMovies}
      renderItem={(item) => (
        <List.Item>
          <MovieCard movie={item} />
        </List.Item>
      )}
    />
  );
}
