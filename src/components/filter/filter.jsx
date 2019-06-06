import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/filter/filter.js";
import PropTypes from "prop-types";
const filterValueArr = [
  {
    name: `All geners`,
    genre: `all`
  },
  {
    name: `Comedies`,
    genre: `comedy`
  },
  {
    name: `Crime`,
    genre: `crime`
  },
  {
    name: `Documentary`,
    genre: `documentary`
  },
  {
    name: `Dramas`,
    genre: `drama`
  },
  {
    name: `Horror`,
    genre: `horror`
  },
  {
    name: `Kids & Family`,
    genre: `family`
  },
  {
    name: `Romance`,
    genre: `romance`
  },
  {
    name: `Sci-Fi`,
    genre: `sci-fi`
  },
  {
    name: `Thrillers`,
    genre: `thriller`
  }
];
class Filter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className="catalog__genres-list">
        {filterValueArr.map(({name, genre}, i) => (
          <li
            key={i}
            className={
              this.props.genreFilter === genre
                ? `catalog__genres-item catalog__genres-item--active`
                : `catalog__genres-item`
            }
          >
            <a href="#" className="catalog__genres-link" onClick={() => this.props.changeFilter(genre)}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

Filter.propTypes = {
  genreFilter: PropTypes.oneOf([
    `all`,
    `comedy`,
    `crime`,
    `documentary`,
    `drama`,
    `horror`,
    `family`,
    `romance`,
    `sci-fi`,
    `thriller`
  ]).isRequired,
  changeFilter: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    genreFilter: state.FILTER.genreFilter
  });
const mapDispatchToProps = (dispatch) => ({
  changeFilter: (value) => dispatch(ActionCreator.changeGenre(value))
});

export {Filter};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
