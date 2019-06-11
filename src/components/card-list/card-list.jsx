import React, {Fragment} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {getFilms, getFavorites} from "../../store/data/selectors.js";

const CardList = ({
  numberFilm,
  onShowMoreClick,
  activeFilm,
  onMouseEnterCard,
  onMouseLeaveCard,
  onClickToRedirect,
  films,
  genreFilm
}) => {
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
              genre={genre}
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
            onClick={onShowMoreClick}
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

CardList.propTypes = {
  isFavorite: PropTypes.bool,
  genreFilm: PropTypes.string,
  filmId: PropTypes.number,
  numberFilm: PropTypes.number.isRequired,
  activeFilm: PropTypes.number.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onMouseEnterCard: PropTypes.func.isRequired,
  onMouseLeaveCard: PropTypes.func.isRequired,
  onClickToRedirect: PropTypes.func.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        srcPreviewImage: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        srcPreviewVideo: PropTypes.string.isRequired
      })
  )
};
const mapStateToProps = (state, ownProps) =>
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
