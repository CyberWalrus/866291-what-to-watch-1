import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/filter/filter.js";
import {getGeners} from "../../store/data/selectors.js";
import {getGenreSelected} from "../../store/filter/selectors.js";
import PropTypes from "prop-types";

const Filter = ({genres, genreSelected, changeFilter}) => {
  return (
    <ul className="catalog__genres-list">
      {genres &&
        genres.map((item, i) => (
          <li
            key={i}
            className={
              genreSelected === item
                ? `catalog__genres-item catalog__genres-item--active`
                : `catalog__genres-item`
            }
          >
            <a
              className="catalog__genres-link"
              onClick={() => changeFilter(item)}
            >
              {item}
            </a>
          </li>
        ))}
    </ul>
  );
};

Filter.propTypes = {
  genreSelected: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  changeFilter: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    genres: getGeners(state),
    genreSelected: getGenreSelected(state)
  });
const mapDispatchToProps = (dispatch) => ({
  changeFilter: (value) => dispatch(ActionCreator.changeGenre(value))
});

export {Filter};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);
