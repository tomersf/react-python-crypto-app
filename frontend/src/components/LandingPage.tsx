import {
  Divider,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Footer from "./Footer";
import ClipPathButton from "./ui/ClipPathButton";

const useStyles = makeStyles((theme) => ({
  "@keyframes slideIn": {
    "0%": {
      opacity: 0,
      transform: "translateX(-20rem)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  "@keyframes scaleIn": {
    "0%": {
      opacity: 0,
      transform: "scaleX(0)",
    },
    "100%": {
      opacity: 1,
    },
  },
  mainContainer: {
    [theme.breakpoints.up("lg")]: {
      height: "100vh",
    },
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    padding: "1rem",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      height: "60%",
      width: "60%",
    },
    [theme.breakpoints.up("lg")]: {
      height: "65%",
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "90%",
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "80%",
      width: "95%",
    },
  },
  leftContainer: {
    animation: "$slideIn .8s ease-out",
    [theme.breakpoints.up("lg")]: {
      alignItems: "flex-end",
    },
  },
  rightContainer: {
    alignItems: "center",
  },
  divider: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      transform: "rotate(-6deg) translateX(-25px)",
    },
    [theme.breakpoints.up("xxl")]: {
      transform: "rotate(-15deg) translateX(-40px) translateY(-20px)",
    },
    transition: "all 2s",
    transitionProperty: "transform, width",
    width: "2px",
  },
  rightSubTextContainer: {
    [theme.breakpoints.down("lg")]: {
      marginTop: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    animation: "$scaleIn .8s ease-in",
  },
  button: {
    marginTop: "7rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.8rem",
    },
  },
  footer: {
    marginTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.6rem",
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container className={classes.mainContainer}>
      <Grid
        item
        direction={matchesXS ? "column" : "row"}
        container
        className={classes.subContainer}
      >
        {/* Left Container */}
        <Grid
          md
          lg={4}
          item
          container
          direction="column"
          className={classes.leftContainer}
        >
          <Grid item direction="column">
            <Typography
              variant="h1"
              style={{
                fontSize: matchesXS ? "5rem" : "8.5rem",
              }}
            >
              Chuku
            </Typography>
            <Typography
              variant="h2"
              style={{ fontSize: matchesXS ? "0px" : "3.2rem" }}
            >
              A NEW CRYPTOCURRENCY
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Grid
          container
          item
          lg={2}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Divider orientation="vertical" className={classes.divider} />
        </Grid>

        {/* Right Container */}
        <Grid
          md
          lg={6}
          item
          container
          direction="column"
          className={classes.rightContainer}
          spacing={4}
        >
          <Grid item container className={classes.rightSubTextContainer}>
            <Typography
              variant="body1"
              paragraph
              style={{ fontSize: matchesXS ? "1.5rem" : "3.5rem" }}
            >
              Welcome to
              <Typography
                variant="h1"
                style={{
                  display: "inline",
                  fontSize: matchesXS ? "2rem" : "4rem",
                  marginLeft: "6px",
                  marginRight: "10px",
                }}
              >
                Chuku
              </Typography>
              crypto currency website.
              <br /> A small project that was created for fun using Python &
              React.
              <br />
              Try it by yourself! see how you can make transactions, mine blocks
              and watch how they are added to the blockchain!
            </Typography>
          </Grid>
          <Grid item className={classes.button}>
            <ClipPathButton />
          </Grid>
          {/* Footer */}
          <Grid container direction="column" item className={classes.footer}>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
