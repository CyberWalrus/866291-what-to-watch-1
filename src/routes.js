const RoutePath = {
  INDEX: `/`,
  LOGIN: `/login`,
  MY_LIST: `/mylist`,
  FILM: `/film/:id`,
  ADD_REVIEW: `/film/:id/review`
};

const routeToFilm = (id) => {
  return RoutePath.FILM.replace(`:id`, id);
};

const routeToReview = (id) => {
  return RoutePath.ADD_REVIEW.replace(`:id`, id);
};

export {routeToFilm, routeToReview};

export default RoutePath;
