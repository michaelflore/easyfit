import React, { Fragment } from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar
}));

const Header = (props) => {
    // acquires title for the current feature from the jsx props
    const barTitle = props.title;

    const styles = useStyles();

    // returns app bar at the top of the page that will be used for navigation between features
    return (
        <Fragment>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography align="center">{barTitle}</Typography>
                </Toolbar>
            </AppBar>
            <div className={styles.offset} />
        </Fragment>
    );
};

export default Header;