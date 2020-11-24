import { Typography, Grid, Card, makeStyles } from '@material-ui/core';
import React, { Fragment, useState, useEffect } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import firebase from "firebase/app";
import 'firebase/firestore';
import { fetchLogs, logSettings } from '../logic/progresslogic';

// styling for cards and weight progress
const useStyles = makeStyles(theme => ({
    cardSpace: {
        marginBottom: '10px',
        padding: '10px'
    },
    changeIndicator: {
        fontSize: '24px'
    },
    weightGain: {
        color: 'green'
    },
    weightLoss: {
        color: 'red'
    },
    weightNeutral: {
        color: 'yellow'
    }
}));

const Progress = (props) => {
    // db connections
    const uid = props.location.item.uid;
    const db = firebase.firestore();

    // initialize state
    const [isLoaded, setIsLoaded] = useState(false);
    const [logs, setLogs] = useState([]);
    const styles = useStyles();
    /*
    // retrieves all weight logs from current user, then makes sure the db cannot be queried infinitely
    const fetchLogs = async () => {
        if(!isLoaded) {
            try {
                const snapshot = await db.collection('users').doc(uid).collection('logs').get();
                // sort in order of log date since firestore is weird and doesnt store stuff in order
                setLogs(snapshot.docs.map(log => log.data()).sort((a, b) => b.date.toDate() - a.date.toDate()));
                setIsLoaded(true);
            } catch(e) {
                console.log(e);
            }
        }
    };
    */

    // fetch logs on component initialization
    useEffect(() => {
        fetchLogs(db, uid, isLoaded, setIsLoaded, setLogs);
    }, [db, uid, isLoaded]);

    return (
        <Fragment>
            <Header title='Progress Screen'/>
            <NavBar/>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    {logs.map((log, i) => {
                        /*
                        // these store data based on the change from last weight log to the current one
                        let symbol = 'x';
                        let colorTheme = styles.weightNeutral;
                        */
                        let timestamp = log.date.toDate();
                        /*
                        if(i !== logs.length-1) {
                            if(logs[i+1].weight > log.weight) {
                                // weight loss
                                symbol = '-';
                                colorTheme = styles.weightLoss;
                            } else if(logs[i+1].weight < log.weight) {
                                // weight gain
                                symbol = '+';
                                colorTheme = styles.weightGain;
                            } else {
                                // no change
                                symbol = 'x';
                                colorTheme = styles.weightNeutral;
                            }
                        }
                        */
                       let { symbol, colorTheme } = logSettings(i, logs, log, styles);

                        return <Card className={styles.cardSpace} key={timestamp}>
                                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                                        <Grid item>
                                            <Typography className={`${colorTheme} ${styles.changeIndicator}`}>{symbol}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>{`${props.location.item.userName} weighed ${log.weight} lbs with a BMI of ${log.bmi} on ${timestamp}`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                    })}
                </Grid>
        </Fragment>
    );
};

export default Progress;