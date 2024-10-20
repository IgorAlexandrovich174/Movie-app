import { useEffect, useState } from "react";
import { Alert, Tabs } from "antd";
import Search from "./component/Search/Search.jsx";
import { MovieApiContext } from "./context/MovieApiContext.jsx";
import MovieApi from "./api/movieApi.js";
import Rated from "./component/Rated/Rated.jsx";

export default function App() {
  const movieApi = new MovieApi();
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  async function createGuestSession() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${movieApi.apiConfig.accessToken}`,
      },
    };
    const result = await fetch(
      `${movieApi.apiConfig.url}/authentication/guest_session/new`,
      options,
    );
    const resultJSON = await result.json();
    try {
      if (!genres.length) {
        const genresList = await movieApi.getGenres();
        setGenres(genresList);
      }
      if (!localStorage.getItem("guestSession")) {
        localStorage.setItem("guestSession", resultJSON.guest_session_id);
      }
    } catch (err) {
      setError(err);
    }
    console.log(resultJSON.guest_session_id);
    return resultJSON.success;
  }

  useEffect(() => {
    createGuestSession();
  }, []);

  return (
    <>
      {error && (
        <Alert
          message={error.message}
          type="error"
          closable={true}
          onClick={() => {
            setError(null);
          }}
        />
      )}
      {!error && (
        <MovieApiContext.Provider value={{ genres, movieApi }}>
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                key: 1,
                label: "Search",
                children: <Search />,
              },
              {
                key: 2,
                label: "Rated",
                children: <Rated />,
              },
            ]}
          />
        </MovieApiContext.Provider>
      )}
    </>
  );
}
