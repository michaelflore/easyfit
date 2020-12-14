import React, {Fragment, useState} from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import {Link, useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useAuth} from "../contexts/AuthContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// styling for this component
const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    appBar: {
        // Make the app bar z-index always one more than the drawer z-index
        zIndex: theme.zIndex.drawer + 1,
    },
    spacing: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const Header = (props) => {

    // acquires title for the current feature from the jsx props
    const barTitle = props.title;
    // load in styling
    const styles = useStyles();
    // error handling message
    const [error, setError] = useState("");
    // get current user and logout function
    const { currentUser, logout } = useAuth();
    // browser history routing
    const history = useHistory();
    // anchor component
    const [anchorEl, setAnchorEl] = useState(null);
    
    // handle popup menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // handle click of logout button
    async function handleLogout() {
        try {
            await logout();
            history.push("/login");
        }
        catch {
            setError('Failed');
        }
    }

    //header for when user is logged in
    if (currentUser) {
        return (
            <Fragment>
                <AppBar position="fixed" color="primary" className={styles.appBar}>
                    <Toolbar className={styles.spacing}>
                        <div>
                            <Typography align="center">{`${barTitle}`}</Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <h3>Logged in As: {currentUser.email} </h3>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                Profile
                            </Button>
                            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem>
                                    <Link to="/update-profile" style={{ color: 'white' }}>Update Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={styles.offset} />
            </Fragment>
        );
    }

    // returns app bar at the top of the page that will be used for navigation between features
    return (
        <Fragment>
            <AppBar position="fixed" color="primary" className={styles.appBar}>
                <Toolbar>
                    <Typography align="center">{barTitle}</Typography>
                </Toolbar>
            </AppBar>
            <div className={styles.offset} />
        </Fragment>
    );
};

export default Header;