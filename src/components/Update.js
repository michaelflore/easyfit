import React, {Fragment, useRef, useState} from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect, useHistory } from "react-router-dom"
import {Card, Grid, makeStyles, TextField, Typography, Button, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem } from "@material-ui/core";
import firebase from "firebase/app";
import 'firebase/firestore';
import Header from "./Header";
import NavBar from "./NavBar";
import { validate } from '../logic/logginglogic';

const useStyles = makeStyles(theme => ({
    updateText: {
        backgroundColor: 'lightgray',
        borderRadius: '5px',
        textAlign: 'center',
        marginTop: '15px'
    },
    card: {
        marginTop: '70px',
        padding: '15px'
    }
}));

export default function Update() {
    const emailRef = useRef();
    const passwordRef = useRef();
    let activityLevels = [1, 2, 3, 4];
    //Firebase Authentication Info and Functions
    const { currentUser, updatePassword, updateEmail, deleteUser } = useAuth();
    const [error, setError] = useState("");
    const [updated, setUpdated] = useState(false);
    const [unit, setUnit] = useState(0);
    const [alevel, setALevel] = useState(activityLevels[0]);
    const history = useHistory();

    var user = firebase.auth().currentUser;
    const db = firebase.firestore();
    var id = user.uid;

    const styles = useStyles();

    function deleteAccount(e) {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete your account?')) {
            db.collection("users").doc(id).delete().then(r => console.log(r));
            deleteUser();
            history.push("/");
        }
    }

    function handleSubmit(e) {
        // prevent page from changing automatically on submit
        e.preventDefault();

        // fetch all values from input form
        const fname = document.querySelector("#fname").value;
        const lname = document.querySelector("#lname").value;
        const age = document.querySelector("#age").value;
        const goal = document.querySelector("#goal").value;

        // array that holds all promises to be executed
        const promises = [];

        // mounting variable(s)
        setError("");

        // update email and password
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        // validate and update all user info
        if(fname && fname !== ''){
          promises.push(db.collection("users").doc(id).update({
            fname:fname
          }));
        }

        if(lname && lname !== ''){
          promises.push(db.collection("users").doc(id).update({
            lname:lname
          }));
        }

        if(age && validate(parseInt(age), parseInt(age))){
            promises.push(db.collection("users").doc(id).update({
              age:age
            }));
          }

        if(goal && validate(parseInt(goal), parseInt(goal))){
            promises.push(db.collection("users").doc(id).update({
              goal:goal
            }));
          }

        promises.push(db.collection("users").doc(id).update({
            gender: unit === 0 ? 'Male' : 'Female',
            activityLevel: alevel
          }));
        
        // resolve all promises
        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                alert('Redirecting...');
                setUpdated(true);
            })
    }
    
    return (
        updated ? <Redirect to='/'/> :
        <Fragment>
            <Header title='Update Profile'/>
            <NavBar/>
                <Card className={styles.card}>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                            <Grid item>
                                <TextField id='email' inputRef={emailRef} label='New Email' variant='outlined' type='email' defaultValue={currentUser.email}/>
                            </Grid>
                            <Grid item>
                                <TextField id='password' inputRef={passwordRef} label='New Password' variant='outlined' type='password'/>
                            </Grid>
                            <Grid item>
                                <TextField id='fname' label='First Name' variant='outlined' defaultValue={currentUser.fname}/>
                            </Grid>
                            <Grid item>
                                <TextField id='lname' label='Last Name' variant='outlined' defaultValue={currentUser.lname}/>
                            </Grid>
                            <Grid item>
                                <TextField id='age' label='Age' variant='outlined' defaultValue={currentUser.age}/>
                            </Grid>
                            <Grid item>
                                <TextField id='goal' label='Weight Goal (lbs)' variant='outlined' defaultValue={currentUser.goal}/>
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
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Button onClick={deleteAccount}>Delete Account</Button>
                    <Link to="/">
                        <Typography className={styles.updateText}>Cancel</Typography>
                    </Link>
                </Card>
        </Fragment>
    )
}
