import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
  }
  setFilm() {}
  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.films !== undefined && this.props.films.length > 0 ? (
          <>
            {this.props.films.map(({id, title, src, genre}) => (
              <Card
                key={id}
                id={id}
                title={title}
                src={src}
                genre={genre}
                onClick={this.setFilm}
                onMouseEnter={this.setFilm}
              />
            ))}
          </>
        ) : (
          <> </>
        )}
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
        genre: PropTypes.string.isRequired
      })
  )
};
