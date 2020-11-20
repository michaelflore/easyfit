import React, { useRef, Fragment, useState } from "react";
import { Card, Button, Grid, Typography, TextField, makeStyles } from "@material-ui/core";
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
    }
}));

const SignUp = () => {

    //conecting to the database
    const db = firebase.firestore();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const styles = useStyles();

    let [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            //getting user info
            const fname = document.querySelector("#fname").value;
            const lname = document.querySelector("#lname").value;
            const height = document.querySelector("#height").value;
            const weight = document.querySelector("#weight").value;
            const age = document.querySelector("#age").value;
            const goal = document.querySelector('#goal').value;

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
                loggedin: firebase.firestore.Timestamp.fromDate(new Date())
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
        <Card>
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