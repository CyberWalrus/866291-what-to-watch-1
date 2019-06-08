import {
  FilmDataAdapter,
  getGenerFromData,
  ReviewDataAdapter
} from "../../api/data-adapter.js";

const initialState = {
  films: [],
  favorites: [],
  genres: [],
  reviews: [],
  errorMessage: ``
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_GENRE: `LOAD_GENRE`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  RESET_REVIEWS: `RESET_REVIEWS`
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
  },
  resetReviews: () => {
    return {
      type: ActionType.RESET_REVIEWS,
      payload: []
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
  sendFavorite: (status, filmId) => (dispatch, _getState, api) => {
    return api
      .post(`/favorite/${filmId}/${status}`, {})
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
      });
  },
  loadReviews: (filmId) => (dispatch, _getState, api) => {
    return api
      .get(`/comments/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.resetReviews());
      });
  },
  sendReview: (rating, comment, filmId) => (dispatch, _getState, api) => {
    return api
      .post(`/comments/${filmId}`, {
        rating,
        comment
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
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
    case ActionType.RESET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });
  }

  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
