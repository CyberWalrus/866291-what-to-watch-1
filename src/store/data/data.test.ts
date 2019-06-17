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

describe(`Action data correctly`, () => {
  it(`Should return a correct loadFilms`, () => {
    expect(ActionCreator.loadFilms(FILMS_RESPONSE)).toEqual({
      type: ActionType.SET_FILMS,
      payload: FILMS_RESPONSE.map(FilmDataAdapter)
    });
  });
  it(`Should return a correct updateFilms`, () => {
    expect(ActionCreator.updateFilms(FILMS, FILM_RESPONSE)).toEqual({
      type: ActionType.SET_FILMS,
      payload: updateFilmAdapter(FILMS, FILM_RESPONSE)
    });
  });
  it(`Should return a correct loadFavorites`, () => {
    expect(ActionCreator.loadFavorites(FILMS_RESPONSE)).toEqual({
      type: ActionType.SET_FAVORITES,
      payload: FILMS_RESPONSE.map(FilmDataAdapter)
    });
  });
  it(`Should return a correct loadReviews`, () => {
    expect(ActionCreator.loadReviews(REVIEWS_RESPONSE)).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: REVIEWS_RESPONSE.map(ReviewDataAdapter)
    });
  });
  it(`Should return a correct loadGenre`, () => {
    expect(ActionCreator.loadGenre(FILMS_RESPONSE)).toEqual({
      type: ActionType.SET_GENERS,
      payload: getGenerFromData(FILMS_RESPONSE)
    });
  });
  it(`Should return a correct resetReviews`, () => {
    expect(ActionCreator.resetReviews()).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: initialState.reviews
    });
  });
  it(`Should return a correct setReviewMessage`, () => {
    expect(ActionCreator.setReviewMessage(`fake`)).toEqual({
      type: ActionType.SET_REVIEW_MESSAGE,
      payload: `fake`
    });
  });
  it(`Should return a correct resetReviewMessage`, () => {
    expect(ActionCreator.resetReviewMessage()).toEqual({
      type: ActionType.SET_REVIEW_MESSAGE,
      payload: initialState.reviewMessage
    });
  });
});

describe(`Operation data correctly`, () => {
  it(`Should make a correct API call to ${SendUrl.FILMS}`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFilms = Operation.loadFilms();

    apiMock.onGet(SendUrl.FILMS).reply(200, FILMS_RESPONSE);

    return loadFilms(dispatch, jest.fn(), api).then(() => {
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
    });
  });

  it(`Should make a correct API call with fail to ${SendUrl.FILMS}`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFilms = Operation.loadFilms();

    apiMock.onGet(SendUrl.FILMS).reply(400, FILMS_RESPONSE);

    return loadFilms(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_ACTIVE,
        payload: false
      });
    });
  });

  it(`Should make a correct API call to ${SendUrl.FAVORITE}`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFavorites = Operation.loadFavorites();

    apiMock.onGet(SendUrl.FAVORITE).reply(200, FILMS_RESPONSE);

    return loadFavorites(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_FAVORITES,
        payload: FILMS_RESPONSE.map(FilmDataAdapter)
      });
    });
  });

  it(`Should make a correct API call to ${SendUrl.COMMENTS}`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const loadReviews = Operation.loadReviews(filmId);

    apiMock.onGet(`${SendUrl.COMMENTS}/${filmId}`).reply(200, REVIEWS_RESPONSE);

    return loadReviews(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_REVIEWS,
        payload: REVIEWS_RESPONSE.map(ReviewDataAdapter)
      });
    });
  });

  it(`Should make a correct API call with fail to post ${
    SendUrl.COMMENTS
  }/1`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const loadReviews = Operation.loadReviews(filmId);

    apiMock.onGet(`${SendUrl.COMMENTS}/${filmId}`).reply(400, REVIEWS_RESPONSE);

    return loadReviews(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_REVIEWS,
        payload: initialState.reviews
      });
    });
  });

  it(`Should make a correct API call to ${SendUrl.FAVORITE}`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const _getState = () => {
      return STATE;
    };
    const filmId = 1;
    const status = 1;
    const sendFavorite = Operation.sendFavorite(filmId, status);

    apiMock
      .onPost(`${SendUrl.FAVORITE}/${filmId}/${status}`)
      .reply(200, [{fake: true}]);

    return sendFavorite(dispatch, _getState, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  it(`Should make a correct API call to post ${SendUrl.COMMENTS}/1`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const rating = `1`;
    const comment = `sfasfa`;
    const sendReview = Operation.sendReview(rating, comment, filmId);

    apiMock.onPost(`${SendUrl.COMMENTS}/${filmId}`).reply(200, `fake`);

    return sendReview(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_REVIEW_MESSAGE,
        payload: REVIEW_MESSAGE
      });
    });
  });

  it(`Should make a correct API call with fail to post ${
    SendUrl.COMMENTS
  }/1`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const rating = `1`;
    const comment = `sfasfa`;
    const sendReview = Operation.sendReview(rating, comment, filmId);

    apiMock.onPost(`${SendUrl.COMMENTS}/${filmId}`).reply(400, `fake`);

    return sendReview(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_REVIEW_MESSAGE,
        payload: `Error: Request failed with status code 400`
      });
    });
  });
});

describe(`Reducer data correctly`, () => {
  it(`Reducer test set films`, () => {
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
  it(`Reducer test set favorites`, () => {
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
  it(`Reducer test set reviews`, () => {
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
  it(`Reducer test set geners`, () => {
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
  it(`Reducer test set review message`, () => {
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
