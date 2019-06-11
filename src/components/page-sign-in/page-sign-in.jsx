import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {DisabledStyle} from "../../mock/constants.js";

const PageSignIn = (props) => {
  const {
    email,
    password,
    formErrors,
    formValid,
    onChangeUserInput,
    onClickSubmit
  } = props;

  return (
    <Fragment>
      <div className="user-page">
        <Header isUserClass={true} isShowIcon={false} title={`Sign In`} />

        <div className="sign-in user-page__content">
          <form onSubmit={onClickSubmit} className="sign-in__form">
            <div className="sign-in__message">
              {formErrors && Object.keys(formErrors).map((fieldName, i) => {
                if (formErrors[fieldName].length > 0) {
                  return <p key={i}>{formErrors[fieldName]}</p>;
                } else {
                  return ``;
                }
              })}
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
                  onChange={onChangeUserInput}
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
                  name="password"
                  id="user-password"
                  value={password}
                  onChange={onChangeUserInput}
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
              <button
                className="sign-in__btn sign-in__btn--disavled"
                type="submit"
                disabled={!formValid}
                style={!formValid ? DisabledStyle : {}}
              >
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

PageSignIn.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  formErrors: PropTypes.object.isRequired,
  formValid: PropTypes.bool.isRequired,
  onChangeUserInput: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired
};

export default PageSignIn;
