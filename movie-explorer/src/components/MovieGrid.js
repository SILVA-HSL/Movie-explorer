// Responsive grid of MovieCards (2 columns on phones, 3 on tablets, 4 on desktop).
import React from "react";
import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  return (
    <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
      {movies.map((movie) => (
        <Grid item xs={6} sm={4} md={3} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
