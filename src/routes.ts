const RoutePath = {
  INDEX: `/`,
  LOGIN: `/login`,
  MY_LIST: `/mylist`,
  FILM: `/film/:id`,
  ADD_REVIEW: `/film/:id/review`
};

const routeToFilm = (id: number | string) => {
  return RoutePath.FILM.replace(`:id`, id.toString());
};

const routeToReview = (id: number | string) => {
  return RoutePath.ADD_REVIEW.replace(`:id`, id.toString());
};

export {routeToFilm, routeToReview};

export default RoutePath;
