import React, {Fragment, useEffect, useRef, useState} from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {Card, Grid, makeStyles, TextField, Typography, Button, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem } from "@material-ui/core";
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

    // fetch all values from input form
    const fnameRef = useRef();
    const lnameRef = useRef();
    const ageRef = useRef();
    const goalRef = useRef();

    let activityLevels = [1, 2, 3, 4];
    //Firebase Authentication Info and Functions
    const { currentUser, updatePassword, updateEmail, updateFirstName, updateLastName,
        updateAge, updateGoal, updateLevel, deleteUser, deleteUserCol } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [unit, setUnit] = useState(0);
    const [alevel, setALevel] = useState(activityLevels[0]);
    const history = useHistory();

    const styles = useStyles();

    function deleteAccount(e) {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete your account?')) {
            deleteUserCol();
            deleteUser();
            history.push("/login");
        }
    }

    function handleSubmit(e) {
        // prevent page from changing automatically on submit
        e.preventDefault();

        // array that holds all promises to be executed
        const promises = [];

        setLoading(true);
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
        if(fnameRef.current.value && fnameRef.current.value !== ''){
          promises.push(updateFirstName(fnameRef.current.value));
        }

        if(lnameRef.current.value && lnameRef.current.value !== ''){
          promises.push(updateLastName(lnameRef.current.value));
        }

        if(ageRef.current.value && validate(parseInt(ageRef.current.value), parseInt(ageRef.current.value)) ){
            promises.push(updateAge(ageRef.current.value));
        }

        if(goalRef.current.value && validate(parseInt(goalRef.current.value), parseInt(goalRef.current.value))){
            promises.push(updateGoal(goalRef.current.value));
        }

        promises.push(updateLevel(unit, alevel));
        
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
                // setLoading(false);
            })
    }

    useEffect(() => {
        setLoading(false);
    }, []);
    
    return (
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
                                <TextField id='fname' inputRef={fnameRef} label='First Name' variant='outlined' defaultValue={currentUser.lname} />
                            </Grid>
                            <Grid item>
                                <TextField id='lname' inputRef={lnameRef} label='Last Name' variant='outlined' defaultValue={currentUser.lname}/>
                            </Grid>
                            <Grid item>
                                <TextField id='age' inputRef={ageRef} label='Age' variant='outlined' defaultValue={currentUser.age}/>
                            </Grid>
                            <Grid item>
                                <TextField id='goal' inputRef={goalRef} label='Weight Goal (lbs)' variant='outlined' defaultValue={currentUser.goal}/>
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
