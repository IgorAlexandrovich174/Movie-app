import { Image, Flex, Typography, Rate } from "antd";
import { format, parseISO } from "date-fns";
import posterNotFound from "/Leonardo_Phoenix_A_vintageinspired_movie_poster_with_a_distres_1.jpg";
import { MovieApiContext } from "../../context/MovieApiContext.jsx";
import { useContext } from "react";
import PropTypes from "prop-types";

export default function MovieCard({ movie }) {
  const { genres } = useContext(MovieApiContext);
  const { movieApi } = useContext(MovieApiContext);

  async function addRate(value) {
    const guestSession = localStorage.getItem("guestSession");
    try {
      await movieApi.addRated(value, movie.id, guestSession);
    } catch (err) {
      console.log(err);
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Дата не указана";
    return format(parseISO(dateString), "MMMM d, yyyy");
  };

  const setRating = (value) => {
    switch (true) {
      case value < 3:
        return 1;
      case value < 5:
        return 2;
      case value < 7:
        return 3;
      default:
        return 4;
    }
  };

  function trimDescription(inputValue) {
    const max = 100;
    if (inputValue.length <= max) {
      return inputValue;
    }
    const splitWords = inputValue.split(" ");
    let result = "";
    for (const element of splitWords) {
      if ((result + element).length <= max) {
        result += element + " ";
      } else {
        break;
      }
    }
    return result.trim() + "...";
  }

  return (
    <>
      <Flex className="movie-card">
        <div className="image-wrapper" style={{ flexShrink: 0 }}>
          <Image
            width={180}
            height={280}
            src={
              movie.poster_path
                ? `${movieApi.apiConfig.pathImage}` + movie.poster_path
                : posterNotFound
            }
          />
        </div>
        <Flex wrap="wrap" gap="10px">
          <Flex
            style={{ padding: 15 }}
            gap={8}
            vertical
            justify={"space-between"}
          >
            <Flex justify={"space-between"}>
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                {movie.title}
              </Typography.Title>
              <div className={`rating rating-${setRating(movie.vote_average)}`}>
                {movie.vote_average.toFixed(1)}
              </div>
            </Flex>
            <Typography.Paragraph
              className="release-date"
              style={{ marginBottom: 0 }}
            >
              {formatDate(movie.release_date)}
            </Typography.Paragraph>
            <Flex wrap={"wrap"} gap={5}>
              {movie.genre_ids.map((item, i) => (
                <Typography.Text key={i} keyboard>
                  {genres[item]}
                </Typography.Text>
              ))}
            </Flex>
            <Typography.Paragraph>
              {trimDescription(movie.overview)}
            </Typography.Paragraph>
            <Rate
              count={10}
              styles={{ marginBottom: "auto" }}
              allowHalf={true}
              onChange={addRate}
              defaultValue={movie.rating}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};
