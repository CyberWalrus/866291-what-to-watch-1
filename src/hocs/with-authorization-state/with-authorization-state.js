import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withAuthorizationState = (Component) => {
  class WithAuthorizationState extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        email: ``,
        password: ``
      };

      this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
      this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
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
      this.props.onSubmitClick(email, password);
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
        />
      );
    }
  }

  WithAuthorizationState.propTypes = {
    onSubmitClick: PropTypes.func.isRequired
  };

  return WithAuthorizationState;
};


export default withAuthorizationState;
