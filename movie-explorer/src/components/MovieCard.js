// One movie in the grid: poster, title, year, rating and favorite button.
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IMAGE_BASE } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();
  const favorite = isFavorite(movie.id);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  return (
    <Card sx={{ height: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
      <IconButton
        onClick={() => toggleFavorite(movie)}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        sx={{ position: "absolute", top: 4, right: 4, zIndex: 1, bgcolor: "rgba(0,0,0,0.55)", "&:hover": { bgcolor: "rgba(0,0,0,0.75)" } }}
      >
        {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon sx={{ color: "#fff" }} />}
      </IconButton>

      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        {movie.poster_path ? (
          <CardMedia component="img" image={`${IMAGE_BASE}/w500${movie.poster_path}`} alt={movie.title} loading="lazy" sx={{ aspectRatio: "2 / 3", objectFit: "cover" }} />
        ) : (
          <Box sx={{ aspectRatio: "2 / 3", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "action.hover" }}>
            <Typography color="text.secondary">No image</Typography>
          </Box>
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ lineHeight: 1.25 }}>
            {movie.title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">{year}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              <StarIcon fontSize="small" sx={{ color: "#f5b301" }} />
              <Typography variant="body2">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
