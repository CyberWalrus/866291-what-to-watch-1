import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUser} from "../../store/user/selectors.js";
import {Operation} from "../../store/user/user.js";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";

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
        <Header isSignin={true}/>

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

        <Footer />
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
