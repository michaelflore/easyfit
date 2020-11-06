import React, { Fragment, useState, useEffect } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import { Card, Grid, Typography, TextField, Button } from '@material-ui/core';

const Logging = () => {
    const [weight, setWeight] = useState(0);
    const [bmi, setBMI] = useState(0);

    // debug
    useEffect(() => {
        console.log(weight);
        console.log(bmi);
    }, [weight, bmi])

    const handleSubmit = e => {
        e.preventDefault();
        // TODO actual logging logic here
        alert('log successful!');
    };

    return (
        <Fragment>
            <Header title='User Logging Screen'/>
            <NavBar/>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Card>
                    <br/>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        <Grid item>
                            <TextField id="weight-in" label='Enter your new weight (lbs)' defaultValue={weight} variant="outlined" onInput={e => setWeight(e.target.value)}/>
                        </Grid>
                        <Grid item>
                            <TextField id="bmi-in" label='Enter your new BMI' defaultValue={bmi} variant="outlined" onInput={e => setBMI(e.target.value)}/>
                        </Grid>
                        <Grid item>
                            <Button type='submit' variant="contained" color="primary">Log</Button>
                        </Grid>
                    </Grid>
                    <br/>
                </Card>
            </form>
        </Fragment>
    );
};

export default Logging;