import React, { useRef, Fragment } from "react";
import { Card, Button, Typography, TextField, Grid, makeStyles } from "@material-ui/core";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from './Header';
import firebase from 'firebase/app';

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

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const history = useHistory();
    const styles = useStyles();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            alert('Failed to login');
        }
    }

    const loggedIn = firebase.auth().currentUser;

    return (
        loggedIn ? <Redirect to='/'/> :
        <Fragment>
            <Header title='User Login'/>
            <Card>
                <form onSubmit={handleSubmit}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                    <Grid item>
                        <Typography variant='h3'>Log In</Typography>
                    </Grid>
                    <Grid item>
                        <TextField id='email' inputRef={emailRef} label='Email' variant='outlined' type='email'/>
                    </Grid>
                    <Grid item>
                        <TextField id='password' inputRef={passwordRef} label='Password' variant='outlined' type='password'/>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant='contained' color='primary'>
                            Login
                        </Button>
                    </Grid>
                </Grid>
                </form>
                <Typography className={styles.updateText}>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
            </Card>
        </Fragment>
    );
};

export default Login;