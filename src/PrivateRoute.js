import React from "react";
import {Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    // get current user
    const { currentUser } = useAuth();
    // Route to desired route if and only if user is logged in, otherwise redirect to login page
    return (
        <Route {...rest}
               render={props => {
                   return currentUser ? <Component {...props} /> : <Redirect to="/login"/>
               }}
        >
        </Route>
    );
};

export default PrivateRoute;