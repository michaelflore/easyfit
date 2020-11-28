import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import { Card, Grid } from "@material-ui/core";
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
import {useHistory} from "react-router-dom";

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

    //Update
    const onEdit = () => {
        db.collection('users').doc(props.location.item.id).update({
            fname: fname,
            lname: lname,
            height: height,
            weight: weight,
            age: age,
            goal: goal
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
    }, []);

    return (
        <Fragment>
            <Header title="Admin Dashboard"/>
            <NavBar/>
                <Grid container direction="column" justify="center" alignItems="center" spacing={1} md={9} style={{marginTop: '64px'}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {titles.map((title) => (
                                    <TableCell align="center" key={title}>
                                        <TableSortLabel>
                                            {title}
                                        </TableSortLabel>
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
                                <TableCell align='center'><input value={alevel} onChange={e => setALevel(Number.parseInt(e.target.value))}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Button onClick={onEdit}>Update</Button>
                                    <Button onClick={onDelete}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
        </Fragment>
    );
};

export default Edit;