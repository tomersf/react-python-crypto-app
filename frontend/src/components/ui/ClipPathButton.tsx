import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    display: "inline-block",
    width: "180px",
    height: "50px",
    background: "none",
    border: "none",
    "& span": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      color: theme.palette.primary.main,
      background: "linear-gradient(to bottom, #00bcb4, #c4e86b) no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textTransform: "uppercase",
      borderRadius: "10px",
    },
    "& span:nth-child(2)": {
      color: theme.palette.primary.main,
      background: "linear-gradient(to bottom, #c4e86b, #00bcb4) no-repeat",
      overflow: "hidden",
      zIndex: "2",
      transition: "0.5s",
      clipPath: "polygon(60% 0, 100% 0, 100% 100%, 60% 100%, 40% 53%)",
    },
    "& span:nth-child(2):hover": {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%)",
      color: theme.palette.secondary.main,
    },
    "& span:nth-child(1):hover ~ span:nth-child(2)": {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%, 100% 50%)",
    },
  },
}));

interface IClipPathButton {
  onClick: () => void;
}

function ClipPathButton(props: IClipPathButton) {
  const classes = useStyles();

  return (
    <div>
      <button className={classes.button} onClick={props.onClick}>
        <span>
          <Typography variant="body1" style={{ fontSize: "36px" }}>
            Continue
          </Typography>
        </span>
        <span>
          <Typography variant="body1" style={{ fontSize: "36px" }}>
            Continue
          </Typography>
        </span>
      </button>
    </div>
  );
}

export default ClipPathButton;
