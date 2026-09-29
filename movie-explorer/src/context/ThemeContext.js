// Light / dark mode. The choice is saved in localStorage.
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { loadJSON, saveJSON } from "../utils/storage";

const ColorModeContext = createContext();
export const useColorMode = () => useContext(ColorModeContext);

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState(() => loadJSON("me_theme", "dark"));

  useEffect(() => saveJSON("me_theme", mode), [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));

  const theme = useMemo(
    () => createTheme({ palette: { mode, primary: { main: "#e50914" } } }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
