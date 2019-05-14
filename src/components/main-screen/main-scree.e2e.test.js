import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainScreen from "./main-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`<MainScreen />`, () => {
  const handleClick = jest.fn();

  it(`test click on button`, () => {
    const app = shallow(
        <MainScreen
          films={[
            `1`,
            `Bohemian Rhapsody`,
            `Macbeth`,
            `We need to talk about Kevin`
          ]}
          onPlayButtonClick={handleClick}
        />
    );
    const playButton = app.find(`.small-movie-card__play-btn`).first();
    playButton.simulate(`click`);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
