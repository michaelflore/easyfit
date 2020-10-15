import React, { Fragment, useState } from 'react';
import { Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import Header from './Header';

let { bmiImperial, bmiMetric, result } = require('./bmicalculatorlogic.js');

const BMICalculator = () => {
  /**
   * initialize state for:
   * 
   * unit
   * bmi
   * weight
   * height
   */
  const [unit, setUnit] = useState(0);
  const [bmi, setBMI] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  // Handles the change event for our unit radio buttons
  const radioChange = (event) => {
    setUnit(Number(event.target.value));
  };

  // parses new value for weight/height and switches state to reflect new value
  const weightChange = (event) => {
    try {
      let newWeight = parseFloat(event.target.value);
      setWeight(newWeight);
    } catch(err) {
      alert("Weight must be a valid decimal value.");
    }
  };
  const heightChange = (event) => {
    try {
      let newHeight = parseFloat(event.target.value);
      setHeight(newHeight);
    } catch(err) {
      alert("Height must be a valid decimal value.");
    }
  };

  // TODO: implement this
  const calculateBMI = (event) => {
    alert("This has not been implemented yet!");
  };
  
  /**
   * This looks scary, I promise it isn't.
   * 
   * We load in our custom Header app bar first, and then surround our entire page in a Paper object for styling.
   * Our calculator form is aligned and structured in a Grid, with one container Grid tag and many item Grid tags.
   * TextField tags are objects that take in text input. We have one for weight and one for height, and their state changes on input.
   * RadioGroup simply manages our radio buttons for us.
   * Our Button is used to calculate the BMI based off of the weight, height, and units of measurement inputted by the user.
   * Finally, we have Typography that displays the current state of the calculated BMI.
   */
  return (
    <Fragment>
      <Header title="BMI Calculator"/>
      <br/>
        <form noValidate autoComplete="off">
          <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item>
              <TextField id="bmi-weight" label={`Enter Your Weight (${unit === 0 ? "kg" : "lbs"})`} defaultValue={weight.toString()} variant="outlined" onInput={weightChange}/>
            </Grid>
            <Grid item>
              <TextField id="bmi-height" label={`Enter Your Height (${unit === 0 ? "m" : "in"})`} defaultValue={height.toString()} variant="outlined" onInput={heightChange}/>
            </Grid>
            <Grid item>
              <FormLabel>Select Units</FormLabel>
              <RadioGroup name="units" aria-label="Select Units" value={unit} onChange={radioChange}>
                <FormControlLabel key="metric" value={0} control={<Radio/>} label="Metric"/>
                <FormControlLabel key="customary" value={1} control={<Radio/>} label="Customary"/>
              </RadioGroup>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={calculateBMI}>Calculate BMI</Button>
            </Grid>
            <Grid item>
              <Typography>Your BMI is: {bmi}</Typography>
            </Grid>
          </Grid>
        </form>
    </Fragment>
    );
};

export default BMICalculator;