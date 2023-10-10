import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: [
      "'Be Vietnam Pro', sans-serif",
      "'Manrope', sans-serif",
      "'Noto Sans TC', sans-serif",
      "'Skranji', cursive",
    ].join(","),
  },
});
