import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PageAddReview} from "./page-add-review";
import {FILM} from "../../mock/data-mock";
import reducer from "../../store";
Enzyme.configure({adapter: new Adapter()});

it(`PageAddReview correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const handleClick = jest.fn();
  const tree = toJson(
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <PageAddReview
            film={FILM}
            id={FILM.id}
            ratingSelected={`1`}
            text={``}
            isActive={true}
            formValid={false}
            onChageUserInput={handleClick}
            onSubmitSend={handleClick}
          />
        </BrowserRouter>
      </Provider>
    )
  );
  expect(tree).toMatchSnapshot();
});
