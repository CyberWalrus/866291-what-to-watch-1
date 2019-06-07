import React from "react";
import PropTypes from "prop-types";

const withReviewState = (Component) => {
  class WithReviewState extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        ratingSelected: `1`,
        text: ``
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
      event.preventDefault();
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
    id: PropTypes.number
  };
  return WithReviewState;
};

export default withReviewState;
