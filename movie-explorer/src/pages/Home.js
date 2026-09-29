import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Pagination, CircularProgress, Stack } from "@mui/material";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import MovieGrid from "../components/MovieGrid";
import ErrorMessage from "../components/ErrorMessage";
import { useMovies } from "../context/MovieContext";
import { getTrending, searchMovies, discoverMovies, getGenres, getErrorMessage } from "../api/tmdb";

export default function Home() {
  const { lastSearch, setLastSearch } = useMovies();

  const [query, setQuery] = useState(lastSearch); // restore last search
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  // Load genre list once
  useEffect(() => {
    getGenres().then(setGenres).catch(() => {});
  }, []);

  // Load movies whenever search, filters or page change
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        let data;
        if (query) {
          data = await searchMovies(query, page, year);
        } else if (genre || year || rating) {
          data = await discoverMovies({ page, genre, year, rating });
        } else {
          data = await getTrending(page);
        }
        if (cancelled) return;

        let results = data.results;
        // The search API cannot filter by genre/rating, so we filter this page here.
        if (query) {
          if (genre) results = results.filter((m) => m.genre_ids.includes(Number(genre)));
          if (rating) results = results.filter((m) => m.vote_average >= Number(rating));
        }
        setMovies(results);
        setTotalPages(Math.min(data.total_pages, 500) || 1); // TMDb allows max 500 pages
      } catch (err) {
        if (!cancelled) {
          setError(getErrorMessage(err));
          setMovies([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [query, genre, year, rating, page, retry]);

  const handleSearch = (text) => {
    setQuery(text);
    setLastSearch(text);
    setPage(1);
  };

  const handleFilterChange = (name, value) => {
    if (name === "genre") setGenre(value);
    if (name === "year") setYear(value);
    if (name === "rating") setRating(value);
    setPage(1);
  };

  const handleReset = () => {
    setGenre("");
    setYear("");
    setRating("");
    setPage(1);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const title = query
    ? `Results for "${query}"`
    : genre || year || rating
    ? "Filtered movies"
    : "Trending this week";

  return (
    <Container sx={{ py: 3 }}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <SearchBar initialValue={query} onSearch={handleSearch} />
        <FilterBar genres={genres} genre={genre} year={year} rating={rating} onChange={handleFilterChange} onReset={handleReset} />
      </Stack>

      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>{title}</Typography>

      {error && <ErrorMessage message={error} onRetry={() => setRetry((r) => r + 1)} />}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!error && movies.length === 0 && (
            <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
              No movies found. Try a different search or filter.
            </Typography>
          )}
          <MovieGrid movies={movies} />
        </>
      )}

      {!error && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" siblingCount={1} boundaryCount={1} />
        </Box>
      )}
    </Container>
  );
}
