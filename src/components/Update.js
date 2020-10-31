import React, {Fragment, useRef, useState} from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button";
import {Card, Grid, TextField, Typography} from "@material-ui/core";
import firebase from "firebase/app";
import 'firebase/firestore';

export default function Update() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    var user = firebase.auth().currentUser;
    const db = firebase.firestore();
    var id = user.uid;


    function handleSubmit(e) {
        e.preventDefault();
        const fname = document.querySelector("#fname").value;
        const lname = document.querySelector("#lname").value;
        const promises = [];
        setLoading(true);
        setError("");

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        if(fname){
          db.collection("users").doc(id).update({
            fname:fname
          });
        }

        if(lname){
          db.collection("users").doc(id).update({
            lname:lname
          });
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }
    
    return (
        <Fragment>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                            <Grid item>
                                <Typography variant='h3'>Update Profile</Typography>
                            </Grid>
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
                                <Button type="submit" variant='contained' color='primary'>
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Link to="/">Cancel</Link>
                </Card>
        </Fragment>
    )
}
