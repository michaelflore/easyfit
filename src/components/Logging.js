import React, { Fragment, useState } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import { Card, Grid, TextField, Button, makeStyles, Select, MenuItem } from '@material-ui/core';
import firebase from "firebase/app";
import 'firebase/firestore';
import { logWeight } from '../logic/logginglogic';

const useStyles = makeStyles(theme => ({
    cardSpace: {
        marginBottom: '10px',
        padding: '25px'
    }
}));

const Logging = () => {
    let activityLevels = [1, 2, 3, 4];
    // initial state for weight and bmi
    const [weight, setWeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [alevel, setALevel] = useState(activityLevels[0]);
    // current user id
    const uid = firebase.auth().currentUser.uid;
    // database connection
    const db = firebase.firestore();
    const styles = useStyles();

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
                            <Select onChange={e => setALevel(Number.parseInt(e.target.value))} value={alevel}>
                                {activityLevels.map(level => {
                                    return <MenuItem value={level} key={level}>{level}</MenuItem>
                                })}
                            </Select>
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