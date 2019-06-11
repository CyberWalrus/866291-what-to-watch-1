import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors.js";
import {MAIN_FILM_ID} from "../../mock/constants.js";
import FilmButtonDiv from "../film-button-div/film-button-div.jsx";

const HeaderMainFilm = ({film}) => {
  if (film) {
    return (
      <Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={film.srcBgImage} alt={film.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img
                  src={film.srcPosterImage}
                  alt={`${film.title} poster`}
                  width="218"
                  height="327"
                />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{film.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{film.genre}</span>
                  <span className="movie-card__year">{film.released}</span>
                </p>

                <FilmButtonDiv
                  id={film.id}
                  isFavorite={film.isFavorite}
                />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
  return <Header />;
};
HeaderMainFilm.propTypes = {
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
    runTime: PropTypes.string.isRequired
  })
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    film: getFilm(state, MAIN_FILM_ID)
  });

export {HeaderMainFilm};

export default connect(mapStateToProps)(HeaderMainFilm);
