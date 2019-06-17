import * as React from "react";
import {ReactElement, FunctionComponent} from "react";
import {Link} from "react-router-dom";
import RoutePath from "../../routes";

const Footer: FunctionComponent = (): ReactElement => {
  return (
    <footer className="page-footer">
      <div className="logo">
        <Link to={RoutePath.INDEX} className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
