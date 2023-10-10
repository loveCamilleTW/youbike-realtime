import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      contrastText: "#B5CC22",
    },
    secondary: {
      main: "#B5CC22",
      dark: "#677510",
      contrastText: "#FFFFFF",
    },
  },
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
