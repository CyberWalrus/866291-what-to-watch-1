import React, {Fragment} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {getFilms} from "../../store/data/selectors.js";

const CardList = ({
  numberFilm,
  onShowMoreClick,
  activeFilm,
  setActiveFilm,
  removeActiveFilm,
  onClickComponent,
  films
}) => {
  return (
    <Fragment>
      <div className="catalog__movies-list">
        {films &&
          films.map(({id, title, srcPreviewImage, genre, preview}) => (
            <Card
              key={id}
              id={id}
              title={title}
              srcPreviewImage={srcPreviewImage}
              genre={genre}
              preview={preview}
              isActive={activeFilm === id}
              onMouseEnterCard={() => setActiveFilm(id)}
              onMouseLeaveCard={() => removeActiveFilm(id)}
              onClickComponent={() => onClickComponent(id)}
            />
          ))}
      </div>
      {films && films.length >= numberFilm ? (
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
  numberFilm: PropTypes.number.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  activeFilm: PropTypes.number.isRequired,
  setActiveFilm: PropTypes.func,
  removeActiveFilm: PropTypes.func,
  onClickComponent: PropTypes.func,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        srcPreviewImage: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      })
  )
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    films: getFilms(state, ownProps.numberFilm)
  });

export {CardList};

export default connect(mapStateToProps)(CardList);
