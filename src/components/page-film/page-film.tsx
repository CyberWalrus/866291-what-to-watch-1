import * as React from "react";
import {Fragment} from "react";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors";
import Footer from "../footer/footer";
import HiddenIcon from "../hidden-icon/hidden-icon";
import Header from "../header/header";
import FilmOverview from "../film-overview/film-overview";
import FilmDetails from "../film-details/film-details";
import FilmReview from "../film-review/film-review";
import FilmNav from "../film-nav/film-nav";
import FilmButtonDiv from "../film-button-div/film-button-div";
import {FilmRoute} from "../../constants";
import CardList from "../card-list/card-list";
import VideScreen from "../video-screen/video-screen";
import withActiveFilm from "../../hocs/with-active-film/with-active-film";
import withVideoScreenState from "../../hocs/with-video-screen-state/with-video-screen-state";
import {Film} from "../../type/data";
import {StateApp} from "../../type/reducer";

const CardListActiveFilm = withActiveFilm(CardList);
const VideScreenState = withVideoScreenState(VideScreen);

interface PropsInsert {
  id: number,
  route: string,
  onChangeFilmRoute: () => void,
}
interface PropsState {
  film: Film;
}
type Props = PropsInsert & PropsState;


const PageFilm = ({film, onChangeFilmRoute, route}: Props) => {
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
        <VideScreenState />
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
                <FilmButtonDiv
                  id={id}
                  isFavorite={isFavorite}
                  isShowReview={true}
                />
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
                <FilmNav onChangeFilmRoute={onChangeFilmRoute} route={route} />
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

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    film: getFilm(state, ownProps.id)
  });

export {PageFilm};

export default connect(mapStateToProps)(PageFilm);
