import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api/api";
import reducer from "./store";
import {Operation} from "./store/data/data";
import App from "./components/app/app.jsx";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";

const AppWrapped = withScreenSwitch(App);

const init = () => {
  const api = createAPI(() => history.pushState(null, null, `/login`));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  store.dispatch(Operation.loadFilms());
  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
