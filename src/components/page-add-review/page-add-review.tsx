import * as React from "react";
import {Fragment} from "react";
import {connect} from "react-redux";
import {getFilm} from "../../store/data/selectors";
import HiddenIcon from "../hidden-icon/hidden-icon";
import Header from "../header/header";
import {DisabledStyle, TextLength, ratingRadioValues} from "../../constants";
import {Film} from "../../type/data";

interface Props {  
  id: number,
  ratingSelected: string,
  text: string,
  isActive: boolean,
  formValid: boolean,
  film: Film,
  onChageUserInput: () => void,
  onSubmitSend: () => void
}

const PageAddReview = ({
  film,
  text,
  ratingSelected,
  onChageUserInput,
  onSubmitSend,
  formValid,
  isActive
}: Props) => {
  if (film) {
    return (
      <Fragment>
        <HiddenIcon />
        <section
          className="movie-card movie-card--full"
          style={{backgroundColor: film.bgColor}}
        >
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={film.srcBgImage} alt={film.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header filmId={film.id} filmTitle={film.title} />

            <div className="movie-card__poster movie-card__poster--small">
              <img
                src={film.srcPosterImage}
                alt={`${film.title} poster`}
                width="218"
                height="327"
              />
            </div>
          </div>

          <div
            className="add-review"
            style={!isActive ? DisabledStyle : {}}
          >
            <form onSubmit={onSubmitSend} className="add-review__form">
              <div className="rating">
                <div className="rating__stars">
                  {ratingRadioValues &&
                    ratingRadioValues.map((item, index) => (
                      <Fragment key={index}>
                        <input
                          className="rating__input"
                          id={`star-${item}`}
                          type="radio"
                          name="ratingSelected"
                          value={item}
                          checked={ratingSelected === item}
                          onChange={onChageUserInput}
                        />
                        <label
                          className="rating__label"
                          htmlFor={`star-${item}`}
                        >
                          {`Rating ${item}`}
                        </label>
                      </Fragment>
                    ))}
                </div>
              </div>

              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name="text"
                  id="review-text"
                  placeholder="Review text"
                  maxLength={TextLength.MAX}
                  minLength={TextLength.MIN}
                  value={text}
                  onChange={onChageUserInput}
                />
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    disabled={!formValid}
                    style={!formValid ? DisabledStyle : {}}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </Fragment>
    );
  }
  return <div />;
};

const mapStateToProps = (state, ownProps: Props) =>
  Object.assign({}, ownProps, {
    film: getFilm(state, ownProps.id)
  });

export {PageAddReview};

export default connect(mapStateToProps)(PageAddReview);
