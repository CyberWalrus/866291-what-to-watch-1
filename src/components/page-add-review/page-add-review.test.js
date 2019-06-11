import React from "react";
import renderer from "react-test-renderer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PageAddReview} from "./page-add-review.jsx";
import {FILM} from "../../mock/mock-test.js";
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
              handleUserInput={handleClick}
              handleFormSubmit={handleClick}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
