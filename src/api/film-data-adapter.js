const FilmDataAdapter = (data) => {
  return {
    bgColor: data.background_color,
    srcBgImage: data.background_image,
    description: data.description,
    director: data.director,
    genre: data.genre,
    id: data.id,
    isFavourite: data.is_favorite,
    title: data.name,
    pageUrl: data.name,
    srcPosterImage: data.poster_image,
    srcPreviewImage: data.preview_image,
    previewVideo: data.preview_video_link,
    rating: data.rating,
    released: data.released,
    runTime: data.run_time,
    scoresCount: data.scores_count,
    starrings: data.starring,
    preview: data.video_link,
    ratingLevel: setRatingLevel(data.rating)
  };
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
export default FilmDataAdapter;
