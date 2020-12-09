import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import { Card, Grid, MenuItem, Select } from "@material-ui/core";
import NavBar from './NavBar';
import firebase from "firebase";
import Button from "@material-ui/core/Button";

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {Link, useHistory} from "react-router-dom";

const Edit = (props) => {

    let [users, setUser] = useState([]);

    const titles = ['First Name', 'Last Name', 'Height (in)', 'Weight (lbs)', 'Age', 'Weight Goal (lbs)', 'Activity Level'];
    const db = firebase.firestore();

    const history = useHistory();

    //Set the initial state for each field
    let [fname, setFirstName] = useState(props.location.item.fname);
    let [lname, setLastName] = useState(props.location.item.lname);
    let [height, setHeight] = useState(props.location.item.height);
    let [weight, setWeight] = useState(props.location.item.weight);
    let [age, setAge] = useState(props.location.item.age);
    let [goal, setGoal] = useState(props.location.item.goal);
    let [alevel, setALevel] = useState(props.location.item.activityLevel);
    let activityLevels = [1, 2, 3, 4];

    //Update
    const onEdit = () => {
        db.collection('users').doc(props.location.item.id).update({
            fname: fname,
            lname: lname,
            height: height,
            weight: weight,
            age: age,
            goal: goal,
            activityLevel: alevel
        });
        history.push("/dashboard");
    };

    //Delete
    const onDelete = () => {
        db.collection('users').doc(props.location.item.id).delete();
        history.push("/dashboard");
    };

    const fetchUserInfo = async () => {
        let data = await db.collection('users').get();
        setUser(data.docs.map( doc => ({ ...doc.data(), id: doc.id }) ));
    };

    useEffect(() => {
        fetchUserInfo();
    });

    return (
        <Fragment>
            <Header title="Admin Dashboard"/>
            <NavBar/>
            <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: '64px'}}>
                <Grid item xs={9}>
                    <Table size="small" style={{ backgroundColor: '#404040' }}>
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
                                <TableCell align="center"><input value={fname} onChange={e => {setFirstName(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={lname} onChange={e => {setLastName(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={height} onChange={e => {setHeight(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={weight} onChange={e => {setWeight(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={age} onChange={e => {setAge(e.target.value);}}/></TableCell>
                                <TableCell align="center"><input value={goal} onChange={e => {setGoal(e.target.value);}}/></TableCell>
                                <TableCell align='center'>
                                    <Select onChange={e => setALevel(Number.parseInt(e.target.value))} value={alevel}>
                                        {activityLevels.map(level => {
                                            return <MenuItem value={level} key={level}>{level}</MenuItem>
                                        })}
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
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