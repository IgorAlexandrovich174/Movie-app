export default class MovieApi {
  apiConfig = {
    accessToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2NlODBiZGNhN2ZjYTU5OGI4NWZkNDI5ZjU1ZTQ3YSIsIm5iZiI6MTcyODEzMjE5NS44NzgzMTIsInN1YiI6IjY3MDBkMTAwYzlhMTBkNDZlYTdjZmJjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqJ8y5oLeU6mL21T-POtRd7YZ89JYPR18SWhFWddrIA",
    url: "https://api.themoviedb.org/3",
    pathImage: "https://image.tmdb.org/t/p/original/",
  };
  async getMoviesList(inputValue = "return", currentPage = 1) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${this.apiConfig.accessToken}`,
      },
    };
    const response = await fetch(
      `${this.apiConfig.url}/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=${currentPage}`,
      options,
    );
    if (!response.ok) {
      throw new Error(`Ошибка!, ${response.status}`);
    }

    const resultJSON = await response.json();
    console.log(resultJSON);
    return resultJSON;
  }

  async getGenres() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.apiConfig.accessToken}`,
      },
    };
    const result = await fetch(
      `${this.apiConfig.url}/genre/movie/list?language=en`,
      options,
    );
    const genresJSON = await result.json();
    const genresIds = {};
    for (const key of genresJSON.genres) {
      genresIds[key.id] = key.name;
    }
    return genresIds;
  }

  async addRated(rateValue, movie_id, sessionId) {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${this.apiConfig.accessToken}`,
      },
      body: JSON.stringify({ value: rateValue }),
    };
    const result = await fetch(
      `${this.apiConfig.url}/movie/${movie_id}/rating?guest_session_id=${sessionId}
`,
      options,
    );
    const resultJSON = await result.json();
    return resultJSON.success;
  }

  async getRatedList(sessionId) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.apiConfig.accessToken}`,
      },
    };
    const result = await fetch(
      `${this.apiConfig.url}/guest_session/${sessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options,
    );
    const resultJSON = result.json();
    console.log(resultJSON);
    return resultJSON;
  }
}
