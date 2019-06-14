import * as React from "react";
import {Fragment} from "react";
import {connect} from "react-redux";
import Card from "../card/card.jsx";
import {getFilms, getFavorites} from "../../store/data/selectors.js";
import {Film} from "../../type.js";

interface Props {
  filmId: number,
  films: Film[]
  numberFilm: number,
  activeFilm: number,
  genreFilm: string,
  isFavorite: boolean,
  onClickShowMore: () => void,
  onMouseEnterCard: (id:number) => void,
  onMouseLeaveCard: (id:number) => void,
  onClickToRedirect: (id:number) => void
}

const CardList = ({
  films,
  numberFilm,
  activeFilm,
  onClickShowMore,
  onMouseEnterCard,
  onMouseLeaveCard,
  onClickToRedirect,
  genreFilm
}: Props) => {
  const isShow = genreFilm ? false : true;
  return (
    <Fragment>
      <div className="catalog__movies-list">
        {films &&
          films.map(({id, title, srcPreviewImage, genre, srcPreviewVideo}) => (
            <Card
              key={id}
              id={id}
              title={title}
              srcPreviewImage={srcPreviewImage}
              srcPreviewVideo={srcPreviewVideo}
              isActive={activeFilm === id}
              onMouseEnterCard={() => onMouseEnterCard(id)}
              onMouseLeaveCard={() => onMouseLeaveCard(id)}
              onClickToRedirect={() => onClickToRedirect(id)}
            />
          ))}
      </div>
      {films && isShow && films.length >= numberFilm ? (
        <div className="catalog__more">
          <button
            className="catalog__button"
            type="button"
            onClick={onClickShowMore}
          >
            Show more
          </button>
        </div>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps: Props) =>
  Object.assign({}, ownProps, {
    films: ownProps.isFavorite
      ? getFavorites(state, ownProps.numberFilm)
      : getFilms(
          state,
          ownProps.numberFilm,
          ownProps.genreFilm,
          ownProps.filmId
      )
  });

export {CardList};

export default connect(mapStateToProps)(CardList);
