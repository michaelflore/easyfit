import React, { Fragment, useState } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import { Card, Grid, TextField, Button, makeStyles } from '@material-ui/core';
import firebase from "firebase/app";
import 'firebase/firestore';
import { logWeight } from '../logic/logginglogic';

const useStyles = makeStyles(theme => ({
    cardSpace: {
        marginBottom: '10px',
        padding: '10px'
    }
}));

const Logging = () => {
    // initial state for weight and bmi
    const [weight, setWeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [alevel, setALevel] = useState(-1);
    // current user id
    const uid = firebase.auth().currentUser.uid;
    // database connection
    const db = firebase.firestore();
    const styles = useStyles();
    const MIN_ALEVEL = 1;
    const MAX_ALEVEL = 4;

    // // on form submit, the current data of the page is validated and then logged to the current user document
    const handleSubmit = e => {
        // prevent auto redirect
        e.preventDefault();
        logWeight(weight, bmi, 1, bmi, db, uid, alevel);
    };

    // user interface
    return (
        <Fragment>
            <Header title='Weight and BMI Logging'/>
            <NavBar/>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Card className={styles.cardSpace}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        <Grid item>
                            <TextField id="weight-in" label='Enter your new weight (lbs)' defaultValue={0} variant="outlined" onInput={e => setWeight(parseFloat(e.target.value))}/>
                        </Grid>
                        <Grid item>
                            <TextField id="bmi-in" label='Enter your new BMI' defaultValue={0} variant="outlined" onInput={e => setBMI(parseFloat(e.target.value))}/>
                        </Grid>
                        <Grid item>
                            <TextField id='activity' label={`Activity Level (${MIN_ALEVEL.toString()}-${MAX_ALEVEL.toString()})`} variant='outlined' onInput={e => setALevel(Number.parseInt(e.target.value))}/>
                        </Grid>
                        <Grid item>
                            <Button type='submit' variant="contained" color="primary">Log</Button>
                        </Grid>
                    </Grid>
                </Card>
            </form>
        </Fragment>
    );
};

export default Logging;