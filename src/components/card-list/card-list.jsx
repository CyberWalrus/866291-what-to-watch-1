import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import withPlayCard from "../../hocs/with-play-card/with-play-card.js";

const CardPlay = withPlayCard(Card);

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  onCardMouseEnter() {}
  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.films &&
          this.props.films.map(({id, title, src, genre, preview}) => (
            <CardPlay
              key={id}
              id={id}
              title={title}
              src={src}
              genre={genre}
              preview={preview}
              onMouseEnter={this.onCardMouseEnter}
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
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      })
  )
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    films: state.DATA.films
  });

export {CardList};

export default connect(mapStateToProps)(CardList);
