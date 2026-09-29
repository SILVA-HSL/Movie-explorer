// Stores favorites and the last searched movie (both saved in localStorage).
import React, { createContext, useContext, useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => loadJSON("me_favorites", []));
  const [lastSearch, setLastSearch] = useState(() => loadJSON("me_last_search", ""));

  useEffect(() => saveJSON("me_favorites", favorites), [favorites]);
  useEffect(() => saveJSON("me_last_search", lastSearch), [lastSearch]);

  const isFavorite = (id) => favorites.some((m) => m.id === id);

  // Add the movie if it is not in the list, otherwise remove it.
  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [
            ...prev,
            {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
            },
          ]
    );
  };

  return (
    <MovieContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, lastSearch, setLastSearch }}
    >
      {children}
    </MovieContext.Provider>
  );
}
