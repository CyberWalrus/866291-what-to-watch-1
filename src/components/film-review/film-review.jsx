import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getReviews} from "../../store/data/selectors.js";
import {Operation as OperationData} from "../../store/data/data.js";

class FilmReview extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadReviews(this.props.filmId);
  }
  render() {
    return (
      <Fragment>
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {this.props.reviews &&
              this.props.reviews.map(
                  ({id, comment, rating, userName, date, dateHTML}) => (
                    <div className="review" key={id}>
                      <blockquote className="review__quote">
                        <p className="review__text">{comment}</p>

                        <footer className="review__details">
                          <cite className="review__author">{userName}</cite>
                          <time className="review__date" dateTime={dateHTML}>
                            {date}
                          </time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">{rating}</div>
                    </div>
                  )
              )}
          </div>
        </div>
      </Fragment>
    );
  }
}

FilmReview.propTypes = {
  filmId: PropTypes.number.isRequired,
  loadReviews: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        dateHTML: PropTypes.string.isRequired
      })
  )
};
const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    reviews: getReviews(state)
  });

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (filmId) => dispatch(OperationData.loadReviews(filmId))
});
export {FilmReview};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilmReview);
