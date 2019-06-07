import React from "react";
import PropTypes from "prop-types";

const withReviewState = (Component) => {
  class WithReviewState extends React.PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Component
          id={this.props.id}
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
