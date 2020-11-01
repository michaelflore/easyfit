import React, {Fragment, useState} from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import {Link, useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useAuth} from "../contexts/AuthContext";

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    appBar: {
        // Make the app bar z-index always one more than the drawer z-index
        zIndex: theme.zIndex.drawer + 1,
    },
    updateText: {
        marginRight: '10px',
        marginLeft: '5px',
        paddingLeft: '5px',
        paddingRight: '5px',
        backgroundColor: 'lightgray',
        borderRadius: '5px'
    }
}));

const Header = (props) => {

    // acquires title for the current feature from the jsx props
    const barTitle = props.title;
    const styles = useStyles();

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

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
                    <Toolbar>
                        <Typography align="center">{`${barTitle} | Logged in As: ${currentUser.email} |`}</Typography>
                        <Link to="/update-profile">
                            <Typography className={styles.updateText}>Update Profile</Typography>
                        </Link>
                        <Button onClick={handleLogout} variant='contained'>Log Out</Button>
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