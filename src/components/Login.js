import React, {useRef, Fragment, useState, useEffect} from "react";
import { Card, Button, Typography, TextField, Grid, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from './Header';

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
        padding: '25px'
    }
}));

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const styles = useStyles();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch(e) {
            console.log(e);
            alert('Failed to login');
        }
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Fragment>
            <Header title='User Login'/>
            <Card className={styles.card}>
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