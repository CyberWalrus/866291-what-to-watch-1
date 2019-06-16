import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import {FilmButtonDiv} from "./film-button-div";
import {FILM} from "../../mock/mock-test";

Enzyme.configure({adapter: new Adapter()});
it(`FilmButtonDiv correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
      <BrowserRouter>
        <FilmButtonDiv
          id={FILM.id}
          isFavorite={false}
          onSendFavorite={handleClick}
          isAuthorizationRequired={false}
          onVideoScreenOpen={handleClick}
        />
      </BrowserRouter>
    )
  );
  expect(tree).toMatchSnapshot();
});
