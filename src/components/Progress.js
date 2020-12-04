import { Typography, Grid, Card, makeStyles } from '@material-ui/core';
import React, { Fragment, useState, useEffect } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import firebase from "firebase/app";
import 'firebase/firestore';
import { fetchLogs, logSettings } from '../logic/progresslogic';
import levelLabel from '../logic/activitylevelmap';

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
                        let timestamp = log.date.toDate();

                        let { symbol, colorTheme } = logSettings(i, logs, log, styles);

                        return <Card className={styles.cardSpace} key={timestamp}>
                                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                                        <Grid item>
                                            <Typography className={`${colorTheme} ${styles.changeIndicator}`}>{symbol}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>{`${props.location.item.userName} weighed ${log.weight} lbs with a BMI of ${log.bmi} on ${timestamp}`}</Typography>
                                            <Typography>{`Activity Level: ${levelLabel.get(log.activityLevel)}`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                    })}
                </Grid>
        </Fragment>
    );
};

export default Progress;