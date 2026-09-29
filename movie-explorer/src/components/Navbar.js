// Top navigation bar: links, favorites count, theme toggle, logout.
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../context/AuthContext";
import { useMovies } from "../context/MovieContext";
import { useColorMode } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { favorites } = useMovies();
  const { mode, toggle } = useColorMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar sx={{ gap: 1 }}>
        {/* <MovieIcon /> */}
        <Box
          component="img"
          src="/logo-2.png"
          alt="Movie Explorer logo"
          sx={{
            width: 40,
            height: 40,
            objectFit: "contain",
          }}
/>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>
          Movie Explorer
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <>
            <Button color="inherit" component={RouterLink} to="/favorites" aria-label="Favorites">
              <Badge badgeContent={favorites.length} color="secondary" max={99}>
                <FavoriteIcon />
              </Badge>
            </Button>
            <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
              {user.username}
            </Typography>
          </>
        )}
        <IconButton color="inherit" onClick={toggle} aria-label="Toggle light and dark mode">
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        {user && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
