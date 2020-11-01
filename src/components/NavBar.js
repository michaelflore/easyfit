import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Drawer } from "@material-ui/core";

const NavBar = () => {
    return (
            <Drawer variant="permanent" anchor="left" open={true}>
                    <List>
                        {/*this tab is repeated bc the app bar cuts the tab tab off*/}
                        <Link to="/">
                            <ListItem button>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>
                        <Link to="/">
                            <ListItem button>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>
                        <Link to="/bmi">
                            <ListItem button>
                                <ListItemText primary={"BMI Calculator"} />
                            </ListItem>
                        </Link>
                    </List>
            </Drawer>
    );
};

export default NavBar;