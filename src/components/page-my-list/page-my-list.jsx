import React, {Fragment} from "react";
import Footer from "../footer/footer.jsx";
import HiddenIcon from "../hidden-icon/hidden-icon.jsx";
import Header from "../header/header.jsx";
import CardList from "../card-list/card-list.jsx";
import withActiveFilm from "../../hocs/with-active-film/with-active-film.js";

const CardListActiveFilm = withActiveFilm(CardList);
const PageMyList = () => {
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
