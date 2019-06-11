const FilmRoute = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};
const GENRE_DEFOULT = `All genres`;
const NUMBER_FILM = 20;
const NUMBER_FILM_GENRE = 4;
const SERVER_URL = `https://es31-server.appspot.com/wtw`;
const SERVER_URL_USER = `https://es31-server.appspot.com/`;
const OptionsVideoMin = {
  width: `280`,
  height: `175`,
  isMuted: true,
  isLoop: true,
  isControls: false
};
const OptionsVideoFull = {
  width: `100%`,
  height: `100%`,
  isMuted: false,
  isLoop: false,
  isControls: false
};
const BodyOverflow = {
  VISIBLE: `visible`,
  HIDDEN: `hidden`
};
const FavoriteStatus = {
  ADD: 1,
  REMOVE: 0
};
const LINK_STYLE = `inherit`;
const DisabledStyle = {
  opacity: `0.4`,
  border: `inherit`,
  cursor: `not-allowed`
};
const REVIEW_MESSAGE = `OK`;
const TextLength = {
  MIN: 50,
  MAX: 400
};

const ratingRadioValues = [`1`, `2`, `3`, `4`, `5`];
const MAIN_FILM_ID = 1;
export {
  FilmRoute,
  GENRE_DEFOULT,
  NUMBER_FILM,
  SERVER_URL,
  SERVER_URL_USER,
  OptionsVideoMin,
  OptionsVideoFull,
  BodyOverflow,
  NUMBER_FILM_GENRE,
  LINK_STYLE,
  FavoriteStatus,
  DisabledStyle,
  REVIEW_MESSAGE,
  ratingRadioValues,
  TextLength,
  MAIN_FILM_ID
};
