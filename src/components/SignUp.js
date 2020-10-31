import React, { useRef, Fragment } from "react";
import { Card, Button, Grid, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from './Header';
import firebase from "firebase/app";
import 'firebase/firestore';

const SignUp = () => {

    //conecting to the database
    const db = firebase.firestore();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            //creating user with google authenication
            await signup(emailRef.current.value, passwordRef.current.value);
            //getting user info
            const fname = document.querySelector("#fname").value;
            const lname = document.querySelector("#lname").value;
            const height = document.querySelector("#height").value;
            const weight = document.querySelector("#weight").value;
            const age = document.querySelector("#age").value;

            //getting current user
            var user = firebase.auth().currentUser;

            //inserting user data into data base
            db.collection("users").doc(user.uid).set({
              fname: fname,
              lname: lname,
              height: height,
              weight: weight,
              age: age
            })

        } catch {
            alert('Failed, make sure password is strong.');
        }
    }

    return (
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
                    <TextField id='height' label='Height' variant='outlined'/>
                </Grid>
                <Grid item>
                    <TextField id='weight' label='Weight' variant='outlined'/>
                </Grid>
                <Grid item>
                    <TextField id='age' label='Age' variant='outlined'/>
                </Grid>
                <Grid item>
                    <Button type="submit" variant='contained' color='primary'>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
            </form>
            <Fragment>
                Already have an account? <Link to="/login">Login</Link>
            </Fragment>
        </Card>
    </Fragment>
    );
};

export default SignUp;