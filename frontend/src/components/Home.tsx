import { Grid, Hidden, useTheme, Drawer, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";

import Blockchain from "./Blockchain";
import ConductTransaction from "./ConductTransaction";
import Footer from "./Footer";
import TransactionPool from "./TransactionPool";
import UserBar from "./UserBar";

function Home() {
  const theme = useTheme();
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => setDrawer((prevState) => !prevState);

  return (
    <Grid container direction="column">
      <Hidden mdUp>
        <Grid item container direction="column">
          <Grid item>
            <IconButton hidden={drawer} onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawer} onClose={toggleDrawer}></Drawer>
          </Grid>
          <Grid item>
            <Blockchain />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid item container>
          <Grid lg={4} md={6} item>
            <UserBar />
          </Grid>
          <Grid lg={8} md={6} item>
            <Blockchain />
          </Grid>
        </Grid>
      </Hidden>
      <Grid item container>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Home;
