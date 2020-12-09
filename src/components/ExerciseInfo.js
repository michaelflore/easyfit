import React, { Fragment } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import { Typography, Grid, Card, makeStyles } from '@material-ui/core';

// styles for the cards
const useStyles = makeStyles(theme => ({
    cardSpace: {
        marginBottom: '10px',
        padding: '10px',
        display: 'inline-block',
        width: '50%',
        marginLeft: '25vw'
    }
}));

const ExerciseInfo = (props) => {
    const styles = useStyles();
    return (
        <Fragment>
            <Header title={`Exercise Info: Group ${props.location.item.groupName}`}/>
            <NavBar/>
            <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                <Grid item>
                    <Card className={styles.cardSpace}>
                        <Typography>{props.location.item.desc}</Typography>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ExerciseInfo;