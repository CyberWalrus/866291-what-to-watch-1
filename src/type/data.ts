export interface Film {
  id: number;
  title: string;
  bgColor: string;
  srcBgImage: string;
  description: string;
  director: string;
  genre: string;
  isFavorite: boolean;
  pageUrl: string;
  srcPosterImage: string;
  srcPreviewImage: string;
  srcPreviewVideo: string;
  rating: string;
  released: number;
  runTime: string;
  scoresCount: number;
  starrings: string[];
  srcVideo: string;
  ratingLevel: string;
}

export interface Review {
  id: number;
  comment: string;
  rating: string;
  userId: number;
  userName: string;
  date: string;
  dateHTML: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  srcAvatar: string;
}
