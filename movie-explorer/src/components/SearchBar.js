// Search input. Calls onSearch(text) when the user submits.
import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar({ initialValue = "", onSearch }) {
  const [text, setText] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text.trim());
  };

  const handleClear = () => {
    setText("");
    onSearch("");
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "center", px: 1, width: "100%" }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a movie..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        inputProps={{ "aria-label": "search movies" }}
      />
      {text && (
        <IconButton onClick={handleClear} aria-label="clear search">
          <ClearIcon />
        </IconButton>
      )}
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
