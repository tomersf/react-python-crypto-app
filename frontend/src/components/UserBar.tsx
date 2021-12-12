import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useNavigate } from "react-router";

import blob from "../assets/blob-haikei.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    [theme.breakpoints.up("md")]: {
      height: "450px",
    },
    [theme.breakpoints.up("lg")]: {
      height: "600px",
    },
    [theme.breakpoints.up("xl")]: {
      height: "800px",
    },
    [theme.breakpoints.up("xxl")]: {
      height: "1000px",
    },
  },
  blob: {
    position: "absolute",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      left: -230,
      top: 50,
    },
    [theme.breakpoints.up("lg")]: {
      left: -280,
      top: 50,
    },
    [theme.breakpoints.up("xl")]: {
      left: -400,
    },
    [theme.breakpoints.up("xxl")]: {
      left: -500,
    },
  },
  buttonContainer: {
    position: "absolute",
    width: "auto",
    [theme.breakpoints.up("md")]: {
      top: 160,
      left: 2,
    },
    [theme.breakpoints.up("lg")]: {
      top: 250,
      left: 30,
    },
    [theme.breakpoints.up("xl")]: {
      top: 250,
      left: 40,
    },
    [theme.breakpoints.up("xxl")]: {
      top: 350,
      left: 60,
    },
  },
}));

function UserBar() {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const matchesXXL = useMediaQuery(theme.breakpoints.up("xxl"));
  const matchesXL = useMediaQuery(theme.breakpoints.only("xl"));
  const matchesLG = useMediaQuery(theme.breakpoints.only("lg"));

  return (
    <Grid item container direction="column" className={classes.container}>
      <Grid item container direction="column">
        <img src={blob} alt="blob" className={classes.blob} />
        <Grid
          item
          container
          direction="column"
          className={classes.buttonContainer}
        >
          <Grid
            item
            style={{ marginBottom: matchesXXL ? 180 : matchesXL ? 150 : 100 }}
          >
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={() => navigate("/wallet")}
            >
              <Typography
                variant="h2"
                style={{
                  fontSize: matchesXXL
                    ? "2.5rem"
                    : matchesXL
                    ? "2rem"
                    : matchesLG
                    ? "1.5rem"
                    : "1rem",
                }}
              >
                MY WALLET
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={() => navigate("/transaction")}
            >
              <Typography
                variant="h2"
                style={{
                  fontSize: matchesXXL
                    ? "2.5rem"
                    : matchesXL
                    ? "2rem"
                    : matchesLG
                    ? "1.5rem"
                    : "1rem",
                }}
              >
                Conduct Transaction
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserBar;
