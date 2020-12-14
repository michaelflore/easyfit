import firebase from 'firebase/app';
import 'firebase/firestore';

// checks if number is a float
const isFloat = n => {
    return Number(n) === n && n % 1 !== 0;
}

const validate = (f1, f2) => {
    // check if numbers are both either a float or an integer
    if(!(isFloat(f1) || Number.isInteger(f1)) || !(isFloat(f2) || Number.isInteger(f2))) {
        alert("Error, use must enter valid numbers.");
        return false;
    // check if numbers are non zero and positive
    } else if(f1 <= 0 || f2 <= 0) {
        alert("Error, fields must be a positive, non-zero number.");
        return false;
    } else {
        return true;
    }
};

const logWeight = (weight, heightOrBMI, unit, bmi, db, uid, alevel) => {
    if(validate(weight, heightOrBMI) && (alevel >= 1 && alevel <= 4)) {
        // convert weight to customary units
        let lw = unit === 1 ? weight : weight * 2.205;
        // add new weight log to current user
        db.collection('users').doc(uid).collection('logs').add({
            weight: lw,
            bmi: bmi,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            activityLevel: alevel
        })
        // update user profile with new weightr and activity level
        .then(() => {
            db.collection('users').doc(uid).update({
                weight: lw,
                activityLevel: alevel
            })
        })
        .then(() => alert('log successful!'));
    }
};

export {
    logWeight,
    validate
};