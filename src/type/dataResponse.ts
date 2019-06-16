export interface UserResponse {
  id?: number;
  email?: string;
  name?: string;
  avatar_url?: string;
}
export interface FilmResponse {
  background_color?: string;
  background_image?: string;
  description?: string;
  director?: string;
  genre?: string;
  id?: number;
  is_favorite?: boolean;
  name?: string;
  poster_image?: string;
  preview_image?: string;
  preview_video_link?: string;
  rating?: number;
  released?: number;
  run_time?: number;
  scores_count?: number;
  starring?: string[];
  video_link?: string;
}

export interface ReviewResponse {
  comment?: string;
  date?: string;
  id?: number;
  rating?: number;
  user?: {
    id?: number;
    name?: string;
  };
}
