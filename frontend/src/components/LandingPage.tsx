import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import Footer from "./Footer";

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
    height: "100vh",
    background: "linear-gradient(to bottom ,#00BCB4, #C4E86B)",
  },
  subContainer: {
    height: "50%",
    width: "50%",
    color: "white",
  },
  leftContainer: {
    animation: "$slideIn .8s ease-out",
  },
  rightContainer: {},
  divider: {
    transform: "rotate(-15deg)",
    width: "3px",
  },
  rightSubContainer: {
    animation: "$scaleIn .8s ease-in",
  },
  footer: {
    marginTop: "10rem",
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.mainContainer}
    >
      <Grid item container className={classes.subContainer}>
        {/* Left Container */}
        <Grid md item direction="column" className={classes.leftContainer}>
          <Grid item direction="column" style={{ position: "absolute" }}>
            <Typography variant="h1" style={{ fontSize: "8rem" }}>
              Chuku
            </Typography>
            <Typography variant="h2" style={{ fontSize: "3rem" }}>
              A NEW CRYPTOCURRENCY
            </Typography>
          </Grid>
        </Grid>

        <Divider orientation="vertical" className={classes.divider} />

        {/* Right Container */}
        <Grid
          md
          item
          container
          direction="column"
          className={classes.rightContainer}
        >
          <Grid item container className={classes.rightSubContainer}>
            <Typography variant="body1" paragraph>
              Welcome to
              <Typography
                variant="h1"
                style={{
                  display: "inline",
                  fontSize: "2rem",
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
          {/* Footer */}
          <Grid item className={classes.footer}>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
