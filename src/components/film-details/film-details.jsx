import React, {Fragment} from "react";
import PropTypes from "prop-types";

const FilmDetails = ({runTime, genre, released, director, starrings}) => {
  return (
    <Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {starrings.map((item, index) => (
                <Fragment key={index}>
                  {item}
                  <br />
                </Fragment>
              ))}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">
              {runTime}
            </span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{released}</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

FilmDetails.propTypes = {
  runTime: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  starrings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
export default FilmDetails;
