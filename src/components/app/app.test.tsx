import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {App} from "./app";
import reducer from "../../store";
import {createStore} from "redux";
import {Provider} from "react-redux";

Enzyme.configure({adapter: new Adapter()});

it(`App correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
      <Provider store={store}>
        <App isActive={true} loadFilms={handleClick} />
      </Provider>
    )
  );
  expect(tree).toMatchSnapshot();
});
