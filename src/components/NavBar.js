import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Drawer, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    navPane: {
        backgroundColor: 'lightgrey',
        outline: '2px solid black',
        borderRadius: '3px',
        marginBottom: '15px'
    }
}));

const NavBar = () => {
    const styles = useStyles();

    return (
            <Drawer variant="permanent" anchor="left" open={true}>
                    <List>
                        {/*this tab is repeated bc the app bar cuts the tab tab off*/}
                        <Link to="/">
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>
                        <Link to="/">
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>
                        <Link to="/bmi">
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"BMI Calculator"} />
                            </ListItem>
                        </Link>
                        <Link to="/log">
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Weight Logging"} />
                            </ListItem>
                        </Link>
                        <Link to='/progress'>
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Progress Tracking"} />
                            </ListItem>
                        </Link>
                    </List>
            </Drawer>
    );
};

export default NavBar;