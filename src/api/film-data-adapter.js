const FilmDataAdapter = (data) => {
  return {
    bgColor: data.background_color,
    bgImage: data.background_image,
    description: data.description,
    director: data.director,
    genre: data.genre,
    id: data.id,
    isFavourite: data.is_favorite,
    title: data.name,
    pageUrl: data.name,
    posterImage: data.poster_image,
    src: data.preview_image,
    previewVideo: data.preview_video_link,
    rating: data.rating,
    released: data.released,
    runTime: data.run_time,
    scoresCount: data.scores_count,
    starring: data.starring,
    preview: data.video_link
  };
};

export default FilmDataAdapter;
