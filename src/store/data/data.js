import {
  FilmDataAdapter,
  getGenerFromData,
  ReviewDataAdapter
} from "../../api/data-adapter.js";

const initialState = {
  films: [],
  favorites: [],
  genres: [],
  reviews: []
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_GENRE: `LOAD_GENRE`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  LOAD_REVIEWS: `LOAD_REVIEWS`
};

const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films
    };
  },
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews
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
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`).then((response) => {
      dispatch(ActionCreator.loadFavorites(response.data));
    });
  },
  loadReviews: (filmId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${filmId}`).then((response) => {
      dispatch(ActionCreator.loadReviews(response.data));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: action.payload.map(FilmDataAdapter)
      });
    case ActionType.LOAD_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload.map(FilmDataAdapter)
      });
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload.map(ReviewDataAdapter)
      });
    case ActionType.LOAD_GENRE:
      return Object.assign({}, state, {
        genres: getGenerFromData(action.payload)
      });
  }

  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
