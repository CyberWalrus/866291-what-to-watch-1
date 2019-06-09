import React, {Fragment} from "react";
import CardList from "../card-list/card-list.jsx";
import Filter from "../filter/filter.jsx";
import Footer from "../footer/footer.jsx";
import HiddenIcon from "../hidden-icon/hidden-icon.jsx";
import HeaderMainFilm from "../header-main-film/header-main-film.jsx";
import withActiveFilm from "../../hocs/with-active-film/with-active-film.js";
import VideScreen from "../video-screen/video-screen.jsx";
import withVideoScreenState from "../../hocs/with-video-screen-state/with-video-screen-state.js";

const CardListActiveFilm = withActiveFilm(CardList);
const VideScreenState = withVideoScreenState(VideScreen);

const MainScreen = () => {
  return (
    <Fragment>
      <HiddenIcon />
      <VideScreenState />
      <HeaderMainFilm />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Filter />
          <CardListActiveFilm />
        </section>
        <Footer />
      </div>
    </Fragment>
  );
};
export default MainScreen;
