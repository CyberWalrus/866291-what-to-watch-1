import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import PageMyList from "./page-my-list";
import reducer from "../../store";
Enzyme.configure({adapter: new Adapter()});

it(`PageMyList correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const tree = toJson(
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <PageMyList />
        </BrowserRouter>
      </Provider>
    )
  );
  expect(tree).toMatchSnapshot();
});
