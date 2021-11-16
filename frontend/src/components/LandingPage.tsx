import {Divider, Grid, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles( (theme) => ({
    mainContainer: {
        height: '100vh',
        background: "linear-gradient(to bottom ,#00BCB4, #C4E86B)",
    },
    subContainer: {
        height: '50%',
        width: '50%',
        color: 'white',
    },
    leftContainer: {

    },
    divider : {
        transform: 'rotate(-15deg)',
        width: '2px',
        color: 'white',
    },
    rightContainer: {},
}));


const LandingPage = () => {
    const classes = useStyles();

    return (
        <Grid container justifyContent='center' alignItems='center' className={classes.mainContainer}>
            <Grid item container className={classes.subContainer}>
                <Grid md item direction='column' className={classes.leftContainer} >
                    <Grid item direction='column' style={{position: 'absolute', backgroundColor:'black'}} >
                    <Typography variant="h1">
                        Chuku
                    </Typography>
                    <Typography variant="h2" style={{justifyContent: 'flex-end'}}>
                        CRYPTOCURRENCY
                    </Typography>
                    </Grid>
                </Grid>
                <Divider orientation='vertical' className={classes.divider}/>
                <Grid md item  >
                    <Typography variant="h4" paragraph>
                    Chuku is the best cryptocurrency!
                    <br />
                    You should try it out!
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LandingPage