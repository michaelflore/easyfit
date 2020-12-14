import React, {useRef, Fragment, useState, useEffect} from "react";
import { Card, Button, Grid, Typography, TextField, makeStyles, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from './Header';
import firebase from "firebase/app";
import 'firebase/firestore';
import { validate } from '../logic/logginglogic';

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
    //connecting to the database
    const db = firebase.firestore();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { signup } = useAuth();
    const history = useHistory();
    const styles = useStyles();
    let activityLevels = [1, 2, 3, 4];

    let [loading, setLoading] = useState(false);
    let [unit, setUnit] = useState(0);
    let [alevel, setALevel] = useState(activityLevels[0]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('');

    const validateInput = () => {
        if(fname === '' || lname === '' || height === '' || weight === '' || age === '' || goal === '') {
            alert('One or more fields have been left blank, please enter all values.');
            return false;
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
            setLoading(true);
            if(validateInput()) {
                //creating user with google authentication
                await signup(emailRef.current.value, passwordRef.current.value);
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
                });
            }
            history.push("/");
        } catch(e) {
            console.log(e);
            alert('Failed, make sure password is strong.');
        }
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
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