import { createTheme } from "@material-ui/core/styles";
declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

const chukuPrimary = "#F7FFF6";
const chukuSecondary = "#3A3335";

export default createTheme({
  palette: {
    primary: {
      main: chukuPrimary,
    },
    secondary: {
      main: chukuSecondary,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2600,
    },
  },
  typography: {
    h1: {
      fontFamily: "Exo",
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.5,
    },
    h2: {
      fontFamily: "Molengo",
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: "Molengo",
      fontSize: "2.5rem",
    },
    h4: {
      fontFamily: "Molengo",
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
    },
    subtitle2: {
      color: "white",
      fontSize: "1.25rem",
      fontWeight: 300,
    },
    body1: {
      fontFamily: "Yanone Kaffeesatz",
      fontSize: "1.75rem",
      fontWeight: 700,
    },
  },
});
