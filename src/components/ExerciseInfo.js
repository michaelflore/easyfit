import React, { Fragment } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import { Grid, Card, makeStyles } from '@material-ui/core';

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
    // load in styles
    const styles = useStyles();
    // current section of info being rendered
    let i = 0;
    return (
        <Fragment>
            <Header title={`Exercise Info: Group ${props.location.item.groupName}`}/>
            <NavBar/>
            <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                {props.location.item.desc.map(section => {
                    i++;
                    return <Grid item key={i}>
                        {/*Load in a Fragment of React components, give additional styling if it is the first one*/}
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