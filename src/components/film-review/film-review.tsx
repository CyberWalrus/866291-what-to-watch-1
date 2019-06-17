import * as React from "react";
import {PureComponent, Fragment, ReactElement} from "react";
import {connect} from "react-redux";
import {getReviews} from "../../store/data/selectors";
import {Operation as OperationData} from "../../store/data/data";
import {Review} from "../../type/data";
import {StateApp, ThunkDispatch} from "../../type/reducer";

interface PropsInsert {
  filmId: number;
}
interface PropsState {
  reviews: Review[];
}
interface PropsDispatch {
  onLoadReviews: (filmId: number) => void;
}

type Props = PropsInsert & PropsState & PropsDispatch;

class FilmReview extends PureComponent<Props, null> {
  public componentWillMount(): void {
    this.props.onLoadReviews(this.props.filmId);
  }
  public render(): ReactElement {
    const colFirst: ReactElement[] = [];
    const colSecond: ReactElement[] = [];
    if (this.props.reviews) {
      this.props.reviews.map(
        ({comment, rating, userName, date, dateHTML}, index): void => {
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
          <div className="movie-card__reviews-col">
            {colFirst && colFirst.map((item): ReactElement => item)}
          </div>
          <div className="movie-card__reviews-col">
            {colSecond && colSecond.map((item): ReactElement => item)}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    reviews: getReviews(state)
  });

const mapDispatchToProps = (dispatch: ThunkDispatch): PropsDispatch => ({
  onLoadReviews: (filmId: number): void => {
    dispatch(OperationData.loadReviews(filmId));
  }
});
export {FilmReview};

export default connect<Props, PropsDispatch, {}, StateApp>(
  mapStateToProps,
  mapDispatchToProps
)(FilmReview);
