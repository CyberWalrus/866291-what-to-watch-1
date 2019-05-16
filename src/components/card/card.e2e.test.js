import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card";

Enzyme.configure({adapter: new Adapter()});
describe(`<Card />`, () => {
  const handleClick = jest.fn();
  it(`test opening film card`, () => {
    const app = shallow(
        <Card
          id={1}
          genre="comedy"
          title="What We Do in the Shadows"
          src="img/what-we-do-in-the-shadows.jpg"
          onClick={handleClick}
          onMouseEnter={handleClick}
        />
    );
    const card = app.find(`.small-movie-card`);
    const button = app.find(`.small-movie-card__play-btn`);

    card.simulate(`mouseenter`);
    expect(handleClick).toHaveBeenCalledWith(1);
    button.simulate(`click`);
    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
