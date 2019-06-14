import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/filter/filter";
import {getGeners} from "../../store/data/selectors";
import {getGenreSelected} from "../../store/filter/selectors";

interface Props {
  genreSelected: string,
  genres: string[],
  onChangeFilter: (value: string) => void
}

const Filter = ({genres, genreSelected, onChangeFilter}: Props) => {
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
              onClick={() => onChangeFilter(item)}
            >
              {item}
            </a>
          </li>
        ))}
    </ul>
  );
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    genres: getGeners(state),
    genreSelected: getGenreSelected(state)
  });
const mapDispatchToProps = (dispatch) => ({
  onChangeFilter: (value) => dispatch(ActionCreator.changeGenre(value))
});

export {Filter};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);
