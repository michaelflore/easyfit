import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Drawer, makeStyles} from "@material-ui/core";
import firebase from "firebase/app";
import 'firebase/firestore';

// css styling for the component
const useStyles = makeStyles(theme => ({
    navPane: {
        backgroundColor: 'lightgrey',
        outline: '2px solid black',
        borderRadius: '3px',
        marginBottom: '15px'
    }
}));

const NavBar = () => {
    // loading status
    const [loaded, setLoaded] = useState(false);
    // user admin status check
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    // load in styling
    const styles = useStyles();
    // current user id
    let uid = firebase.auth().currentUser.uid;
    // database connection
    const db = firebase.firestore();

    const checkIsAdmin = async () => {
        if(!loaded) {
            try {
                // get user data
                let u = await db.collection('users').doc(uid).get();
                // get isAdmin from user doc
                setUserIsAdmin(u.data().isAdmin);
                // finish loading
                setLoaded(true);
            } catch (e) {
                console.log(e);
                alert('Error while refreshing page');
                return <Redirect to='/'/>;
            }
        }
    };

    useEffect(() => {
        checkIsAdmin();
    });
    // The below code is a list of links to other pages nested inside of a drawer component anchored to the left side of the page
    return (
            <Drawer variant="permanent" anchor="left" open={true} className={styles.drawer} classes={{
                paper: styles.drawerPaper,
            }}>
                    <List>
                        {/*this tab is repeated bc the app bar cuts the top tab off*/}
                        <Link to="/">
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>
                        <Link to="/">
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>
                        {userIsAdmin &&
                            <Link to='/dashboard'>
                                <ListItem button className={styles.navPane}>
                                        <ListItemText primary={"Admin Dashboard"}/>
                                </ListItem>
                            </Link>
                        }
                        <Link to="/bmi">
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"BMI Calculator"} />
                            </ListItem>
                        </Link>
                        <Link to="/log">
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Weight Logging"} />
                            </ListItem>
                        </Link>
                        <Link to={{ pathname: '/progress', item: {uid: uid, userName: 'You'} }}>
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Progress Tracking"} />
                            </ListItem>
                        </Link>
                        <Link to='/macro'>
                            <ListItem button className={styles.navPane}>
                                <ListItemText primary={"Macro Display"}/>
                            </ListItem>
                        </Link>
                    </List>
            </Drawer>

    );
};

export default NavBar;