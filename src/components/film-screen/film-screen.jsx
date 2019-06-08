import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors.js";
import Footer from "../footer/footer.jsx";
import HiddenIcon from "../hidden-icon/hidden-icon.jsx";
import Header from "../header/header.jsx";
import FilmOverview from "../film-overview/film-overview.jsx";
import FilmDetails from "../film-details/film-details.jsx";
import FilmReview from "../film-review/film-review.jsx";
import FilmNav from "../film-nav/film-nav.jsx";
import FilmButtonDiv from "../film-button-div/film-button-div.jsx";
import {FilmRoute} from "../../mock/constants.js";
import CardList from "../card-list/card-list.jsx";
import withActiveFilm from "../../hocs/with-active-film/with-active-film.js";

const CardListActiveFilm = withActiveFilm(CardList);

const FilmScreen = ({film, changeFilmRoute, route}) => {
  if (film) {
    const {
      title,
      genre,
      released,
      bgColor,
      srcBgImage,
      srcPosterImage,
      rating,
      scoresCount,
      ratingLevel,
      description,
      director,
      starrings,
      runTime,
      id,
      isFavorite
    } = film;
    return (
      <Fragment>
        <HiddenIcon />
        <section
          className="movie-card movie-card--full"
          style={{backgroundColor: bgColor}}
        >
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={srcBgImage} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{released}</span>
                </p>
                <FilmButtonDiv id={id} isFavorite={isFavorite}/>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  src={srcPosterImage}
                  alt={`${title} poster`}
                  width="218"
                  height="327"
                />
              </div>

              <div className="movie-card__desc">
                <FilmNav changeFilmRoute={changeFilmRoute} route={route} />
                {
                  {
                    [FilmRoute.OVERVIEW]: (
                      <FilmOverview
                        rating={rating}
                        ratingLevel={ratingLevel}
                        scoresCount={scoresCount}
                        description={description}
                        director={director}
                        starrings={starrings}
                      />
                    ),
                    [FilmRoute.DETAILS]: (
                      <FilmDetails
                        released={released}
                        runTime={runTime}
                        genre={genre}
                        director={director}
                        starrings={starrings}
                      />
                    ),
                    [FilmRoute.REVIEWS]: <FilmReview filmId={id} />
                  }[route]
                }
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <CardListActiveFilm genreFilm={genre} filmId={id} />
          </section>
          <Footer />
        </div>
      </Fragment>
    );
  }
  return <div />;
};
FilmScreen.propTypes = {
  id: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  changeFilmRoute: PropTypes.func.isRequired,
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
    isFavorite: PropTypes.bool.isRequired,
    starrings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired
  })
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    film: getFilm(state, ownProps.id)
  });

export {FilmScreen};

export default connect(mapStateToProps)(FilmScreen);
