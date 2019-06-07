import {FilmDataAdapter, getGenerFromData} from "../../api/data-adapter.js";

const initialState = {
  films: [],
  genres: []
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_GENRE: `LOAD_GENRE`
};

const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films
    };
  },
  loadGenre: (films) => {
    return {
      type: ActionType.LOAD_GENRE,
      payload: films
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.loadFilms(response.data));
      dispatch(ActionCreator.loadGenre(response.data));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: action.payload.map(FilmDataAdapter)
      });
    case ActionType.LOAD_GENRE:
      return Object.assign({}, state, {
        genres: getGenerFromData(action.payload)
      });
  }

  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
