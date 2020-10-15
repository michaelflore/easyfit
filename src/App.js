import React from 'react';
import firebase from 'firebase/app';
import BMICalculator from './BMICalculator';

const App = () => {
  // load in environment variables
  require('dotenv').config();

  // connect to firebase services
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURE_ID
  });

  return (
    <BMICalculator/>
    );
}

export default App;
