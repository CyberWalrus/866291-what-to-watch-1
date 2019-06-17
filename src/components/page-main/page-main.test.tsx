import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import PageMain from "./page-main";
import reducer from "../../store";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
Enzyme.configure({adapter: new Adapter()});

it(`PageMain correctly renders after relaunch`, (): void => {
  const store = createStore(reducer);
  const tree = toJson(
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <PageMain />
        </BrowserRouter>
      </Provider>
    )
  );
  expect(tree).toMatchSnapshot();
});
