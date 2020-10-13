import React from 'react';
import './App.css';
import firebase from 'firebase/app';

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
    <div className="App">
      <header className="App-header">
        <h1>Hello world!</h1>
      </header>
    </div>
  );
}

export default App;
