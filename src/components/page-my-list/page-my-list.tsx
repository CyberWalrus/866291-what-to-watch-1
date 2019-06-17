import * as React from "react";
import {Fragment, ReactElement, FunctionComponent} from "react";
import Footer from "../footer/footer";
import HiddenIcon from "../hidden-icon/hidden-icon";
import Header from "../header/header";
import CardList from "../card-list/card-list";
import withActiveFilm from "../../hocs/with-active-film/with-active-film";

const CardListActiveFilm = withActiveFilm(CardList);
const PageMyList: FunctionComponent = (): ReactElement => {
  return (
    <Fragment>
      <HiddenIcon />
      <div className="user-page">
        <Header title={`My list`} isUserClass={true} />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <CardListActiveFilm isFavorite={true}/>
        </section>
        <Footer />
      </div>
    </Fragment>
  );
};
export default PageMyList;
