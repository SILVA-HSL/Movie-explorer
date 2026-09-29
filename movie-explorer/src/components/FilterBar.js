// Genre, year and minimum rating filters (bonus feature).
import React from "react";
import { Grid, TextField, MenuItem, Button } from "@mui/material";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);
const ratings = [9, 8, 7, 6, 5, 4];

export default function FilterBar({ genres, genre, year, rating, onChange, onReset }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={3}>
        <TextField select fullWidth size="small" label="Genre" value={genre} onChange={(e) => onChange("genre", e.target.value)}>
          <MenuItem value="">All genres</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField select fullWidth size="small" label="Year" value={year} onChange={(e) => onChange("year", e.target.value)}>
          <MenuItem value="">Any year</MenuItem>
          {years.map((y) => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField select fullWidth size="small" label="Min rating" value={rating} onChange={(e) => onChange("rating", e.target.value)}>
          <MenuItem value="">Any rating</MenuItem>
          {ratings.map((r) => (
            <MenuItem key={r} value={r}>{r}+</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button fullWidth variant="outlined" onClick={onReset}>Reset filters</Button>
      </Grid>
    </Grid>
  );
}
