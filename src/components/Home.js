import React, {Fragment, useState, useEffect} from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import { Card, Grid, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import 'firebase/firestore';

const Home = () => {
    // initializes user data display array to pending values
    let [user, setUser] = useState(['', '', '', '', '']);
    // titles to indicate what data is being displayed
    let titles = ['Name', 'Height (in)', 'Weight (lbs)', 'Age', 'Weight Goal (lbs)'];
    let uid = firebase.auth().currentUser.uid;
    const db = firebase.firestore();

    /*
    * This function is where user info is acquired from the database. Some important notes are below.
    * This function MUST BE INSIDE OF THE COMPONENT OR ELSE IT WILL NOT WORK
    * This function MUST BE CALLED by useEffect, as functional components cannot be declared async
    */
    const fetchUserInfo = async () => {
        try {
            let query = await db.collection('users').doc(uid).get();
            let u = query.data();
            setUser([`${u.fname} ${u.lname}`, u.height, u.weight, u.age, u.goal]);
        } catch(err) {
            console.log(err);
        }
    };

    // Call the asyncronous query ASAP and update user information.
    useEffect(() => {
        fetchUserInfo();
    });

    // The map function below essentially converts every element in titles into a grid item.
    // This is another reason I love react hooks. The page will update as soon as our user info query is done,
    // and call the function again.
    return (
        <Fragment>
            <Header title="User Dashboard"/>
            <NavBar/>
            <Card>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    {titles.map((item, i) => {
                    return <Grid item key={item}>
                            <Typography variant='h4'>{`${item}: ${user[i]}`}</Typography>
                           </Grid>;
                    })}
                </Grid>
            </Card>
        </Fragment>
    );
};

export default Home;