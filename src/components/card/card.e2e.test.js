import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";

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
          preview="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
          isPlay={false}
          onMouseEnter={handleClick}
        />
    );
    const card = app.find(`.small-movie-card`);

    card.simulate(`mouseenter`);
    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
