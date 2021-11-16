import { createTheme } from "@material-ui/core/styles";

export default createTheme({
    typography: {
        h1 :{
            fontFamily: "Raleway",
            fontWeight: 700,
            fontSize: "3.5rem",
            lineHeight: 1.5,
        },
        h2: {
          fontFamily: "Raleway",
          fontWeight: 700,
          fontSize: "2.5rem",
          lineHeight: 1.5,
        },
        h3: {
          fontFamily: "Pacifico",
          fontSize: "2.5rem",
        },
        h4: {
          fontFamily: "Raleway",
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
          fontSize: "1.25rem",
          fontWeight: 300,
        },
      },
})