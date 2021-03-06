import {Film, Review, User} from "../type/data";
import {FilmResponse, ReviewResponse, UserResponse} from "../type/dataResponse";
import {StateApp} from "../type/reducer";
import NameSpace from "../store/name-spaces";
import {initialState as initialStateData} from "../store/data/data";
import {initialState as initialStateFilter} from "../store/filter/filter";
import {initialState as initialStateUser} from "../store/user/user";

const FILMS: Film[] = [
  {
    bgColor: `#977461`,
    description: `In 1954, a U.S. Marshal investigates the disappearance of a murderer, who escaped from a hospital for the criminally insane.`,
    director: `Martin Scorsese`,
    genre: `Thriller`,
    id: 1,
    isFavorite: false,
    pageUrl: `Shutter Island`,
    srcVideo: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    srcPreviewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: `8,1`,
    ratingLevel: `Very good`,
    released: 2010,
    runTime: `1h 44m`,
    scoresCount: 1002557,
    srcBgImage: `https://es31-server.appspot.com/wtw/static/film/background/Shutter_Island.jpg`,
    srcPosterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Shutter_Island.jpg`,
    srcPreviewImage: `https://es31-server.appspot.com/wtw/static/film/preview/shutter-island.jpg`,
    starrings: [`Leonardo DiCaprio`, `Emily Mortimer`, `Mark Ruffalo`],
    title: `Shutter Island`
  },
  {
    bgColor: `#F1E9CE`,
    description: `Macbeth, the Thane of Glamis, receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders his king and takes the throne for himself.`,
    director: `Justin Kurzel`,
    genre: `Drama`,
    id: 2,
    isFavorite: false,
    pageUrl: `Macbeth`,
    srcVideo: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    srcPreviewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: `6,6`,
    ratingLevel: `Good`,
    released: 2015,
    runTime: `1h 44m`,
    scoresCount: 48798,
    srcBgImage: `https://es31-server.appspot.com/wtw/static/film/background/Macbeth.jpg`,
    srcPosterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Macbeth.jpg`,
    srcPreviewImage: `https://es31-server.appspot.com/wtw/static/film/preview/macbeth.jpg`,
    starrings: [`Michael Fassbender`, `Marion Cotillard`, `Jack Madigan`],
    title: `Macbeth`
  }
];
const FILM: Film = {
  bgColor: `#977461`,
  description: `In 1954, a U.S. Marshal investigates the disappearance of a murderer, who escaped from a hospital for the criminally insane.`,
  director: `Martin Scorsese`,
  genre: `Thriller`,
  id: 1,
  isFavorite: false,
  pageUrl: `Shutter Island`,
  srcVideo: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  srcPreviewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: `8,1`,
  ratingLevel: `Very good`,
  released: 2010,
  runTime: `1h 44m`,
  scoresCount: 1002557,
  srcBgImage: `https://es31-server.appspot.com/wtw/static/film/background/Shutter_Island.jpg`,
  srcPosterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Shutter_Island.jpg`,
  srcPreviewImage: `https://es31-server.appspot.com/wtw/static/film/preview/shutter-island.jpg`,
  starrings: [`Leonardo DiCaprio`, `Emily Mortimer`, `Mark Ruffalo`],
  title: `Shutter Island`
};
const REVIEWS: Review[] = [
  {
    comment: `test test test test test test test test test test test test test`,
    date: `2019-05-11`,
    dateHTML: `May 11, 2019`,
    id: 1,
    rating: `8,1`,
    userId: 1,
    userName: `Walrus`
  },
  {
    comment: `test test test test test test test test test test test test test`,
    date: `2019-05-11`,
    dateHTML: `May 11, 2019`,
    id: 1,
    rating: `8,1`,
    userId: 1,
    userName: `Walrus`
  }
];

const GENRES: string[] = [
  `All genres`,
  `Thriller`,
  `Drama`,
  `Adventure`,
  `Comedy`,
  `Crime`,
  `Action`,
  `Fantasy`
];

const USER: User = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  srcAvatar: `/test`
};

const FILMS_RESPONSE: FilmResponse[] = [
  {
    id: 1
  }
];

const FILM_RESPONSE: FilmResponse = {
  id: 1
};
const REVIEWS_RESPONSE: ReviewResponse[] = [
  {
    id: 1
  }
];
const USER_RESPONSE: UserResponse = {
  id: 1
};
const STATE: StateApp = {
  [NameSpace.DATA]: initialStateData,
  [NameSpace.FILTER]: initialStateFilter,
  [NameSpace.USER]: initialStateUser
};
export {FILMS, FILM, GENRES, REVIEWS, USER, FILMS_RESPONSE, FILM_RESPONSE, REVIEWS_RESPONSE, USER_RESPONSE, STATE};
