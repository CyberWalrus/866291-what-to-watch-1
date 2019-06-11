const GENRE_DEFOULT = `All genres`;
const NUMBER_FILM = 20;
const NUMBER_FILM_GENRE = 4;
const SERVER_URL = `https://es31-server.appspot.com/wtw`;
const SERVER_URL_USER = `https://es31-server.appspot.com/`;
const LINK_STYLE = `inherit`;
const MAIN_FILM_ID = 1;
const PADDING_VIDEO = 25;
const REVIEW_MESSAGE = `OK`;

const ratingRadioValues = [`1`, `2`, `3`, `4`, `5`];

const RatingName = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`
};
const RatingInterval = {
  BAD: 3,
  NORMAL: 5,
  GOOD: 8,
  VERY_GOOD: 10,
  AWESOME: 10
};
const FilmRoute = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};
const BodyOverflow = {
  VISIBLE: `visible`,
  HIDDEN: `hidden`
};
const FavoriteStatus = {
  ADD: 1,
  REMOVE: 0
};
const TextLength = {
  MIN: 50,
  MAX: 400
};
const RatingValue = {
  MIN: 1,
  MAX: 5
};

const DisabledStyle = {
  opacity: `0.4`,
  border: `inherit`,
  cursor: `not-allowed`
};
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

export {
  GENRE_DEFOULT,
  NUMBER_FILM,
  SERVER_URL,
  SERVER_URL_USER,
  NUMBER_FILM_GENRE,
  LINK_STYLE,
  PADDING_VIDEO,
  REVIEW_MESSAGE,
  MAIN_FILM_ID,
  ratingRadioValues,
  RatingName,
  RatingInterval,
  FilmRoute,
  OptionsVideoMin,
  OptionsVideoFull,
  BodyOverflow,
  FavoriteStatus,
  DisabledStyle,
  TextLength,
  RatingValue
};
