import {
  FilmDataAdapter,
  getGenerFromData,
  ReviewDataAdapter,
  updateFilmAdapter
} from "../../api/data-adapter.js";
import {REVIEW_MESSAGE, SendUrl} from "../../constants.js";

const initialState = {
  films: [],
  favorites: [],
  genres: [],
  reviews: [],
  reviewMessage: ``
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_GENRE: `LOAD_GENRE`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  RESET_REVIEWS: `RESET_REVIEWS`,
  UPDATE_FILM: `UPDATE_FILM`,
  SET_REVIEW_MESSAGE: `SET_REVIEW_MESSAGE`
};

const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films
    };
  },
  updateFilm: (film) => {
    return {
      type: ActionType.UPDATE_FILM,
      payload: film
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
  },
  setReviewMessage: (message) => {
    return {
      type: ActionType.SET_REVIEW_MESSAGE,
      payload: message
    };
  },
  resetReviewMessage: () => {
    return {
      type: ActionType.SET_REVIEW_MESSAGE,
      payload: initialState.reviewMessage
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(SendUrl.FILMS).then((response) => {
      dispatch(ActionCreator.loadFilms(response.data));
      dispatch(ActionCreator.loadGenre(response.data));
    });
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(SendUrl.FAVORITE).then((response) => {
      dispatch(ActionCreator.loadFavorites(response.data));
    });
  },
  sendFavorite: (status, filmId) => (dispatch, _getState, api) => {
    return api
      .post(`${SendUrl.FAVORITE}/${filmId}/${status}`, {})
      .then((response) => {
        dispatch(Operation.loadFavorites());
        dispatch(ActionCreator.updateFilm(response.data));
      })
      .catch(() => {});
  },
  loadReviews: (filmId) => (dispatch, _getState, api) => {
    return api
      .get(`${SendUrl.COMMENTS}/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.resetReviews());
      });
  },
  sendReview: (rating, comment, filmId) => (dispatch, _getState, api) => {
    return api
      .post(`${SendUrl.COMMENTS}/${filmId}`, {
        rating,
        comment
      })
      .then(() => {
        dispatch(ActionCreator.setReviewMessage(REVIEW_MESSAGE));
      })
      .catch((error) => {
        dispatch(ActionCreator.setReviewMessage(error.toString()));
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
    case ActionType.UPDATE_FILM:
      return Object.assign({}, state, {
        films: updateFilmAdapter(state.films, action.payload)
      });
    case ActionType.SET_REVIEW_MESSAGE:
      return Object.assign({}, state, {
        reviewMessage: action.payload
      });
    case ActionType.RESET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });
  }

  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
