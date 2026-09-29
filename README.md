# Movie Explorer

A React web app to search movies, see trending films, view details and trailers, and save favorites. Data comes from the [TMDb API](https://developers.themoviedb.org/3).

**Live demo:** [_Vercel link here_](https://movie-explorer-two-rust.vercel.app/)

**Login credentials:**

- Username: `admin`
- Password: `123456`

## Features
- Login page (demo login, saved in localStorage)
- Trending movies of the week
- Search by movie name (last search is remembered)
- Movie grid with poster, title, release year and rating
- Pagination (20 movies per page)
- Movie details: overview, genres, rating, cast and YouTube trailer
- Favorites list saved in localStorage
- Filter by genre, year and minimum rating
- Light / dark mode
- Friendly error messages and a "Try again" button
- Mobile-first responsive design

## Tech Stack
React (Create React App), React Router v6, Context API, axios, Material-UI (MUI v5)

## Setup
1. Clone the repo and open the folder
2. `npm install`
3. Get a free API key from https://www.themoviedb.org/settings/api
4. Copy `.env.example` to `.env` and put your key: `REACT_APP_TMDB_API_KEY=your_key`
5. `npm start` (opens http://localhost:3000)

## API Usage
| Feature | Endpoint |
|---|---|
| Trending | `/trending/movie/week` |
| Search | `/search/movie` |
| Filters | `/discover/movie` |
| Genre list | `/genre/movie/list` |
| Details, cast, trailer | `/movie/{id}?append_to_response=credits,videos` |

Each page returns 20 movies. TMDb allows a maximum of 500 pages.

## Project Structure
```
src/
  api/         tmdb.js (axios + all API calls)
  context/     Auth, Movie (favorites, last search), Theme
  components/  Navbar, SearchBar, FilterBar, MovieCard, MovieGrid, ErrorMessage, ProtectedRoute
  pages/       Login, Home, MovieDetails, Favorites
  utils/       storage.js (localStorage helpers)
```

## Notes
- Login is a demo only (no backend): username 3+ characters, password 6+ characters.
- When you search and also use the genre or rating filter, the filter is applied on the current page of results, because the TMDb search API does not support those filters.

## Deployment (Vercel)
Import the repo, add the environment variable `REACT_APP_TMDB_API_KEY`, and deploy. `vercel.json` handles page refresh on routes like `/favorites`.
