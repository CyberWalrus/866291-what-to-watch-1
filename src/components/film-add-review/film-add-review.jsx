import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors.js";
import HiddenIcon from "../hidden-icon/hidden-icon.jsx";
import Header from "../header/header.jsx";
import {DisabledStyle} from "../../mock/constants.js";

const ratinRadioValues = [`1`, `2`, `3`, `4`, `5`];
const FilmAddReview = ({
  film,
  text,
  ratingSelected,
  handleFormSubmit,
  handleUserInput,
  formValid,
  isActive
}) => {
  if (film) {
    return (
      <Fragment>
        <HiddenIcon />
        <section
          className="movie-card movie-card--full"
          style={{backgroundColor: film.bgColor}}
        >
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={film.srcBgImage} alt={film.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header filmId={film.id} filmTitle={film.title} />

            <div className="movie-card__poster movie-card__poster--small">
              <img
                src={film.srcPosterImage}
                alt={`${film.title} poster`}
                width="218"
                height="327"
              />
            </div>
          </div>

          <div
            className="add-review"
            disabled={!isActive}
            style={!isActive ? DisabledStyle : {}}
          >
            <form onSubmit={handleFormSubmit} className="add-review__form">
              <div className="rating">
                <div className="rating__stars">
                  {ratinRadioValues &&
                    ratinRadioValues.map((item, index) => (
                      <Fragment key={index}>
                        <input
                          className="rating__input"
                          id={`star-${item}`}
                          type="radio"
                          name="ratingSelected"
                          value={item}
                          checked={ratingSelected === item}
                          onChange={handleUserInput}
                        />
                        <label
                          className="rating__label"
                          htmlFor={`star-${item}`}
                        >
                          {`Rating ${item}`}
                        </label>
                      </Fragment>
                    ))}
                </div>
              </div>

              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name="text"
                  id="review-text"
                  placeholder="Review text"
                  maxLength="300"
                  minLength="50"
                  value={text}
                  onChange={handleUserInput}
                />
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    disabled={!formValid}
                    style={!formValid ? DisabledStyle : {}}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </Fragment>
    );
  }
  return <div />;
};

FilmAddReview.propTypes = {
  id: PropTypes.number.isRequired,
  ratingSelected: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  formValid: PropTypes.bool.isRequired,
  handleUserInput: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    srcPreviewImage: PropTypes.string.isRequired,
    srcPosterImage: PropTypes.string.isRequired,
    srcBgImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    srcVideo: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    scoresCount: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starrings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired
  })
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    film: getFilm(state, ownProps.id)
  });

export {FilmAddReview};

export default connect(mapStateToProps)(FilmAddReview);
