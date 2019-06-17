import * as React from "react";
import {Fragment, ReactElement, FunctionComponent} from "react";
import Header from "../header/header";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors";
import {MAIN_FILM_ID} from "../../constants";
import FilmButtonDiv from "../film-button-div/film-button-div";
import {Film} from "../../type/data";
import {StateApp} from "../../type/reducer";

interface Props {
  film: Film;
}

const HeaderMainFilm: FunctionComponent<Props> = ({
  film
}: Props): ReactElement => {
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

                <FilmButtonDiv id={film.id} isFavorite={film.isFavorite} />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
  return <Header />;
};
const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    film: getFilm(state, MAIN_FILM_ID)
  });

export {HeaderMainFilm};

export default connect(mapStateToProps)(HeaderMainFilm);
