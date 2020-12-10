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
        marginLeft: '30vw'
    },
    topCard: {
        marginTop: '7vh'
    }
}));

const ExerciseInfo = (props) => {
    const styles = useStyles();
    let i = 0;
    return (
        <Fragment>
            <Header title={`Exercise Info: Group ${props.location.item.groupName}`}/>
            <NavBar/>
            <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                {props.location.item.desc.map(section => {
                    i++;
                    return <Grid item key={i}>
                        <Card className={`${styles.cardSpace} ${i === 1 ? styles.topCard : ''}`}>
                            {section}
                        </Card>
                    </Grid>
                })}
            </Grid>
        </Fragment>
    );
};

export default ExerciseInfo;