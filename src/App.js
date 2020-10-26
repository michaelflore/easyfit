import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./PrivateRoute";

import Grid from "@material-ui/core/Grid";
import {AuthProvider} from "./contexts/AuthContext";

import firebase from "firebase/app";
import "firebase/auth";
import BMICalculator from "./components/BMICalculator";
import { Typography } from '@material-ui/core';

// load in environment variables
require('dotenv').config();

// connect to firebase services
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASURE_ID
});

const App = () => {

      return (
          <AuthProvider>
            <Grid container justify="center" alignItems="center" style={{ height: "100vh" }}>
              <Router>
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/login" component={Login} />
                  <Route path="/bmi" component={BMICalculator} />
                </Switch>
              </Router>
            </Grid>
          </AuthProvider>
      );
};
export const auth = app.auth();
export default App;
