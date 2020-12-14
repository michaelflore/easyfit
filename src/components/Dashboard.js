import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import { Grid } from "@material-ui/core";
import NavBar from './NavBar';
import firebase from "firebase";

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import levelLabel from '../logic/activitylevelmap';

const Dashboard = () => {
    // holds all users from database
    let [users, setUsers] = useState([]);
    // holds page load status
    const [isLoaded, setIsLoaded] = useState(false);
    // titles of our dashboard table
    const titles = ['First Name', 'Last Name', 'Height (in)', 'Weight (lbs)', 'Age', 'Weight Goal (lbs)', 'Last Login', 'Gender', 'Activity Level', 'Edit', 'Logs'];
    // database connection
    const db = firebase.firestore();

    const fetchUserInfo = async () => {
        if(!isLoaded) {
            // fetch all users from database
            let data = await db.collection('users').get();
            // transform all user data into a readable object for later data manipulation
            setUsers(data.docs.map( doc => ({ ...doc.data(), id: doc.id }) ));
            // finish loading
            setIsLoaded(true);
        }
    };

    useEffect(() => {
       fetchUserInfo();
    });

    return (
        <Fragment>
            <Header title="Admin Dashboard"/>
            <NavBar/>
            {/*center the table*/}
            <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: '64px'}}>
                {/*Create the actual table*/}
                <Grid item xs={9}>
                    <Table size="small" style={{ backgroundColor: '#404040' }}>
                        <TableHead>
                            {/*Column Headers*/}
                            <TableRow>
                                {titles.map((title) => (
                                    <TableCell align="center" key={title}>
                                            {title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((user) => {
                                    return (
                                        <Fragment key={user.fname}>
                                            <TableRow>
                                                {/*User data display for each user*/}
                                                <TableCell align="center">{user.fname}</TableCell>
                                                <TableCell align="center">{user.lname}</TableCell>
                                                <TableCell align="center">{user.height}</TableCell>
                                                <TableCell align="center">{user.weight}</TableCell>
                                                <TableCell align="center">{user.age}</TableCell>
                                                <TableCell align="center">{user.goal}</TableCell>
                                                <TableCell align="center">{user.loggedin.toDate().toString()}</TableCell>
                                                <TableCell align="center">{user.gender}</TableCell>
                                                <TableCell align="center">{levelLabel.get(user.activityLevel)}</TableCell>
                                                {/*Link to edit page and send current user data as a prop*/}
                                                <TableCell>
                                                    <Link to={{ pathname: '/edit-user', item: user }} style={{ color: 'black' }}>
                                                        Edit User
                                                    </Link>
                                                </TableCell>
                                                {/*Same as above but with viewing a user's progress logs*/}
                                                <TableCell>
                                                    <Link to={{ pathname: '/progress', item: {uid: user.userid, userName: user.fname} }} style= {{ color: 'black' }}>
                                                        View
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Dashboard;