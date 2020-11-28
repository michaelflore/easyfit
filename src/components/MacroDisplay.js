import React, { Fragment, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Header from './Header';
import NavBar from './NavBar';
import { Typography, Grid, Card, makeStyles } from '@material-ui/core';
import generateSuggestion from '../logic/MacroGenerator';
import levelLabel from '../logic/activitylevelmap';

// styles for the cards
const useStyles = makeStyles(theme => ({
    cardSpace: {
        marginBottom: '10px',
        padding: '10px'
    }
}));

// Our macro display UI
const MacroDisplay = () => {
    // mounting boolean for one time database call
    const [loading, setLoading] = useState(true);
    // placeholder UI while data loads from database
    const [macroSuggestion, setMacroSuggestion] = useState(
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item>
                <Typography>Waiting on user info</Typography>
            </Grid>
        </Grid>
    );
    // holds user info
    let u;
    // holds macro suggestion
    let suggestion;
    // holds database connection
    const db = firebase.firestore();
    // holds user id
    const uid = firebase.auth().currentUser.uid;
    // load in styles
    const styles = useStyles();

    // updates UI with macro suggestion
    const fetchUser = async () => {
        // load in user data iff a call has not already been made
        if(loading) {
            // query current user data
            let q = await db.collection('users').doc(uid).get();
            u = q.data();

            // convert customary units to metric and get suggestion
            let heightM = u.height * .0254;
            let weightK = u.weight / 2.205;
            suggestion = generateSuggestion(heightM, weightK, u.age, u.gender, u.activityLevel, u.goal / 2.205);

            // if the user wants to maintain their weight, just give calorie recommendations, otherwise give full macro recommendations
            if(suggestion.maintain) {
                setMacroSuggestion(
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <Card className={styles.cardSpace}>
                            <Typography>{`You are a ${u.gender} and your activity rating is ${levelLabel.get(u.activityLevel)} so your TDEE level is ${suggestion.tdee}.`}</Typography>
                            <Typography>{`To maintain a weight of ${u.weight} lbs you need to consume ${suggestion.calorieRec} calories daily.`}</Typography>
                        </Card>
                    </Grid>
                </Grid>
                );
            } else {
                setMacroSuggestion(
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        <Grid item>
                            <Card className={styles.cardSpace}>
                                <Typography>{`You are a ${u.gender} and your activity rating is ${levelLabel.get(u.activityLevel)} so your TDEE value is ${suggestion.tdee}.`}</Typography>
                                <Typography>{`To get from ${u.weight} lbs to ${u.goal} lbs you need to consume ${suggestion.calorieRec} calories daily (${suggestion.goalVerb} an extra ${suggestion.extraCal} calories).`}</Typography>
                                <Typography>{`You should be able to ${suggestion.goalVerb} weight and reach your goal in about ${suggestion.estTime} weeks.`}</Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card className={styles.cardSpace}>
                                <Typography>Your recommended macros are:</Typography>
                                {suggestion.macros.map((item) => {
                                    return <Typography>{`${item.name}: ${item.grams} grams (${item.oz} oz).`}</Typography>;
                                })}
                            </Card>
                        </Grid>
                    </Grid>
                );
            }

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    });

    return (
        <Fragment>
            <Header title="Macro Display"/>
            <NavBar/>
            {macroSuggestion}
        </Fragment>
    );
};

export default MacroDisplay;