import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api.js";
import {ActionType, Operation} from "./data.js";

describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadFilms();

    apiMock.onGet(`/films`).reply(200, [{fake: true}]);

    return questionLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_FILMS,
        payload: [{fake: true}]
      });
    });
  });
});
