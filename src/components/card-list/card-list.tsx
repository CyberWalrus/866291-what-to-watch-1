import * as React from "react";
import {Fragment} from "react";
import {connect} from "react-redux";
import Card from "../card/card";
import {getFilms, getFavorites} from "../../store/data/selectors";
import {Film} from "../../type/data";
import {StateApp} from "../../type/reducer";

interface PropsInsert {
  filmId: number
  numberFilm: number,
  activeFilm: number,
  genreFilm: string,
  isFavorite: boolean,
  onClickShowMore: () => void,
  onMouseEnterCard: (id: number) => void,
  onMouseLeaveCard: (id: number) => void,
  onClickToRedirect: (id: number) => void
}
interface PropsState {
  films: Film[]
}

type Props = PropsInsert & PropsState;

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
          films.map(({id, title, srcPreviewImage, srcPreviewVideo}) => (
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

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
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
