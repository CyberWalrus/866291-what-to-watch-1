import React, {PureComponent, Fragment} from "react";
import CardList from "../card-list/card-list.jsx";
import Filter from "../filter/filter.jsx";
import PropTypes from "prop-types";
import Footer from "../footer/footer.jsx";
import HiddenIcon from "../hidden-icon/hidden-icon.jsx";
import HeaderMainFilm from "../header-main-film/header-main-film.jsx";
import withShowMore from "../../hocs/with-show-more/with-show-more.js";

const CardListShowMore = withShowMore(CardList);

export default class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <HiddenIcon />
        <HeaderMainFilm />
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <Filter />
            <CardListShowMore />
          </section>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired
};
