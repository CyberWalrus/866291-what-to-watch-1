import {
  FilmDataAdapter,
  getGenerFromData,
  ReviewDataAdapter,
  updateFilmAdapter
} from "../../api/data-adapter.js";
import {REVIEW_MESSAGE, SendUrl} from "../../constants.js";
import NameSpace from "../name-spaces.js";

const initialState = {
  films: [],
  favorites: [],
  genres: [],
  reviews: [],
  reviewMessage: ``
};

const ActionType = {
  SET_FILMS: `SET_FILMS`,
  SET_GENERS: `SET_GENERS`,
  SET_FAVORITES: `SET_FAVORITES`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_REVIEW_MESSAGE: `SET_REVIEW_MESSAGE`
};

const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.SET_FILMS,
      payload: films.map(FilmDataAdapter)
    };
  },
  updateFilms: (films, film) => {
    return {
      type: ActionType.SET_FILMS,
      payload: updateFilmAdapter(films, film)
    };
  },
  loadFavorites: (favorites) => {
    return {
      type: ActionType.SET_FAVORITES,
      payload: favorites.map(FilmDataAdapter)
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.SET_REVIEWS,
      payload: reviews.map(ReviewDataAdapter)
    };
  },
  loadGenre: (films) => {
    return {
      type: ActionType.SET_GENERS,
      payload: getGenerFromData(films)
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
        dispatch(ActionCreator.updateFilms(_getState()[NameSpace.DATA].films, response.data));
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
    case ActionType.SET_FILMS:
      return Object.assign({}, state, {
        films: action.payload
      });
    case ActionType.SET_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload
      });
    case ActionType.SET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });
    case ActionType.SET_GENERS:
      return Object.assign({}, state, {
        genres: action.payload
      });
    case ActionType.SET_REVIEW_MESSAGE:
      return Object.assign({}, state, {
        reviewMessage: action.payload
      });
  }

  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
