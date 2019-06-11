import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getError} from "../../store/user/selectors.js";
import {Operation, ActionCreator} from "../../store/user/user.js";

const withAuthorizationState = (Component) => {
  class WithAuthorizationState extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        email: ``,
        password: ``,
        formErrors: {email: ``, password: ``, signIn: ``},
        emailValid: false,
        passwordValid: true,
        formValid: false
      };

      this.handleUserInput = this.handleUserInput.bind(this);
      this.handleSendSubmit = this.handleSendSubmit.bind(this);
      this._handleValidateField = this._handleValidateField.bind(this);
      this._handleValidateForm = this._handleValidateForm.bind(this);
    }
    componentDidUpdate() {
      if (this.props.errorMessage) {
        const fieldValidationErrors = this.state.formErrors;
        fieldValidationErrors.signIn = this.props.errorMessage;
        this.setState({
          fieldValidationErrors
        });
        this.props.onResetError();
      }
    }
    handleUserInput(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value}, () => {
        this._handleValidateField(name, value);
      });
    }
    handleSendSubmit(event) {
      const {email, password} = this.state;
      event.preventDefault();
      this.props.onSignIn(email, password);
    }
    _handleValidateField(fieldName, value) {
      const fieldValidationErrors = this.state.formErrors;
      let emailValid = this.state.emailValid;
      switch (fieldName) {
        case `email`:
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid
            ? ``
            : `Please enter a valid email address`;
          break;
        default:
          break;
      }
      this.setState(
          {
            formErrors: fieldValidationErrors,
            emailValid
          },
          this._handleValidateForm
      );
    }
    _handleValidateForm() {
      this.setState({
        formValid: this.state.emailValid && this.state.passwordValid
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          email={this.state.email}
          password={this.state.password}
          formErrors={this.state.formErrors}
          formValid={this.state.formValid}
          onChangeUserInput={this.handleUserInput}
          onClickSubmit={this.handleSendSubmit}
        />
      );
    }
  }

  WithAuthorizationState.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onSignIn: PropTypes.func.isRequired,
    onResetError: PropTypes.func.isRequired
  };

  return WithAuthorizationState;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    errorMessage: getError(state)
  });

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (email, password) => {
    dispatch(Operation.signIn(email, password));
  },
  onResetError: () => {
    dispatch(ActionCreator.resetError());
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
