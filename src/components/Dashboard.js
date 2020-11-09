import React, {Fragment, useState, useEffect} from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import { Card, Grid, Typography } from "@material-ui/core";

const Dashboard = () => {

    return (
        <Fragment>
            <Header title="Admin Dashboard"/>
            <NavBar/>
            <Card>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Typography>Nothing yet</Typography>
                </Grid>
            </Card>
        </Fragment>
    );
};

export default Dashboard;