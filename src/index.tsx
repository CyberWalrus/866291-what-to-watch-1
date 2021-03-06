import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api/api";
import reducer from "./store";
import App from "./components/app/app";

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const init = (): void => {
  const api = createAPI((): void => history.pushState(null, null, `/login`));
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      __REDUX_DEVTOOLS_EXTENSION__ &&
        __REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
  );
};

init();
