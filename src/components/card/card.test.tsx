import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import Card from "./card";
import {FILM} from "../../mock/data-mock";

Enzyme.configure({adapter: new Adapter()});

it(`Card correctly renders after relaunch`, () => {
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
      <BrowserRouter>
        <Card
          id={FILM.id}
          title={FILM.title}
          srcPreviewImage={FILM.srcPreviewImage}
          srcPreviewVideo={FILM.srcPreviewVideo}
          isActive={false}
          onMouseLeaveCard={handleClick}
          onMouseEnterCard={handleClick}
          onClickToRedirect={handleClick}
        />
      </BrowserRouter>
    )
  );
  expect(tree).toMatchSnapshot();
});
