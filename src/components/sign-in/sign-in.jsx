import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

const SignInPage = (props) => {
  const {
    email,
    password,
    onEmailInputChange,
    onPasswordInputChange,
    onSubmitClick,
    errorMessage
  } = props;

  return (
    <Fragment>
      <div className="user-page">
        <Header isSignin={true} />

        <div className="sign-in user-page__content">
          <form onSubmit={onSubmitClick} className="sign-in__form">
            <div className="sign-in__message">
              <p>{errorMessage}</p>
            </div>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="email"
                  id="user-email"
                  value={email}
                  onChange={onEmailInputChange}
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
                  value={password}
                  onChange={onPasswordInputChange}
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
    </Fragment>
  );
};

SignInPage.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onEmailInputChange: PropTypes.func.isRequired,
  onPasswordInputChange: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired
};

export default SignInPage;
