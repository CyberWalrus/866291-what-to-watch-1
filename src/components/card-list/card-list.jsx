import React, {Fragment} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import withPlayCard from "../../hocs/with-play-card/with-play-card.js";
import {getFilms} from "../../store/data/selectors.js";

const CardPlay = withPlayCard(Card);

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <div className="catalog__movies-list">
          {this.props.films &&
            this.props.films.map(
                ({id, title, srcPreviewImage, genre, preview}) => (
                  <CardPlay
                    key={id}
                    id={id}
                    title={title}
                    srcPreviewImage={srcPreviewImage}
                    genre={genre}
                    preview={preview}
                  />
                )
            )}
        </div>
        {this.props.films && this.props.films.length >= this.props.numberFilm ? (
          <div className="catalog__more">
            <button
              className="catalog__button"
              type="button"
              onClick={this.props.onShowMoreClick}
            >
              Show more
            </button>
          </div>
        ) : (
          <Fragment />
        )}
      </Fragment>
    );
  }
}

CardList.propTypes = {
  numberFilm: PropTypes.number.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
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
