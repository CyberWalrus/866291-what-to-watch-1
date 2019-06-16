import * as React from "react";
import {PureComponent, Fragment} from "react";
import {connect} from "react-redux";
import {getReviews} from "../../store/data/selectors";
import {Operation as OperationData} from "../../store/data/data";
import {Review} from "../../type/data";

interface Props {
  filmId: number;
  onLoadReviews: (filmId: number) => void;
  reviews: Review[];
}

class FilmReview extends PureComponent<Props, null> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onLoadReviews(this.props.filmId);
  }
  render() {
    const colFirst = [];
    const colSecond = [];
    if (this.props.reviews) {
      this.props.reviews.map(
        ({comment, rating, userName, date, dateHTML}, index) => {
          if (index % 2) {
            colSecond.push(
              <div className="review" key={index}>
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
            );
          } else {
            colFirst.push(
              <div className="review" key={index}>
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
            );
          }
        }
      );
    }
    return (
      <Fragment>
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">{colFirst && colFirst.map((item, index) => item)}</div>
          <div className="movie-card__reviews-col">{colSecond && colSecond.map((item, index) => item)}</div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    reviews: getReviews(state)
  });

const mapDispatchToProps = (dispatch) => ({
  onLoadReviews: (filmId) => dispatch(OperationData.loadReviews(filmId))
});
export {FilmReview};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmReview);
