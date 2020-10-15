import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Header = (props) => {
    // acquires title for the current feature from the jsx props
    const barTitle = props.title;

    // returns app bar at the top of the page that will be used for navigation between features
    return (
    <AppBar position="static" color="primary">
        <Toolbar>
            <Typography align="center">{barTitle}</Typography>
        </Toolbar>
    </AppBar>
    );
};

export default Header;