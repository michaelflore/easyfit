import React, {useContext, useEffect, useState} from "react";
import {auth} from "../App";
import firebase from "firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const db = firebase.firestore();

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateFirstName(fname) {
        return db.collection("users").doc(currentUser.uid).update({
            fname:fname
        });
    }

    function updateLastName(lname) {
        return db.collection("users").doc(currentUser.uid).update({
            lname:lname
        });
    }

    function updateAge(age) {
        return db.collection("users").doc(currentUser.uid).update({
            age:age
        });
    }

    function updateGoal(goal) {
        return db.collection("users").doc(currentUser.uid).update({
            goal:goal
        });
    }

    function updateLevel(unit, alevel) {
        return db.collection("users").doc(currentUser.uid).update({
            gender: unit === 0 ? 'Male' : 'Female',
            activityLevel: alevel
        });
    }

    function deleteUser() {
        return currentUser.delete()
    }

    function deleteUserCol() {
        return db.collection("users").doc(currentUser.uid).delete();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        updateEmail,
        updatePassword,
        updateFirstName,
        updateLastName,
        updateAge,
        updateGoal,
        updateLevel,
        deleteUser,
        deleteUserCol
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}