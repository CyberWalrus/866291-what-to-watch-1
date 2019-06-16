import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api/api";
import reducer from "./store";
import {Operation as OperationData} from "./store/data/data";
import App from "./components/app/app";
import {StateApp} from "./type/reducer";

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const init = () => {
  const api = createAPI(() => history.pushState(null, null, `/login`));
  const store: StateApp = createStore(
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
``