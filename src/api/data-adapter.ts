import {
  GENRE_DEFOULT,
  SERVER_URL_USER,
  RatingInterval,
  RatingName
} from "../constants";
import {Film, User, Review} from "../type/data";
import {FilmResponse, UserResponse, ReviewResponse} from "../type/dataResponse";

const FilmDataAdapter = (data: FilmResponse): Film => {
  return _filmDataAdapter(data);
};
const ReviewDataAdapter = (data: ReviewResponse): Review => {
  return {
    comment: data.comment,
    date: _dateToString(data.date),
    dateHTML: _dateToStringHTML(data.date),
    id: data.id,
    rating: _ratingToString(data.rating),
    userId: data.user && data.user.id ? data.user.id : 0,
    userName: data.user && data.user.name ? data.user.name : ``
  };
};
const getGenerFromData = (data: FilmResponse[]): string[] => {
  const uniqueGeners = [...new Set(data.map((item) => item.genre))];
  uniqueGeners.unshift(GENRE_DEFOULT);
  if (uniqueGeners.length > 9) {
    uniqueGeners.length = 9;
  }
  return uniqueGeners;
};
const userDataAdapter = (data: UserResponse): User => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    srcAvatar: `${SERVER_URL_USER}${data.avatar_url}`
  };
};
const updateFilmAdapter = (array: Film[], film: FilmResponse): Film[] => {
  const filmNew = _filmDataAdapter(film);
  const elementPos = array
    .map((item) => {
      return item.id;
    })
    .indexOf(filmNew.id);
  array[elementPos] = filmNew;
  return array;
};

const _filmDataAdapter = (data: FilmResponse): Film => {
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
    rating: _ratingToString(data.rating),
    released: data.released,
    runTime: _timeConvert(data.run_time),
    scoresCount: data.scores_count,
    starrings: data.starring,
    srcVideo: data.video_link,
    ratingLevel: _setRatingLevel(data.rating)
  };
};
const _timeConvert = (num: number): string => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours}h ${minutes}m`;
};
const _ratingToString = (rating: number): string => {
  return (Math.round(rating * 100) / 100)
    .toFixed(1)
    .toString()
    .replace(`.`, `,`);
};
const _dateToString = (date: string): string => {
  if (!date) {
    return ``;
  }
  const dateNew = new Date(date);
  let dateString = dateNew.toDateString();
  dateString = dateString.slice(dateString.indexOf(` `) + 1);
  const dateMonth = dateString.slice(0, dateString.indexOf(` `));
  const dateReturn = `${dateMonth} ${dateNew.getDate()}, ${dateNew.getFullYear()}`;
  return dateReturn;
};
const _dateToStringHTML = (date: string): string => {
  if (!date) {
    return ``;
  }
  const dateNew = new Date(date);
  const dateReturn = dateNew.toISOString().substring(0, 10);
  return dateReturn;
};
const _setRatingLevel = (rating: number): RatingName => {
  switch (true) {
    case rating < RatingInterval.BAD:
      return RatingName.BAD;
    case rating < RatingInterval.NORMAL:
      return RatingName.NORMAL;
    case rating < RatingInterval.GOOD:
      return RatingName.GOOD;
    case rating < RatingInterval.VERY_GOOD:
      return RatingName.VERY_GOOD;
    case rating === RatingInterval.AWESOME:
      return RatingName.AWESOME;
  }
  return RatingName.BAD;
};
export {
  FilmDataAdapter,
  ReviewDataAdapter,
  getGenerFromData,
  userDataAdapter,
  updateFilmAdapter
};
