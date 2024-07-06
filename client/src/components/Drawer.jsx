import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";

import { Link } from "react-router-dom";

import calendar from "../assets/images/calend_icon.png";
import child from "../assets/images/child_icon.png";
import parent from "../assets/images/parent_icon.png";
import info from "../assets/images/info_icon.png";
import menu from "../assets/images/menu.png";

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false, // Change anchor to left
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#f5af49",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/">
          {["Home"].map((text) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src={calendar}
                    alt="calendar icon"
                    className="drawerIcon"
                  />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </Link>
      </List>

      <Divider />
      <List>
        <Link to="/children">
          {["Children"].map((text) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemIcon>
                  <img src={child} alt="child icon" className="drawerIcon" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/parents">
          {["Parents"].map((text) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemIcon>
                  <img src={parent} alt="parent icon" className="drawerIcon" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </Link>
      </List>
      <List>
        <Link to="/emergency">
          {["Emergency"].map((text) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemIcon>
                  <img src={info} alt="emergency icon" className="drawerIcon" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </Link>
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <div className="drawerButtonContainer">
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              className="drawerButton"
            >
              <img src={menu} alt="icon menu" className="burgerLogo" />
            </Button>

            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
