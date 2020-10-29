import React, { useRef, Fragment } from "react";
import { Card, Button, Grid, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from './Header';

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
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