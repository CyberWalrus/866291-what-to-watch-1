import {
  FilmDataAdapter,
  getGenerFromData,
  ReviewDataAdapter,
  updateFilmAdapter,
  ReviewSortAdapter
} from "../../api/data-adapter";
import {REVIEW_MESSAGE, SendUrl} from "../../constants";
import NameSpace from "../name-spaces";
import {Action as ReduxAction} from "redux";
import {AxiosResponse, AxiosError, AxiosInstance} from "axios";
import {Film, Review} from "../../type/data";
import {FilmResponse, ReviewResponse} from "../../type/dataResponse";
import {StateApp, ThunkDispatch, ThunkAction} from "../../type/reducer";

enum ActionType {
  SET_FILMS = "SET_FILMS",
  SET_GENERS = "SET_GENERS",
  SET_FAVORITES = "SET_FAVORITES",
  SET_REVIEWS = "SET_REVIEWS",
  SET_REVIEW_MESSAGE = "SET_REVIEW_MESSAGE",
  SET_ACTIVE = "SET_ACTIVE"
}
interface State {
  films: Film[],
  favorites: Film[],
  genres: string[],
  reviews: Review[],
  reviewMessage: string,
  isActive: boolean
}
interface UpdateFilms extends ReduxAction {
  type: ActionType;
  payload: Film[];
}
interface UpdateReviews extends ReduxAction {
  type: ActionType;
  payload: Review[];
}
interface UpdateGenres extends ReduxAction {
  type: ActionType;
  payload: string[];
}
interface UpdateMessage extends ReduxAction {
  type: ActionType;
  payload: string;
}
interface UpdateActive extends ReduxAction {
  type: ActionType;
  payload: boolean;
}
type Action = UpdateFilms | UpdateReviews | UpdateGenres | UpdateMessage | UpdateActive;

const initialState: State = {
  films: [],
  favorites: [],
  genres: [],
  reviews: [],
  reviewMessage: ``,
  isActive: false
};

const ActionCreator = {
  loadFilms: (films: FilmResponse[]): UpdateFilms => {
    return {
      type: ActionType.SET_FILMS,
      payload: films.map(FilmDataAdapter)
    };
  },
  updateFilms: (films: Film[], film: FilmResponse): UpdateFilms => {
    return {
      type: ActionType.SET_FILMS,
      payload: updateFilmAdapter(films, film)
    };
  },
  loadFavorites: (favorites: FilmResponse[]): UpdateFilms => {
    return {
      type: ActionType.SET_FAVORITES,
      payload: favorites.map(FilmDataAdapter)
    };
  },
  loadReviews: (reviews: ReviewResponse[]): UpdateReviews => {
    return {
      type: ActionType.SET_REVIEWS,
      payload: reviews.sort(ReviewSortAdapter).map(ReviewDataAdapter)
    };
  },
  loadGenre: (films: FilmResponse[]): UpdateGenres => {
    return {
      type: ActionType.SET_GENERS,
      payload: getGenerFromData(films)
    };
  },
  resetReviews: (): UpdateReviews => {
    return {
      type: ActionType.SET_REVIEWS,
      payload: initialState.reviews
    };
  },
  setReviewMessage: (message: string): UpdateMessage => {
    return {
      type: ActionType.SET_REVIEW_MESSAGE,
      payload: message
    };
  },
  resetReviewMessage: (): UpdateMessage => {
    return {
      type: ActionType.SET_REVIEW_MESSAGE,
      payload: initialState.reviewMessage
    };
  },
  updateActive: (value: boolean): UpdateActive => {
    return {
      type: ActionType.SET_ACTIVE,
      payload: value
    };
  }
};

const Operation = {
  loadFilms: (): ThunkAction => {
    return (
      dispatch: ThunkDispatch,
      _getState: () => StateApp,
      api: AxiosInstance
    ): Promise<void> => {
      return api
        .get(SendUrl.FILMS)
        .then(
          (response: AxiosResponse<Record<string, any>[]>): void => {
            dispatch(ActionCreator.loadFilms(response.data));
            dispatch(ActionCreator.loadGenre(response.data));
            dispatch(ActionCreator.updateActive(true));
          }
        )
        .catch((): void => {
          dispatch(ActionCreator.updateActive(false));
        });
    };
  },
  loadFavorites: (): ThunkAction => {
    return (
      dispatch: ThunkDispatch,
      _getState: () => StateApp,
      api: AxiosInstance
    ): Promise<void> => {
      return api
        .get(SendUrl.FAVORITE)
        .then(
          (response: AxiosResponse<Record<string, any>[]>): void => {
            dispatch(ActionCreator.loadFavorites(response.data));
          }
        )
        .catch((): void => {});
    };
  },
  sendFavorite: (status: number, filmId: number): ThunkAction => {
    return (
      dispatch: ThunkDispatch,
      _getState: () => StateApp,
      api: AxiosInstance
    ): Promise<void> => {
      return api
        .post(`${SendUrl.FAVORITE}/${filmId}/${status}`, {})
        .then(
          (response: AxiosResponse<Record<string, any>>): void => {
            dispatch(
              ActionCreator.updateFilms(
                _getState()[NameSpace.DATA].films,
                response.data
              )
            );
            dispatch(Operation.loadFavorites());
          }
        )
        .catch((): void => {});
    };
  },
  loadReviews: (filmId: number): ThunkAction => {
    return (
      dispatch: ThunkDispatch,
      _getState: () => StateApp,
      api: AxiosInstance
    ): Promise<void> => {
      return api
        .get(`${SendUrl.COMMENTS}/${filmId}`)
        .then(
          (response: AxiosResponse<Record<string, any>[]>): void => {
            dispatch(ActionCreator.loadReviews(response.data));
          }
        )
        .catch(() => {
          dispatch(ActionCreator.resetReviews());
        })
        .catch((): void => {});
    };
  },
  sendReview: (
    rating: string,
    comment: string,
    filmId: number
  ): ThunkAction => {
    return (
      dispatch: ThunkDispatch,
      _getState: () => StateApp,
      api: AxiosInstance
    ): Promise<void> => {
      return api
        .post(`${SendUrl.COMMENTS}/${filmId}`, {
          rating,
          comment
        })
        .then(
          (): void => {
            dispatch(ActionCreator.setReviewMessage(REVIEW_MESSAGE));
          }
        )
        .catch(
          (error: AxiosError): void => {
            dispatch(ActionCreator.setReviewMessage(error.toString()));
          }
        );
    };
  }
};

const reducer = (state: State = initialState, action: Action) => {
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
    case ActionType.SET_ACTIVE:
      return Object.assign({}, state, {
        isActive: action.payload
      });
  }

  return state;
};

export {State, Action, initialState, ActionCreator, ActionType, Operation, reducer};
