import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getError} from "../../store/data/selectors.js";
import {Operation} from "../../store/data/data.js";

const withReviewState = (Component) => {
  class WithReviewState extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        ratingSelected: `0`,
        text: ``,
        formErrors: {ratingSelected: ``, text: ``},
        ratingValid: false,
        textValid: false,
        formValid: false
      };
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleOptionChange = this.handleOptionChange.bind(this);
    }
    handleTextChange(event) {
      this.setState({
        text: event.target.value
      });
    }
    handleOptionChange(event) {
      this.setState({
        ratingSelected: event.target.value
      });
    }
    handleFormSubmit(event) {
      const rating = this.state.ratingSelected;
      const comment = this.state.text;
      const filmId = this.props.id;
      event.preventDefault();
      this.props.sendReview(rating, comment, filmId);
    }

    render() {
      return (
        <Component
          id={this.props.id}
          text={this.state.text}
          ratingSelected={this.state.ratingSelected}
          handleOptionChange={this.handleOptionChange}
          handleFormSubmit={this.handleFormSubmit}
          handleTextChange={this.handleTextChange}
        />
      );
    }
  }
  WithReviewState.propTypes = {
    id: PropTypes.number.isRequired,
    errorMessage: PropTypes.string.isRequired,
    sendReview: PropTypes.func.isRequired
  };
  return WithReviewState;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    errorMessage: getError(state)
  });
const mapDispatchToProps = (dispatch) => ({
  sendReview: (rating, comment, filmId) =>
    dispatch(Operation.sendReview(rating, comment, filmId))
});
export {withReviewState};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withReviewState
);
