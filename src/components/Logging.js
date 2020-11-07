import React, { Fragment, useState, useEffect } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import { Card, Grid, TextField, Button } from '@material-ui/core';
import firebase from "firebase/app";
import 'firebase/firestore';

const Logging = () => {
    // initial state for weight and bmi
    const [weight, setWeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    // current user id
    const uid = firebase.auth().currentUser.uid;
    // database connection
    const db = firebase.firestore();

    // debug console logs
    useEffect(() => {
        console.log(weight);
        console.log(bmi);
    }, [weight, bmi]);

    // checks if number is a float
    const isFloat = n => {
        return Number(n) === n && n % 1 !== 0;
    }

    // validates weight and bmi by checking if it is either a number or a float
    const validate = () => {
        if(!(isFloat(weight) || Number.isInteger(weight)) || !(isFloat(bmi) || Number.isInteger(bmi))) {
            alert("Error, use must enter a valid weight and bmi.");
            return false;
        } else {
            return true;
        }
    };

    // on form submit, the current data of the page is validated and then logged to the current user document
    const handleSubmit = e => {
        // prevent auto redirect
        e.preventDefault();
        // validation
        if(validate()) {
            // this appends a new weight log to the logs subcollection in the current user document
            // upon completion, it alerts the user that the log was successful
            db.collection('users').doc(uid).collection('logs').add({
                weight: weight,
                bmi: bmi,
                date: firebase.firestore.Timestamp.fromDate(new Date())
            })
            .then(() => alert('log successful!'));
        }
        alert('end of function!');
    };

    // user interface
    return (
        <Fragment>
            <Header title='Weight and BMI Logging'/>
            <NavBar/>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Card>
                    <br/>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        <Grid item>
                            <TextField id="weight-in" label='Enter your new weight (lbs)' defaultValue={0} variant="outlined" onInput={e => setWeight(parseFloat(e.target.value))}/>
                        </Grid>
                        <Grid item>
                            <TextField id="bmi-in" label='Enter your new BMI' defaultValue={0} variant="outlined" onInput={e => setBMI(parseFloat(e.target.value))}/>
                        </Grid>
                        <Grid item>
                            <Button type='submit' variant="contained" color="primary">Log</Button>
                        </Grid>
                    </Grid>
                    <br/>
                </Card>
            </form>
        </Fragment>
    );
};

export default Logging;