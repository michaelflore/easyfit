import React, { useRef, Fragment, useState } from "react";
import { Card, Button, Grid, Typography, TextField, makeStyles, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from './Header';
import firebase from "firebase/app";
import 'firebase/firestore';
import { validate } from '../logic/logginglogic';

// css styling for this page
const useStyles = makeStyles(theme => ({
    updateText: {
        backgroundColor: 'lightgray',
        borderRadius: '5px',
        textAlign: 'center',
        margin: '15px',
        color: 'black',
        padding: '0px 5px 0px 5px'
    },
    card: {
        marginTop: '70px',
        padding: '25px'
    }
}));

const SignUp = () => {
    //conecting to the database
    const db = firebase.firestore();
    // input form references for email and password
    const emailRef = useRef();
    const passwordRef = useRef();
    // signup function
    const { signup } = useAuth();
    // load in styles
    const styles = useStyles();
    // array of activity levels
    let activityLevels = [1, 2, 3, 4];

    // initialize state of all form inputs
    let [submitted, setSubmitted] = useState(false);
    let [unit, setUnit] = useState(0);
    let [alevel, setALevel] = useState(activityLevels[0]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('');

    // validate our input before submission
    const validateInput = () => {
        // check if fields are empty
        if(fname === '' || lname === '' || height === '' || weight === '' || age === '' || goal === '') {
            alert('One or more fields have been left blank, please enter all values.');
            return false;
        // check if numeric fields are valid
        } else if(!(validate(height, weight) && validate(age, goal))) {
            alert('Error: weight, height, age, and weight goal must all be valid decimal values');
            return false;
        } else {
            return true;
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if(validateInput()) {
                //creating user with google authentication
                await signup(emailRef.current.value, passwordRef.current.value);
                //getting current user
                let user = firebase.auth().currentUser;
                //inserting user data into data base
                db.collection("users").doc(user.uid).set({
                fname: fname,
                lname: lname,
                height: height,
                weight: weight,
                age: age,
                goal: goal,
                isAdmin: false,
                loggedin: firebase.firestore.Timestamp.fromDate(new Date()),
                userid: user.uid,
                activityLevel: alevel,
                gender: unit === 0 ? 'Male' : 'Female'
                }).then(setSubmitted(true));
            }
        } catch(e) {
            console.log(e);
            alert('Failed, make sure password is strong.');
        }
    }

    return (
        submitted ? <Redirect to='/login'/> :
        <Fragment>
        <Header title='User Signup'/>
        <Card className={styles.card}>
            <form onSubmit={handleSubmit}>
            <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                {/*Input fields*/}
                <Grid item>
                    <Typography variant='h3'>Create an Account</Typography>
                </Grid>
                <Grid item>
                    <TextField id='email' inputRef={emailRef} label='Email' variant='outlined' type='email'/>
                </Grid>
                <Grid item>
                    <TextField id='password' inputRef={passwordRef} label='Password' variant='outlined' type='password'/>
                </Grid>
                <Grid item>
                    <TextField id='fname' label='First Name' variant='outlined' onInput={e => setFname(e.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id='lname' label='Last Name' variant='outlined' onInput={e => setLname(e.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id='height' label='Height (in)' variant='outlined' onInput={e => setHeight(parseFloat(e.target.value))}/>
                </Grid>
                <Grid item>
                    <TextField id='weight' label='Weight (lbs)' variant='outlined' onInput={e => setWeight(parseFloat(e.target.value))}/>
                </Grid>
                <Grid item>
                    <TextField id='age' label='Age' variant='outlined' onInput={e => setAge(parseInt(e.target.value))}/>
                </Grid>
                <Grid item>
                    <TextField id='goal' label='Weight Goal (lbs)' variant='outlined' onInput={e => setGoal(parseFloat(e.target.value))}/>
                </Grid>
                {/*Dropdown menu for activity levels*/}
                <Grid item>
                    <Select onChange={e => setALevel(Number.parseInt(e.target.value))} value={alevel}>
                        {activityLevels.map(level => {
                            return <MenuItem value={level} key={level}>{level}</MenuItem>
                        })}
                    </Select>
                </Grid>
                {/*Radio button group for gender*/}
                <Grid item>
                    <FormLabel>Select Gender</FormLabel>
                    <RadioGroup name="units" aria-label="Select Units" value={unit} onChange={e => setUnit(Number(e.target.value))}>
                        <FormControlLabel key="male" value={0} control={<Radio/>} label="Male"/>
                        <FormControlLabel key="female" value={1} control={<Radio/>} label="Female"/>
                    </RadioGroup>
                </Grid>
                <Grid item>
                    <Button type="submit" variant='contained' color='primary'>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
            </form>
            <Typography className={styles.updateText}>Already have an account? <Link to="/login">Login</Link></Typography>
        </Card>
    </Fragment>
    );
};

export default SignUp;