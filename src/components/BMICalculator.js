import React, { Fragment, useState, useEffect } from 'react';
import { Button, Card, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import Header from './Header';
import NavBar from "./NavBar";
import firebase from "firebase/app";
import 'firebase/firestore';
import { calculateBmiImperial, calculateBmiMetric, categorizeResult } from '../logic/bmicalculatorlogic';
import { logWeight, validate } from '../logic/logginglogic'

const useStyles = makeStyles(theme => ({
    cardSpace: {
        marginBottom: '10px',
        padding: '25px'
    }
}));

const BMICalculator = () => {
    /**
     * initialize state for:
     *
     * unit
     * bmi
     * weight
     * height
     */
    const [unit, setUnit] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [result, setResult] = useState("None yet!");
    const [advice, setAdvice] = useState("None yet!");
    const [loaded, setLoaded] = useState(false);
    const [alevel, setAlevel] = useState(-1);
    const styles = useStyles();

    // current user id
    const uid = firebase.auth().currentUser.uid;
    // database connection
    const db = firebase.firestore();

    // BMI is calculated here and advice is given
    const calculateBMI = (event) => {
        if(validate(weight, height))
            setBMI(unit === 0 ? calculateBmiMetric(height, weight) : calculateBmiImperial(height, weight));
    };

    // logging button
    const logWeightUI = e => {
        e.preventDefault();
        if(loaded) {
            logWeight(weight, height, unit, bmi, db, uid, alevel);
        }
        else {
            alert('Please try logging again in a few seconds.');
        }
    };

    const fetchUserALevel = async () => {
        // fetch current user data
        let q = await db.collection('users').doc(uid).get();
        // set the activity level of the log to the user's current activity level
        setAlevel(q.data().activityLevel);
        // finish loading
        setLoaded(true);
    };

    useEffect(() => {
        fetchUserALevel();
    });

    // updates the bmi advice upon a state change of the bmi
    useEffect(() => {
        let [bRes, bAdv] = categorizeResult(bmi);
        setResult(bRes);
        setAdvice(bAdv);
    }, [bmi]);

    /**
     * This looks scary, I promise it isn't.
     *
     * We load in our custom Header app bar first
     * Our calculator form is aligned and structured in a Grid, with one container Grid tag and many item Grid tags.
     * TextField tags are objects that take in text input. We have one for weight and one for height, and their state changes on input.
     * RadioGroup simply manages our radio buttons for us.
     * Our Button is used to calculate the BMI based off of the weight, height, and units of measurement inputted by the user.
     * Finally, we have Typography that displays the current state of the calculated BMI.
     */
    return (
        <Fragment>
            <Header title="BMI Calculator" />
            <NavBar />
            <form noValidate autoComplete="off">
                <Card className={styles.cardSpace}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <TextField id="bmi-weight" label={`Enter Your Weight (${unit === 0 ? "kg" : "lbs"})`} defaultValue="0" variant="outlined" onInput={e => setWeight(parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item>
                        <TextField id="bmi-height" label={`Enter Your Height (${unit === 0 ? "m" : "in"})`} defaultValue="0" variant="outlined" onInput={e => setHeight(parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item>
                        <FormLabel>Select Units</FormLabel>
                        <RadioGroup name="units" aria-label="Select Units" value={unit} onChange={e => setUnit(Number(e.target.value))}>
                            <FormControlLabel key="metric" value={0} control={<Radio/>} label="Metric"/>
                            <FormControlLabel key="customary" value={1} control={<Radio/>} label="Customary"/>
                        </RadioGroup>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={calculateBMI}>Calculate BMI</Button>
                    </Grid>
                    <Grid item>
                        <Typography>Your BMI is: {bmi}</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={logWeightUI}>Log</Button>
                    </Grid>
                    <Grid item>
                        <Typography>Your BMI status is: {result}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Advice based on your BMI: {advice}</Typography>
                    </Grid>
                </Grid>
                </Card>
            </form>
        </Fragment>
    );
};

export default BMICalculator;