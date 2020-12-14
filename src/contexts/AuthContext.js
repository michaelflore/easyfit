import React, {useContext, useEffect, useState} from "react";
import {auth} from "../App";

// new context for user authentication
const AuthContext = React.createContext();

// return the authentication context
export function useAuth() {
    return useContext(AuthContext);
}

// provider of authentication functions
export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();

    // account signup
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    // account login
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    // account logout
    function logout() {
        return auth.signOut();
    }
    // update user email
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    // update user password
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    // delete an account
    function deleteUser() {
        return currentUser.delete()
    }

    useEffect(() => {
        // listener for user login/logout in the session
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        });

        return unsubscribe;
    }, []);
    // export functions
    const value = {
        currentUser,
        login,
        signup,
        logout,
        updateEmail,
        updatePassword,
        deleteUser
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}