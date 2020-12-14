import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Drawer, Hidden, makeStyles, Typography} from "@material-ui/core";
import firebase from "firebase/app";
import 'firebase/firestore';
import {useAuth} from "../contexts/AuthContext";

const useStyles = makeStyles(theme => ({
    navPane: {
        backgroundColor: 'lightgrey',
        outline: '2px solid black',
        borderRadius: '3px',
        marginBottom: '15px'
    }
}));

const NavBar = () => {
    const { currentUser } = useAuth();

    const [loaded, setLoaded] = useState(false);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const styles = useStyles();

    let uid = currentUser.uid;
    const db = firebase.firestore();

    const checkIsAdmin = async () => {
        if(!loaded) {
            try {
                let u = await db.collection('users').doc(uid).get();
                setUserIsAdmin(u.data().isAdmin);
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
    }, []);

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