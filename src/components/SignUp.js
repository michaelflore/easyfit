import React, { useRef, Fragment, useState } from "react";
import { Card, Button, Grid, Typography, TextField, makeStyles, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from './Header';
import firebase from "firebase/app";
import 'firebase/firestore';

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
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const styles = useStyles();
    let activityLevels = [1, 2, 3, 4];

    let [submitted, setSubmitted] = useState(false);
    let [unit, setUnit] = useState(0);
    let [alevel, setALevel] = useState(activityLevels[0]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            //getting user info
            let fname = document.querySelector("#fname").value;
            let lname = document.querySelector("#lname").value;
            let height = document.querySelector("#height").value;
            let weight = document.querySelector("#weight").value;
            let age = document.querySelector("#age").value;
            let goal = document.querySelector('#goal').value;

            if(fname === '' || lname === '' || height === '' || weight === '' || age === '' || goal === '') {
                alert('One or more fields have been left blank, please enter all values.');
            } else {
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
                    <TextField id='fname' label='First Name' variant='outlined'/>
                </Grid>
                <Grid item>
                    <TextField id='lname' label='Last Name' variant='outlined'/>
                </Grid>
                <Grid item>
                    <TextField id='height' label='Height (in)' variant='outlined'/>
                </Grid>
                <Grid item>
                    <TextField id='weight' label='Weight (lbs)' variant='outlined'/>
                </Grid>
                <Grid item>
                    <TextField id='age' label='Age' variant='outlined'/>
                </Grid>
                <Grid item>
                    <TextField id='goal' label='Weight Goal (lbs)' variant='outlined'/>
                </Grid>
                <Grid item>
                    <Select onChange={e => setALevel(Number.parseInt(e.target.value))} value={alevel}>
                        {activityLevels.map(level => {
                            return <MenuItem value={level} key={level}>{level}</MenuItem>
                        })}
                    </Select>
                </Grid>
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