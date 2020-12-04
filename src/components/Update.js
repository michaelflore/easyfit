import React, {Fragment, useRef, useState} from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect, useHistory } from "react-router-dom"
import {Card, Grid, makeStyles, TextField, Typography, Button, FormLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import firebase from "firebase/app";
import 'firebase/firestore';
import Header from "./Header";
import NavBar from "./NavBar";

const useStyles = makeStyles(theme => ({
    updateText: {
        backgroundColor: 'lightgray',
        borderRadius: '5px',
        textAlign: 'center',
        marginTop: '15px'
    }
}));

export default function Update() {
    const emailRef = useRef();
    const passwordRef = useRef();
    //Firebase Authentication Info and Functions
    const { currentUser, updatePassword, updateEmail, deleteUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [unit, setUnit] = useState(0);
    const history = useHistory();
    const MIN_ALEVEL = 1;
    const MAX_ALEVEL = 4;

    var user = firebase.auth().currentUser;
    const db = firebase.firestore();
    var id = user.uid;

    const styles = useStyles();

    function deleteAccount(e) {
        e.preventDefault();
        db.collection("users").doc(id).delete().then(r => console.log(r));
        deleteUser();
        history.push("/");
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fname = document.querySelector("#fname").value;
        const lname = document.querySelector("#lname").value;
        const age = document.querySelector("#age").value;
        const goal = document.querySelector("#goal").value;
        const activityLevel = document.querySelector("#activity").value;
        const promises = [];
        setLoading(true);
        setError("");

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        if(fname && fname !== ''){
          db.collection("users").doc(id).update({
            fname:fname
          });
        }

        if(lname && lname !== ''){
          db.collection("users").doc(id).update({
            lname:lname
          });
        }

        if(age && age !== ''){
            db.collection("users").doc(id).update({
              age:age
            });
          }

        if(goal && goal !== ''){
            db.collection("users").doc(id).update({
              goal:goal
            });
          }

        if(activityLevel && (Number.parseInt(activityLevel) < MIN_ALEVEL || Number.parseInt(activityLevel) > MAX_ALEVEL)) {
            db.collection("users").doc(id).update({
                activityLevel: Number.parseInt(activityLevel)
              });
        }

        db.collection("users").doc(id).update({
            gender: unit === 0 ? 'Male' : 'Female'
          });

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
                alert('account updated!');
                setUpdated(true);
            })
    }
    
    return (
        updated ? <Redirect to='/'/> :
        <Fragment>
            <Header title='Update Profile'/>
            <NavBar/>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                            <Grid item>
                                <TextField id='email' inputRef={emailRef} label='New Email' variant='outlined' type='email'/>
                            </Grid>
                            <Grid item>
                                <TextField id='password' inputRef={passwordRef} label='New Password' variant='outlined' type='password'/>
                            </Grid>
                            <Grid item>
                                <TextField id='fname' label='First Name' variant='outlined'/>
                            </Grid>
                            <Grid item>
                                <TextField id='lname' label='Last Name' variant='outlined'/>
                            </Grid>
                            <Grid item>
                                <TextField id='age' label='Age' variant='outlined'/>
                            </Grid>
                            <Grid item>
                                <TextField id='goal' label='Weight Goal (lbs)' variant='outlined'/>
                            </Grid>
                            <Grid item>
                                <TextField id='activity' label={`Activity Level (${MIN_ALEVEL.toString()}-${MAX_ALEVEL.toString()})`} variant='outlined'/>
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
