import * as React from "react";
import renderer from "react-test-renderer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PageAddReview} from "./page-add-review";
import {FILM} from "../../mock/mock-test";
import reducer from "../../store";

it(`PageAddReview correctly renders after relaunch`, () => {
  const store = createStore(reducer);
  const handleClick = jest.fn();
  const tree = renderer
    .create(
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
    .toJSON();
  expect(tree).toMatchSnapshot();
});
