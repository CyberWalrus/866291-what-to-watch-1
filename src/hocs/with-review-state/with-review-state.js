import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getReviewMessage} from "../../store/data/selectors.js";
import {Operation, ActionCreator} from "../../store/data/data.js";
import {REVIEW_MESSAGE, TextLength, RatingValue} from "../../constants.js";
import {Redirect} from "react-router-dom";
import {routeToFilm} from "../../routes.js";

const withReviewState = (Component) => {
  class WithReviewState extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        ratingSelected: `0`,
        text: ``,
        ratingValid: false,
        textValid: false,
        formValid: false,
        isActive: true,
        redirect: false
      };
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleUserInput = this.handleUserInput.bind(this);
      this._handleValidateField = this._handleValidateField.bind(this);
      this._handleValidateForm = this._handleValidateForm.bind(this);
    }
    componentDidUpdate() {
      if (this.props.reviewMessage) {
        if (this.props.reviewMessage === REVIEW_MESSAGE) {
          this.setState({
            redirect: true
          });
        } else {
          this.setState({
            isActive: true
          });
        }
        this.props.onResetReviewMessage();
      }
      if (this.state.redirect) {
        this.setState({
          redirect: 0
        });
      }
    }
    handleUserInput(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value}, () => {
        this._handleValidateField(name, value);
      });
    }
    handleFormSubmit(event) {
      const rating = this.state.ratingSelected;
      const comment = this.state.text;
      const filmId = this.props.id;
      event.preventDefault();
      this.setState({
        isActive: false
      });
      this.props.onSendReview(rating, comment, filmId);
    }
    _handleValidateField(fieldName, value) {
      let textValid = this.state.textValid;
      let ratingValid = this.state.ratingValid;
      switch (fieldName) {
        case `text`:
          textValid = value.length >= TextLength.MIN && value.length <= TextLength.MAX;
          break;
        case `ratingSelected`:
          ratingValid = parseInt(value, 10) >= RatingValue.MIN && parseInt(value, 10) <= RatingValue.MAX;
          break;
        default:
          break;
      }
      this.setState(
          {
            textValid,
            ratingValid
          },
          this._handleValidateForm
      );
    }
    _handleValidateForm() {
      this.setState({
        formValid: this.state.textValid && this.state.ratingValid
      });
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={routeToFilm(this.props.id)} />;
      }
      return (
        <Component
          id={this.props.id}
          text={this.state.text}
          isActive={this.state.isActive}
          ratingSelected={this.state.ratingSelected}
          formValid={this.state.formValid}
          onChageUserInput={this.handleUserInput}
          onSubmitSend={this.handleFormSubmit}
        />
      );
    }
  }
  WithReviewState.propTypes = {
    id: PropTypes.number.isRequired,
    reviewMessage: PropTypes.string.isRequired,
    onSendReview: PropTypes.func.isRequired,
    onResetReviewMessage: PropTypes.func.isRequired
  };
  return WithReviewState;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    reviewMessage: getReviewMessage(state)
  });
const mapDispatchToProps = (dispatch) => ({
  onSendReview: (rating, comment, filmId) =>
    dispatch(Operation.sendReview(rating, comment, filmId)),
  onResetReviewMessage: () => dispatch(ActionCreator.resetReviewMessage())
});
export {withReviewState};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withReviewState
);
