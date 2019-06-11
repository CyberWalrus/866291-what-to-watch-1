import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api.js";
import {
  FilmDataAdapter,
  updateFilmAdapter,
  ReviewDataAdapter,
  getGenerFromData
} from "../../api/data-adapter.js";
import {REVIEW_MESSAGE, SendUrl} from "../../constants.js";
import {ActionType, ActionCreator, Operation, reducer} from "./data.js";

const initialState = {
  films: [],
  favorites: [],
  genres: [],
  reviews: [],
  reviewMessage: ``
};

describe(`Action data correctly`, () => {
  it(`Should return a correct loadFilms`, () => {
    expect(ActionCreator.loadFilms([{fake: true}])).toEqual({
      type: ActionType.SET_FILMS,
      payload: [{fake: true}].map(FilmDataAdapter)
    });
  });
  it(`Should return a correct updateFilms`, () => {
    expect(ActionCreator.updateFilms([{fake: true}], {fake: true})).toEqual({
      type: ActionType.SET_FILMS,
      payload: updateFilmAdapter([{fake: true}], {fake: true})
    });
  });
  it(`Should return a correct loadFavorites`, () => {
    expect(ActionCreator.loadFavorites([{fake: true}])).toEqual({
      type: ActionType.SET_FAVORITES,
      payload: [{fake: true}].map(FilmDataAdapter)
    });
  });
  it(`Should return a correct loadReviews`, () => {
    expect(ActionCreator.loadReviews([{fake: true}])).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: [{fake: true}].map(ReviewDataAdapter)
    });
  });
  it(`Should return a correct loadGenre`, () => {
    expect(ActionCreator.loadGenre([{fake: true}])).toEqual({
      type: ActionType.SET_GENERS,
      payload: getGenerFromData([{fake: true}])
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
  it(`Should make a correct API call to ${SendUrl.FILMS}`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFilms = Operation.loadFilms();

    apiMock.onGet(SendUrl.FILMS).reply(200, [{fake: true}]);

    return loadFilms(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_FILMS,
        payload: [{fake: true}].map(FilmDataAdapter)
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_GENERS,
        payload: getGenerFromData([{fake: true}])
      });
    });
  });

  it(`Should make a correct API call to ${SendUrl.FAVORITE}`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFavorites = Operation.loadFavorites();

    apiMock.onGet(SendUrl.FAVORITE).reply(200, [{fake: true}]);

    return loadFavorites(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_FAVORITES,
        payload: [{fake: true}].map(FilmDataAdapter)
      });
    });
  });

  it(`Should make a correct API call to ${SendUrl.COMMENTS}`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const loadReviews = Operation.loadReviews(filmId);

    apiMock.onGet(`${SendUrl.COMMENTS}/${filmId}`).reply(200, [{fake: true}]);

    return loadReviews(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_REVIEWS,
        payload: [{fake: true}].map(ReviewDataAdapter)
      });
    });
  });

  it(`Should make a correct API call to ${SendUrl.FAVORITE}`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const _getState = () => {
      return {
        DATA: {
          films: []
        }
      };
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

  it(`Should make a correct API call to post ${
    SendUrl.COMMENTS
  }/1`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const rating = 1;
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
});

describe(`Reducer data correctly`, () => {
  it(`Reducer without additional parameters should return inital state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer test set films`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.SET_FILMS,
          payload: [{id: 1}, {id: 2}]
        })
    ).toEqual({
      films: [{id: 1}, {id: 2}],
      favorites: [],
      genres: [],
      reviews: [],
      reviewMessage: ``
    });
  });
  it(`Reducer test set favorites`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.SET_FAVORITES,
          payload: [{id: 1}, {id: 2}]
        })
    ).toEqual({
      films: [],
      favorites: [{id: 1}, {id: 2}],
      genres: [],
      reviews: [],
      reviewMessage: ``
    });
  });
  it(`Reducer test set reviews`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.SET_REVIEWS,
          payload: [{id: 1}, {id: 2}]
        })
    ).toEqual({
      films: [],
      favorites: [],
      genres: [],
      reviews: [{id: 1}, {id: 2}],
      reviewMessage: ``
    });
  });
  it(`Reducer test set geners`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.SET_GENERS,
          payload: [{id: 1}, {id: 2}]
        })
    ).toEqual({
      films: [],
      favorites: [],
      genres: [{id: 1}, {id: 2}],
      reviews: [],
      reviewMessage: ``
    });
  });
  it(`Reducer test set review message`, () => {
    expect(
        reducer(initialState, {
          type: ActionType.SET_REVIEW_MESSAGE,
          payload: `test`
        })
    ).toEqual({
      films: [],
      favorites: [],
      genres: [],
      reviews: [],
      reviewMessage: `test`
    });
  });
});
