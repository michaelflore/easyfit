import React, { Fragment, useState, useEffect } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import { Card, Grid, Typography, TextField, Button } from '@material-ui/core';
import firebase from "firebase/app";
import 'firebase/firestore';

const Logging = () => {
    const [weight, setWeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const uid = firebase.auth().currentUser.uid;
    const db = firebase.firestore();

    // debug
    useEffect(() => {
        console.log(weight);
        console.log(bmi);
    }, [weight, bmi]);

    const isFloat = n => {
        return Number(n) === n && n % 1 !== 0;
    }

    const validate = () => {
        if(!(isFloat(weight) || Number.isInteger(weight)) || !(isFloat(bmi) || Number.isInteger(bmi))) {
            alert("Error, use must enter a valid weight and bmi.");
            return false;
        } else {
            return true;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        // validation
        if(validate()) {
            let timestamp = Date.now();
            console.log(timestamp);
            // logging
            db.collection('users').doc(uid).collection('logs').add({
                weight: weight,
                bmi: bmi,
                date: firebase.firestore.Timestamp.fromDate(new Date())
            })
            .then(() => console.log('log successful!'));
        }
        alert('end of function!');
    };

    return (
        <Fragment>
            <Header title='User Logging Screen'/>
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