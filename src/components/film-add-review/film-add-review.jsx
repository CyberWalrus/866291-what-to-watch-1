import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors.js";
import HiddenIcon from "../hidden-icon/hidden-icon.jsx";
import Header from "../header/header.jsx";

const FilmAddReview = ({film}) => {
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

          <div className="add-review">
            <form action="#" className="add-review__form">
              <div className="rating">
                <div className="rating__stars">
                  <input
                    className="rating__input"
                    id="star-1"
                    type="radio"
                    name="rating"
                    value="1"
                  />
                  <label className="rating__label" htmlFor="star-1">
                    Rating 1
                  </label>

                  <input
                    className="rating__input"
                    id="star-2"
                    type="radio"
                    name="rating"
                    value="2"
                  />
                  <label className="rating__label" htmlFor="star-2">
                    Rating 2
                  </label>

                  <input
                    className="rating__input"
                    id="star-3"
                    type="radio"
                    name="rating"
                    value="3"
                  />
                  <label className="rating__label" htmlFor="star-3">
                    Rating 3
                  </label>

                  <input
                    className="rating__input"
                    id="star-4"
                    type="radio"
                    name="rating"
                    value="4"
                  />
                  <label className="rating__label" htmlFor="star-4">
                    Rating 4
                  </label>

                  <input
                    className="rating__input"
                    id="star-5"
                    type="radio"
                    name="rating"
                    value="5"
                  />
                  <label className="rating__label" htmlFor="star-5">
                    Rating 5
                  </label>
                </div>
              </div>

              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name="review-text"
                  id="review-text"
                  placeholder="Review text"
                />
                <div className="add-review__submit">
                  <button className="add-review__btn" type="submit">
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
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    srcPreviewImage: PropTypes.string.isRequired,
    srcPosterImage: PropTypes.string.isRequired,
    srcBgImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
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
