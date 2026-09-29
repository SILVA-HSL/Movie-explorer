// All TMDb API calls live here, so components stay clean.
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
});

// Add the API key and language to every request.
api.interceptors.request.use((config) => {
  config.params = {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: "en-US",
    ...config.params,
  };
  return config;
});

export const IMAGE_BASE = "https://image.tmdb.org/t/p";

// Turn any axios error into a friendly message for the user.
export const getErrorMessage = (err) => {
  if (!err.response) {
    return "Cannot reach the server. Please check your internet connection.";
  }
  switch (err.response.status) {
    case 401:
      return "Invalid API key. Please check your TMDb API key.";
    case 404:
      return "We could not find what you were looking for.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    default:
      return "Something went wrong on the server. Please try again later.";
  }
};

// Trending movies (20 per page)
export const getTrending = async (page = 1) => {
  const { data } = await api.get("/trending/movie/week", { params: { page } });
  return data;
};

// Search movies by name (optional year)
export const searchMovies = async (query, page = 1, year = "") => {
  const params = { query, page };
  if (year) params.year = year;
  const { data } = await api.get("/search/movie", { params });
  return data;
};

// Filter movies by genre, year and minimum rating
export const discoverMovies = async ({ page = 1, genre, year, rating }) => {
  const params = { page, sort_by: "popularity.desc", "vote_count.gte": 50 };
  if (genre) params.with_genres = genre;
  if (year) params.primary_release_year = year;
  if (rating) params["vote_average.gte"] = rating;
  const { data } = await api.get("/discover/movie", { params });
  return data;
};

// List of all genres (for the filter dropdown)
export const getGenres = async () => {
  const { data } = await api.get("/genre/movie/list");
  return data.genres;
};

// Full details + cast + videos in one request
export const getMovieDetails = async (id) => {
  const { data } = await api.get(`/movie/${id}`, {
    params: { append_to_response: "credits,videos" },
  });
  return data;
};
