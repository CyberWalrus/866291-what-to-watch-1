import React from "react";
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
  componentDidMount() {
  }
  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.films &&
          this.props.films.map(({id, title, srcPreviewImage, genre, preview}) => (
            <CardPlay
              key={id}
              id={id}
              title={title}
              srcPreviewImage={srcPreviewImage}
              genre={genre}
              preview={preview}
            />
          ))}
      </div>
    );
  }
}

CardList.propTypes = {
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
    films: getFilms(state)
  });

export {CardList};

export default connect(mapStateToProps)(CardList);
