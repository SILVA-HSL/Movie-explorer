// Detail page: overview, genres, cast, rating and trailer.
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Box, Typography, Chip, Button, CircularProgress, Grid, Avatar, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ErrorMessage from "../components/ErrorMessage";
import { getMovieDetails, getErrorMessage, IMAGE_BASE } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getMovieDetails(id)
      .then((data) => !cancelled && setMovie(data))
      .catch((err) => !cancelled && setError(getErrorMessage(err)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, retry]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container sx={{ py: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Back</Button>
        <ErrorMessage message={error || "Movie not found."} onRetry={() => setRetry((r) => r + 1)} />
      </Container>
    );
  }

  const favorite = isFavorite(movie.id);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const videos = movie.videos?.results || [];
  const trailer =
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    videos.find((v) => v.site === "YouTube");

  return (
    <Container sx={{ py: 3 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          {movie.poster_path ? (
            <Box component="img" src={`${IMAGE_BASE}/w500${movie.poster_path}`} alt={movie.title} sx={{ width: "100%", borderRadius: 2, boxShadow: 4 }} />
          ) : (
            <Box sx={{ aspectRatio: "2 / 3", bgcolor: "action.hover", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography color="text.secondary">No image</Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight={700}>
            {movie.title} <Typography component="span" variant="h5" color="text.secondary">({year})</Typography>
          </Typography>
          {movie.tagline && (
            <Typography color="text.secondary" fontStyle="italic" sx={{ mt: 0.5 }}>{movie.tagline}</Typography>
          )}

          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 2 }} flexWrap="wrap" useFlexGap>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon sx={{ color: "#f5b301" }} />
              <Typography fontWeight={600}>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10</Typography>
            </Box>
            {movie.runtime > 0 && <Typography color="text.secondary">{movie.runtime} min</Typography>}
            <Button
              variant={favorite ? "contained" : "outlined"}
              startIcon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => toggleFavorite(movie)}
            >
              {favorite ? "In favorites" : "Add to favorites"}
            </Button>
          </Stack>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {movie.genres.map((g) => <Chip key={g.id} label={g.name} />)}
          </Box>

          <Typography variant="h6" fontWeight={600}>Overview</Typography>
          <Typography sx={{ mb: 3 }}>{movie.overview || "No overview available."}</Typography>

          {cast.length > 0 && (
            <>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Cast</Typography>
              <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, mb: 3 }}>
                {cast.map((c) => (
                  <Box key={c.id} sx={{ textAlign: "center", minWidth: 80, maxWidth: 90 }}>
                    <Avatar src={c.profile_path ? `${IMAGE_BASE}/w185${c.profile_path}` : undefined} alt={c.name} sx={{ width: 64, height: 64, mx: "auto", mb: 0.5 }} />
                    <Typography variant="caption" display="block" fontWeight={600}>{c.name}</Typography>
                    <Typography variant="caption" color="text.secondary" display="block">{c.character}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {trailer ? (
            <>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Trailer</Typography>
              <Box sx={{ position: "relative", pt: "56.25%", borderRadius: 2, overflow: "hidden" }}>
                <iframe
                  title="Movie trailer"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                />
              </Box>
              <Button href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer" sx={{ mt: 1 }}>
                Watch on YouTube
              </Button>
            </>
          ) : (
            <Typography color="text.secondary">No trailer available.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
