
const intialState = {
  genreFilter: `all`
};

const ActionCreator = {
  changeGenre: (value) => {
    if (
      [
        `comedy`,
        `crime`,
        `documentary`,
        `drama`,
        `horror`,
        `family`,
        `romance`,
        `sci-fi`,
        `thriller`
      ].find((item) => item === value)
    ) {
      return {
        type: `CHANGE_GENRE`,
        genreNew: value
      };
    }
    return {
      type: `RESET`
    };
  }
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case `CHANGE_GENRE`:
      return Object.assign({}, state, {
        genreFilter: action.genreNew
      });
    case `RESET`:
      return Object.assign({}, intialState);
  }
  return state;
};

export {ActionCreator, reducer};
