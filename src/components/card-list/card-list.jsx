import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.timeoutFunc = null;
    this.state = {
      playArr: []
    };

    this.onCardMouseOver = this.onCardMouseOver.bind(this);
    this.onCardMouseLeave = this.onCardMouseLeave.bind(this);
  }
  componentDidMount() {
    const playArr = [];
    if (this.props.films && this.props.films.length > 1) {
      this.props.films.forEach((element) => {
        playArr.push({id: element.id, isPlay: false});
      });
    }
    this.setState({
      playArr
    });
  }
  onCardMouseOver(id) {
    const timeoutMs = 1000;

    this.timeoutFunc = setTimeout(() => {
      const playArr = this.state.playArr.slice();
      const play = playArr.find((x) => x.id === id);
      play.isPlay = true;
      this.setState({
        playArr
      });
    }, timeoutMs);
  }
  onCardMouseLeave(id) {
    clearTimeout(this.timeoutFunc);
    const playArr = this.state.playArr.slice();
    const play = playArr.find((x) => x.id === id);
    play.isPlay = false;
    this.setState({
      playArr
    });
  }
  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.films && this.props.films.length > 0 ? (
          <>
            {this.props.films.map(({id, title, src, genre, preview}) => (
              <Card
                key={id}
                id={id}
                title={title}
                src={src}
                genre={genre}
                preview={preview}
                isPlay={
                  this.state.playArr.length > 0
                    ? this.state.playArr.find((x) => x.id === id).isPlay
                    : false
                }
                onMouseLeave={this.onCardMouseLeave}
                onMouseOver={this.onCardMouseOver}
              />
            ))}
          </>
        ) : null}
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
