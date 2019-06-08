import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import Footer from "./footer.jsx";
import {FILM} from "../../mock/mock-test.js";

it(`Footer correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = renderer
    .create(
        <BrowserRouter>
          <Footer
            id={FILM.id}
            isFavorite={false}
            sendFavorite={handleClick}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
