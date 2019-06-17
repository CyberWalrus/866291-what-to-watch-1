import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api";
import {
  FilmDataAdapter,
  updateFilmAdapter,
  ReviewDataAdapter,
  getGenerFromData
} from "../../api/data-adapter";
import {REVIEW_MESSAGE, SendUrl} from "../../constants";
import {ActionType, ActionCreator, Operation, reducer} from "./data";
import {
  FILMS,
  GENRES,
  REVIEWS,
  FILMS_RESPONSE,
  FILM_RESPONSE,
  REVIEWS_RESPONSE,
  STATE
} from "../../mock/data-mock";
import {initialState} from "./data";
import {StateApp} from "../../type/reducer";

describe(`Action data correctly`, (): void => {
  it(`Should a correct loadFilms`, (): void => {
    expect(ActionCreator.loadFilms(FILMS_RESPONSE)).toEqual({
      type: ActionType.SET_FILMS,
      payload: FILMS_RESPONSE.map(FilmDataAdapter)
    });
  });
  it(`Should a correct updateFilms`, (): void => {
    expect(ActionCreator.updateFilms(FILMS, FILM_RESPONSE)).toEqual({
      type: ActionType.SET_FILMS,
      payload: updateFilmAdapter(FILMS, FILM_RESPONSE)
    });
  });
  it(`Should a correct loadFavorites`, (): void => {
    expect(ActionCreator.loadFavorites(FILMS_RESPONSE)).toEqual({
      type: ActionType.SET_FAVORITES,
      payload: FILMS_RESPONSE.map(FilmDataAdapter)
    });
  });
  it(`Should a correct loadReviews`, (): void => {
    expect(ActionCreator.loadReviews(REVIEWS_RESPONSE)).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: REVIEWS_RESPONSE.map(ReviewDataAdapter)
    });
  });
  it(`Should a correct loadGenre`, (): void => {
    expect(ActionCreator.loadGenre(FILMS_RESPONSE)).toEqual({
      type: ActionType.SET_GENERS,
      payload: getGenerFromData(FILMS_RESPONSE)
    });
  });
  it(`Should a correct resetReviews`, (): void => {
    expect(ActionCreator.resetReviews()).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: initialState.reviews
    });
  });
  it(`Should a correct setReviewMessage`, (): void => {
    expect(ActionCreator.setReviewMessage(`fake`)).toEqual({
      type: ActionType.SET_REVIEW_MESSAGE,
      payload: `fake`
    });
  });
  it(`Should a correct resetReviewMessage`, (): void => {
    expect(ActionCreator.resetReviewMessage()).toEqual({
      type: ActionType.SET_REVIEW_MESSAGE,
      payload: initialState.reviewMessage
    });
  });
});

