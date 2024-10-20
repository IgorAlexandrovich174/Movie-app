import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesList from "../MoviesList/MoviesList.jsx";
import { Alert, Flex, Pagination } from "antd";
import { useEffect, useState } from "react";
import MovieApi from "../../api/movieApi.js";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("return");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [error, setError] = useState(null);
  const movieApi = new MovieApi();

  async function getMovies() {
    setLoading(true);
    try {
      const result = await movieApi.getMoviesList(inputValue, currentPage);
      setMovies(result.results);
      setTotal(result.total_results);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [inputValue, currentPage]);

  return (
    <>
      {error && (
        <Alert
          message={error.message}
          type="error"
          closable={true}
          onClick={() => {
            setError(null);
            getMovies();
          }}
        />
      )}
      <Flex className="main-app">
        <div className="list-movies">
          <SearchForm
            onSubmitForm={setInputValue}
            setCurrentPage={setCurrentPage}
          />
          <MoviesList movies={movies} loading={loading} movieApi={movieApi} />
          <Pagination
            align="center"
            current={currentPage}
            total={total}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </Flex>
    </>
  );
}
