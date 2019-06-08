import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getError} from "../../store/user/selectors.js";
import {Operation} from "../../store/user/user.js";

const withAuthorizationState = (Component) => {
  class WithAuthorizationState extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        email: ``,
        password: ``
      };

      this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
      this.handlePasswordInputChange = this.handlePasswordInputChange.bind(
          this
      );
      this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    handleEmailInputChange(event) {
      this.setState({
        email: event.target.value
      });
    }

    handlePasswordInputChange(event) {
      this.setState({
        password: event.target.value
      });
    }

    onSubmitClick(event) {
      const {email, password} = this.state;
      event.preventDefault();
      this.props.signIn(email, password);
    }

    render() {
      return (
        <Component
          {...this.props}
          email={this.state.email}
          password={this.state.password}
          onEmailInputChange={this.handleEmailInputChange}
          onPasswordInputChange={this.handlePasswordInputChange}
          onSubmitClick={this.onSubmitClick}
          errorMessage={this.props.errorMessage}
        />
      );
    }
  }

  WithAuthorizationState.propTypes = {
    signIn: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
  };

  return WithAuthorizationState;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    errorMessage: getError(state)
  });

const mapDispatchToProps = (dispatch) => ({
  signIn: (email, password) => {
    dispatch(Operation.signIn(email, password));
  }
});

export {withAuthorizationState};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withAuthorizationState
);
