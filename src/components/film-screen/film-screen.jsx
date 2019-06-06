import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors.js";
import Footer from "../footer/footer.jsx";
import HiddenIcon from "../hidden-icon/hidden-icon.jsx";
import Header from "../header/header.jsx";
import FilmOverview from "../film-overview/film-overview.jsx";
import FilmDetails from "../film-details/film-details.jsx";
import FilmNav from "../film-nav/film-nav.jsx";
import FilmRoute from "../../mock/film-route.js";

class FilmScreen extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.film) {
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
        runTime
      } = this.props.film;
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

                  <div className="movie-card__buttons">
                    <button
                      className="btn btn--play movie-card__button"
                      type="button"
                    >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s" />
                      </svg>
                      <span>Play</span>
                    </button>
                    <button
                      className="btn btn--list movie-card__button"
                      type="button"
                    >
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add" />
                      </svg>
                      <span>My list</span>
                    </button>
                    <a
                      href="add-review.html"
                      className="btn movie-card__button"
                    >
                      Add review
                    </a>
                  </div>
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
                  <FilmNav changeFilmRoute={this.props.changeFilmRoute} route={this.props.route}/>
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
                      [FilmRoute.REVIEWS]: null
                    }[this.props.route]
                  }
                </div>
              </div>
            </div>
          </section>

          <div className="page-content">
            <Footer />
          </div>
        </Fragment>
      );
    }
    return <div />;
  }
}
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
    rating: PropTypes.number.isRequired,
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

export {FilmScreen};

export default connect(mapStateToProps)(FilmScreen);
