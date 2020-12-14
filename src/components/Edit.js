import React, {Fragment, useState } from "react";
import Header from "./Header";
import { Grid, MenuItem, Select } from "@material-ui/core";
import NavBar from './NavBar';
import firebase from "firebase";
import Button from "@material-ui/core/Button";

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link, useHistory} from "react-router-dom";
import { validate } from '../logic/logginglogic';

const Edit = (props) => {
    // array of table column headers
    const titles = ['First Name', 'Last Name', 'Height (in)', 'Weight (lbs)', 'Age', 'Weight Goal (lbs)', 'Activity Level'];
    // database connection
    const db = firebase.firestore();
    // routing
    const history = useHistory();

    // Set the initial state for each field
    let [fname, setFirstName] = useState(props.location.item.fname);
    let [lname, setLastName] = useState(props.location.item.lname);
    let [height, setHeight] = useState(props.location.item.height);
    let [weight, setWeight] = useState(props.location.item.weight);
    let [age, setAge] = useState(props.location.item.age);
    let [goal, setGoal] = useState(props.location.item.goal);
    let [alevel, setALevel] = useState(props.location.item.activityLevel);
    let activityLevels = [1, 2, 3, 4];

    // This function handles the form submission
    const onEdit = () => {
        // Inside of this update query we validate each individual user field before submitting
        db.collection('users').doc(props.location.item.id).update({
            fname: fname !== '' ? fname : props.location.item.fname,
            lname: lname !== '' ? lname : props.location.item.lname,
            height: validate(height, height) ? height : props.location.item.height,
            weight: validate(weight, weight) ? weight : props.location.item.weight,
            age: validate(age, age) ? age : props.location.item.age,
            goal: validate(goal, goal) ? goal : props.location.item.goal,
            activityLevel: alevel
        });
        // return to the admin dashboard
        history.push("/dashboard");
    };

    // Handles account deletion
    const onDelete = () => {
        // Simple delete query for the document with the selected user
        db.collection('users').doc(props.location.item.id).delete();
        // return to the admin dashboard
        history.push("/dashboard");
    };

    return (
        <Fragment>
            <Header title="Admin Dashboard"/>
            <NavBar/>
            <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: '64px'}}>
                <Grid item xs={9}>
                    <Table size="small" style={{ backgroundColor: '#404040' }}>
                        {/*Column Headers*/}
                        <TableHead>
                            <TableRow>
                                {titles.map((title) => (
                                    <TableCell align="center" key={title}>
                                            {title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {/*Generate user input fields for every field we want to update*/}
                                <TableCell align="center"><input value={fname} onChange={e => {setFirstName(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={lname} onChange={e => {setLastName(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={height} onChange={e => {setHeight(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={weight} onChange={e => {setWeight(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={age} onChange={e => {setAge(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={goal} onChange={e => {setGoal(e.target.value);}}/></TableCell>
                                {/*Dropdown menu for activity level*/}
                                <TableCell align='center'>
                                    <Select onChange={e => setALevel(Number.parseInt(e.target.value))} value={alevel}>
                                        {activityLevels.map(level => {
                                            return <MenuItem value={level} key={level}>{level}</MenuItem>
                                        })}
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {/*Edit/delete buttons*/}
                                <TableCell colSpan={7} align="center">
                                    <Button onClick={onEdit}>Update</Button>
                                    <Button onClick={onDelete}>Delete All</Button>
                                    <Link to="/dashboard" style={{ color: 'black' }}>Cancel</Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Edit;