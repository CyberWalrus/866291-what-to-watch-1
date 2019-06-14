import * as React from "react";
import {Fragment} from "react";
import CardList from "../card-list/card-list";
import Filter from "../filter/filter";
import Footer from "../footer/footer";
import HiddenIcon from "../hidden-icon/hidden-icon";
import HeaderMainFilm from "../header-main-film/header-main-film";
import withActiveFilm from "../../hocs/with-active-film/with-active-film";
import VideScreen from "../video-screen/video-screen";
import withVideoScreenState from "../../hocs/with-video-screen-state/with-video-screen-state";

const CardListActiveFilm = withActiveFilm(CardList);
const VideScreenState = withVideoScreenState(VideScreen);

const PageMain = () => {
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
export default PageMain;
