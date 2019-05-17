import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  onCardMouseEnter() {}
  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.films &&
          this.props.films.map(({id, title, src, genre, preview}) => (
            <Card
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
        genre: PropTypes.oneOf([`comedy`, `drama`]).isRequired,
        preview: PropTypes.string.isRequired
      })
  )
};
