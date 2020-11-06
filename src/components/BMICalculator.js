import React, { Fragment, useState, useEffect } from 'react';
import { Button, Card, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import Header from './Header';
import NavBar from "./NavBar";
import firebase from "firebase/app";
import 'firebase/firestore';
let { bmiImperial, bmiMetric, bmiResult } = require('../logic/bmicalculatorlogic.js');

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

    // Handles the change event for our unit radio buttons
    const radioChange = (event) => {
        setUnit(Number(event.target.value));
    };

    // parses new value for weight/height and switches state to reflect new value
    const weightChange = (event) => setWeight(parseFloat(event.target.value));
    const heightChange = (event) => setHeight(parseFloat(event.target.value));

    const validate = () => {
        if(!Number.isInteger(weight) || !Number.isInteger(height)) {
            alert("Error, use must enter a valid weight and height.");
            return false;
        } else if(height <= 0) {
            alert("Error, height must be a positive, non-zero number.");
            return false;
        } else {
            return true;
        }
    };

    // BMI is calculated here and advice is given
    const calculateBMI = (event) => {
        if(validate())
            setBMI(unit === 0 ? bmiMetric(height, weight) : bmiImperial(height, weight));
    };

    // updates the bmi advice upon a state change of the bmi
    useEffect(() => {
        let [bRes, bAdv] = bmiResult(bmi);
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
                <Card>
                <br/>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <TextField id="bmi-weight" label={`Enter Your Weight (${unit === 0 ? "kg" : "lbs"})`} defaultValue="0" variant="outlined" onInput={weightChange}/>
                    </Grid>
                    <Grid item>
                        <TextField id="bmi-height" label={`Enter Your Height (${unit === 0 ? "m" : "in"})`} defaultValue="0" variant="outlined" onInput={heightChange}/>
                    </Grid>
                    <Grid item>
                        <FormLabel>Select Units</FormLabel>
                        <RadioGroup name="units" aria-label="Select Units" value={unit} onChange={radioChange}>
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
                        <Typography>Your BMI status is: {result}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Advice based on your BMI: {advice}</Typography>
                    </Grid>
                </Grid>
                <br/>
                </Card>
            </form>
        </Fragment>
    );
};

export default BMICalculator;