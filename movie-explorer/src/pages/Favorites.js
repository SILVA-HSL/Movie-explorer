// Shows the movies the user saved (stored in localStorage).
import React from "react";
import { Container, Typography } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

export default function Favorites() {
  const { favorites } = useMovies();

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>My Favorites</Typography>
      {favorites.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
          You have no favorite movies yet. Tap the heart on any movie to save it.
        </Typography>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Container>
  );
}