describe(`Operation data correctly`, (): void => {
  it(`Should make a correct API call to ${SendUrl.FILMS}`, (): void => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFilms = Operation.loadFilms();

    apiMock.onGet(SendUrl.FILMS).reply(200, FILMS_RESPONSE);

    loadFilms(dispatch, jest.fn(), api).then(
      (): void => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FILMS,
          payload: FILMS_RESPONSE.map(FilmDataAdapter)
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_GENERS,
          payload: getGenerFromData(FILMS_RESPONSE)
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_ACTIVE,
          payload: true
        });
      }
    );
  });

  it(`Should make a correct API call with fail to ${
    SendUrl.FILMS
  }`, (): void => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFilms = Operation.loadFilms();

    apiMock.onGet(SendUrl.FILMS).reply(400, FILMS_RESPONSE);

    loadFilms(dispatch, jest.fn(), api).then(
      (): void => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ACTIVE,
          payload: false
        });
      }
    );
  });

  it(`Should make a correct API call to ${SendUrl.FAVORITE}`, (): void => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFavorites = Operation.loadFavorites();

    apiMock.onGet(SendUrl.FAVORITE).reply(200, FILMS_RESPONSE);

    loadFavorites(dispatch, jest.fn(), api).then(
      (): void => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FAVORITES,
          payload: FILMS_RESPONSE.map(FilmDataAdapter)
        });
      }
    );
  });

  it(`Should make a correct API call to ${SendUrl.COMMENTS}`, (): void => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const loadReviews = Operation.loadReviews(filmId);

    apiMock.onGet(`${SendUrl.COMMENTS}/${filmId}`).reply(200, REVIEWS_RESPONSE);

    loadReviews(dispatch, jest.fn(), api).then(
      (): void => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEWS,
          payload: REVIEWS_RESPONSE.map(ReviewDataAdapter)
        });
      }
    );
  });

  it(`Should make a correct API call with fail to post ${
    SendUrl.COMMENTS
  }/1`, (): void => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const loadReviews = Operation.loadReviews(filmId);

    apiMock.onGet(`${SendUrl.COMMENTS}/${filmId}`).reply(400, REVIEWS_RESPONSE);

    loadReviews(dispatch, jest.fn(), api).then(
      (): void => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEWS,
          payload: initialState.reviews
        });
      }
    );
  });

  it(`Should make a correct API call to ${SendUrl.FAVORITE}`, (): void => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const _getState = (): StateApp => STATE;
    const filmId = 1;
    const status = 1;
    const sendFavorite = Operation.sendFavorite(filmId, status);

    apiMock
      .onPost(`${SendUrl.FAVORITE}/${filmId}/${status}`)
      .reply(200, [{fake: true}]);

    sendFavorite(dispatch, _getState, api).then(
      (): void => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      }
    );
  });

  it(`Should make a correct API call to post ${
    SendUrl.COMMENTS
  }/1`, (): void => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const rating = `1`;
    const comment = `sfasfa`;
    const sendReview = Operation.sendReview(rating, comment, filmId);

    apiMock.onPost(`${SendUrl.COMMENTS}/${filmId}`).reply(200, `fake`);

    sendReview(dispatch, jest.fn(), api).then(
      (): void => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEW_MESSAGE,
          payload: REVIEW_MESSAGE
        });
      }
    );
  });

  it(`Should make a correct API call with fail to post ${
    SendUrl.COMMENTS
  }/1`, (): void => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const rating = `1`;
    const comment = `sfasfa`;
    const sendReview = Operation.sendReview(rating, comment, filmId);

    apiMock.onPost(`${SendUrl.COMMENTS}/${filmId}`).reply(400, `fake`);

    sendReview(dispatch, jest.fn(), api).then(
      (): void => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEW_MESSAGE,
          payload: `Error: Request failed with status code 400`
        });
      }
    );
  });
});

describe(`Reducer data correctly`, (): void => {
  it(`Reducer test set films`, (): void => {
    expect(
      reducer(initialState, {
        type: ActionType.SET_FILMS,
        payload: FILMS
      })
    ).toEqual(
      Object.assign({}, initialState, {
        films: FILMS
      })
    );
  });
  it(`Reducer test set favorites`, (): void => {
    expect(
      reducer(initialState, {
        type: ActionType.SET_FAVORITES,
        payload: FILMS
      })
    ).toEqual(
      Object.assign({}, initialState, {
        favorites: FILMS
      })
    );
  });
  it(`Reducer test set reviews`, (): void => {
    expect(
      reducer(initialState, {
        type: ActionType.SET_REVIEWS,
        payload: REVIEWS
      })
    ).toEqual(
      Object.assign({}, initialState, {
        reviews: REVIEWS
      })
    );
  });
  it(`Reducer test set geners`, (): void => {
    expect(
      reducer(initialState, {
        type: ActionType.SET_GENERS,
        payload: GENRES
      })
    ).toEqual(
      Object.assign({}, initialState, {
        genres: GENRES
      })
    );
  });
  it(`Reducer test set review message`, (): void => {
    expect(
      reducer(initialState, {
        type: ActionType.SET_REVIEW_MESSAGE,
        payload: `test`
      })
    ).toEqual(
      Object.assign({}, initialState, {
        reviewMessage: `test`
      })
    );
  });
});
