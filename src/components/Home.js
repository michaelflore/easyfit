import React, {Fragment, useState, useEffect} from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import 'firebase/firestore';
import fetchUserInfo from '../logic/homelogic';

const useStyles = makeStyles(theme => ({
    cardSpace: {
        padding: '25px'
    }
}));

const Home = () => {
    // initializes user data display array to pending values
    let [user, setUser] = useState(['', '', '', '', '']);
    let [isLoaded, setIsLoaded] = useState(false);
    // titles to indicate what data is being displayed
    let titles = ['Name', 'Height (in)', 'Weight (lbs)', 'Age', 'Weight Goal (lbs)', 'Gender', 'Activity Level'];
    let uid = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const styles = useStyles();

    // Call the asyncronous query ASAP and update user information.
    useEffect(() => {
        fetchUserInfo(db, uid, isLoaded, setIsLoaded, setUser);
    }, [db, uid, isLoaded]);

    // The map function below essentially converts every element in titles into a grid item.
    // This is another reason I love react hooks. The page will update as soon as our user info query is done,
    // and call the function again.
    return (
        <Fragment>
            <Header title="User Dashboard"/>
            <NavBar/>
            <Card className={styles.cardSpace}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    {
                        titles.map((item, i) => {
                            return <Grid item key={item}>
                            <Typography variant='h4'>{`${item}: ${user[i]}`}</Typography>
                           </Grid>;
                        })
                    }
                </Grid>
            </Card>
        </Fragment>
    );
};

export default Home;