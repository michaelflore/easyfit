import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import { Card, Grid } from "@material-ui/core";
import NavBar from './NavBar';
import firebase from "firebase";

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {Link} from "react-router-dom";

const Dashboard = () => {

    let [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const titles = ['First Name', 'Last Name', 'Height (in)', 'Weight (lbs)', 'Age', 'Weight Goal (lbs)', 'Last Login',  'Edit', 'Logs'];
    const db = firebase.firestore();

    const fetchUserInfo = async () => {
        if(!isLoaded) {
            let data = await db.collection('users').get();
            setUsers(data.docs.map( doc => ({ ...doc.data(), id: doc.id }) ));
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
            <Card>
                <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                    <Table>
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
                            {
                                users.map((user) => {
                                    return (
                                        <Fragment>
                                            <TableRow key={user.fname}>
                                                <TableCell align="center">{user.fname}</TableCell>
                                                <TableCell align="center">{user.lname}</TableCell>
                                                <TableCell align="center">{user.height}</TableCell>
                                                <TableCell align="center">{user.weight}</TableCell>
                                                <TableCell align="center">{user.age}</TableCell>
                                                <TableCell align="center">{user.goal}</TableCell>
                                                <TableCell align="center">{user.loggedin.toDate().toString()}</TableCell>
                                                <TableCell>
                                                    <Link to={{ pathname: '/edit-user', item: user }} style={{ color: 'blue' }}>
                                                        Edit User
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={{ pathname: '/progress', item: {uid: user.userid, userName: user.fname} }} style= {{ color: 'blue' }}>
                                                        View Progress Logs
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
            </Card>
        </Fragment>
    );
};

export default Dashboard;