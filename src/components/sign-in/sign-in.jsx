import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getUser} from "./../../reducer/user/selectors.js";
import {Operation} from "./../../reducer/user/user.js";

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: ``,
      password: ``
    };
    this.handleItemChange = this.handleItemChange.bind(this);
    this.sendUser = this.sendUser.bind(this);
  }
  sendUser(evt) {
    const {email, password} = this.state;

    evt.preventDefault();

    if (email && password) {
      this.props.signIn(email, password);
    }
  }
  handleItemChange(key, event) {
    this.setState({[key]: event.target.value});
  }
  render() {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form onSubmit={this.sendUser} action="#" className="sign-in__form">
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="email"
                  id="user-email"
                  value={this.state.email}
                  onChange={this.handleItemChange.bind(this, `email`)}
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-email"
                >
                  Email address
                </label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  value={this.state.password}
                  onChange={this.handleItemChange.bind(this, `password`)}
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-password"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    user: getUser(state)
  });

const mapDispachToProps = (dispatch) => ({
  signIn: (email, password) => {
    dispatch(Operation.signIn(email, password));
  }
});

export {SignIn};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(SignIn);
