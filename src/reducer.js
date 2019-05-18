import films from "./mock/films.js";
const intialState = {
  genreFilter: `all`,
  films
};

const ActionCreator = {
  changeGenre: (value) => {
    if (value === `all`) {
      return {
        type: `RESET`
      };
    }
    const filmsNew = films.filter((item) => item.genre === value);
    return {
      type: `CHANGE_GENRE`,
      genreNew: value,
      filmsNew
    };
  }
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case `CHANGE_GENRE`:
      return Object.assign({}, state, {
        genreFilter: action.genreNew,
        films: action.filmsNew
      });
    case `RESET`:
      return Object.assign({}, intialState);
  }
  return state;
};

export {ActionCreator, reducer};
