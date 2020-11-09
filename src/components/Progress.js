import { Typography, Grid, Card } from '@material-ui/core';
import React, { Fragment, useState, useEffect } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import firebase from "firebase/app";
import 'firebase/firestore';

const Progress = () => {
    const uid = firebase.auth().currentUser.uid;
    const db = firebase.firestore();

    const [isLoaded, setIsLoaded] = useState(false);
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        if(!isLoaded) {
            try {
                const snapshot = await db.collection('users').doc(uid).collection('logs').get();
                setLogs(snapshot.docs.map(log => log.data()));
                setIsLoaded(true);
            } catch(e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        fetchLogs();
    });

    return (
        <Fragment>
            <Header title='Progress Screen'/>
            <NavBar/>
            <Card>
                <br/>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    {logs.map(log => {
                        return <Grid item>
                            <Typography>{`User weighed ${log.weight} lbs with a bmi of ${log.bmi} on ${log.date.toDate()}`}</Typography>
                        </Grid>
                    })}
                </Grid>
                <br/>
            </Card>
        </Fragment>
    );
};

export default Progress;