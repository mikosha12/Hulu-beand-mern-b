// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const getTheme = (isDarkMode: boolean) =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
    // Add other theme customizations if needed
  });
