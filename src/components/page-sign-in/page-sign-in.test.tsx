import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import PageSignIn from "./page-sign-in";
import reducer from "../../store";
Enzyme.configure({adapter: new Adapter()});

it(`PageSignIn correctly renders after relaunch`, (): void => {
  const store = createStore(reducer);
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <PageSignIn
            email={``}
            password={``}
            onChangeUserInput={handleClick}
            onClickSubmit={handleClick}
            formErrors={{}}
            formValid={false}
          />
        </BrowserRouter>
      </Provider>
    )
  );
  expect(tree).toMatchSnapshot();
});
