import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";
import {FILM} from "../../mock/mock-test.js";

Enzyme.configure({adapter: new Adapter()});
describe(`<Card />`, () => {
  const handleClick = jest.fn();
  it(`test opening film card`, () => {
    const app = shallow(
        <Card
          id={FILM.id}
          title={FILM.title}
          srcPreviewImage={FILM.srcPreviewImage}
          genre={FILM.genre}
          preview={FILM.preview}
          isPlay={false}
          onCardMouseOver={handleClick}
          onCardMouseLeave={handleClick}
          onClickComponent={handleClick}
        />
    );
    const card = app.find(`.small-movie-card`);

    card.simulate(`click`);
    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
