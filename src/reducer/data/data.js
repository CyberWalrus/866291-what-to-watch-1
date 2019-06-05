import Adapter from '../../api/film-data-adapter';

const initialState = {
  films: []
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`
};

const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      filmsNew: films
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.loadFilms(response.data));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: action.filmsNew.map(Adapter)
      });
  }

  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
