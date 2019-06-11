import {GENRE_DEFOULT, SERVER_URL_USER} from "../mock/constants.js";
const FilmDataAdapter = (data) => {
  return _filmDataAdapter(data);
};
const _filmDataAdapter = (data) => {
  return {
    bgColor: data.background_color,
    srcBgImage: data.background_image,
    description: data.description,
    director: data.director,
    genre: data.genre,
    id: data.id,
    isFavorite: data.is_favorite,
    title: data.name,
    pageUrl: data.name,
    srcPosterImage: data.poster_image,
    srcPreviewImage: data.preview_image,
    srcPreviewVideo: data.preview_video_link,
    rating: ratingToString(data.rating),
    released: data.released,
    runTime: timeConvert(data.run_time),
    scoresCount: data.scores_count,
    starrings: data.starring,
    srcVideo: data.video_link,
    ratingLevel: setRatingLevel(data.rating)
  };
};
const ReviewDataAdapter = (data) => {
  return {
    comment: data.comment,
    date: dateToString(data.date),
    dateHTML: dateToStringHTML(data.date),
    id: data.id,
    rating: ratingToString(data.rating),
    userId: data.user.id,
    userName: data.user.name
  };
};
const userDataAdapter = (data) => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    srcAvatar: `${SERVER_URL_USER}${data.avatar_url}`
  };
};
const getGenerFromData = (data) => {
  const uniqueGeners = [...new Set(data.map((item) => item.genre))];
  uniqueGeners.unshift(GENRE_DEFOULT);
  if (uniqueGeners.length > 9) {
    uniqueGeners.length = 9;
  }
  return uniqueGeners;
};
const updateFilmAdapter = (array, film) => {
  const filmNew = _filmDataAdapter(film);
  const elementPos = array
    .map((item) => {
      return item.id;
    })
    .indexOf(filmNew.id);
  array[elementPos] = filmNew;
  return array;
};

const timeConvert = (num) => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours}h ${minutes}m`;
};
const ratingToString = (rating) => {
  return parseFloat(Math.round(rating * 100) / 100)
    .toFixed(1)
    .toString()
    .replace(`.`, `,`);
};
const dateToString = (date) => {
  const dateNew = new Date(date);
  let dateString = dateNew.toDateString();
  dateString = dateString.slice(dateString.indexOf(` `) + 1);
  const dateMonth = dateString.slice(0, dateString.indexOf(` `));
  const dateReturn = `${dateMonth} ${dateNew.getDate()}, ${dateNew.getFullYear()}`;
  return dateReturn;
};
const dateToStringHTML = (date) => {
  const dateNew = new Date(date);
  const dateReturn = dateNew.toISOString().substring(0, 10);
  return dateReturn;
};
const setRatingLevel = (rating) => {
  switch (true) {
    case rating < 3:
      return `Bad`;
    case rating < 5:
      return `Normal`;
    case rating < 8:
      return `Good`;
    case rating < 10:
      return `Very good`;
    case rating === 10:
      return `Awesome`;
  }
  return `Bad`;
};
export {
  FilmDataAdapter,
  ReviewDataAdapter,
  getGenerFromData,
  userDataAdapter,
  updateFilmAdapter
};
