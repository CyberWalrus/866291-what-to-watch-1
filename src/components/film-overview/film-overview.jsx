import React, {Fragment} from "react";
import PropTypes from "prop-types";

const FilmOverview = ({
  rating,
  ratingLevel,
  scoresCount,
  description,
  director,
  starrings
}) => {
  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">
          {parseFloat(Math.round(rating * 100) / 100)
            .toFixed(1)
            .toString()
            .replace(`.`, `,`)}
        </div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingLevel}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="movie-card__starring">
          <strong>
            Starring:
            {starrings.map((item, index) => (
              <Fragment key={index}>{index === 0 ? `` : `,`} {item}</Fragment>
            ))}
          </strong>
        </p>
      </div>
    </Fragment>
  );
};
FilmOverview.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingLevel: PropTypes.string.isRequired,
  scoresCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starrings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
export default FilmOverview;
