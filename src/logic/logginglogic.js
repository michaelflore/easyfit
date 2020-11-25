import firebase from 'firebase/app';
import 'firebase/firestore';

// checks if number is a float
const isFloat = n => {
    return Number(n) === n && n % 1 !== 0;
}

const validate = (f1, f2) => {
    if(!(isFloat(f1) || Number.isInteger(f1)) || !(isFloat(f2) || Number.isInteger(f2))) {
        alert("Error, use must enter valid numbers.");
        return false;
    } else if(f1 <= 0 || f2 <= 0) {
        alert("Error, fields must be a positive, non-zero number.");
        return false;
    } else {
        return true;
    }
};

const logWeight = (weight, heightOrBMI, unit, bmi, db, uid) => {
    if(validate(weight, heightOrBMI)) {
        let lw = unit === 1 ? weight : weight * 2.205;
        db.collection('users').doc(uid).collection('logs').add({
            weight: lw,
            bmi: bmi,
            date: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then(() => {
            db.collection('users').doc(uid).update({
                weight: lw
            })
        })
        .then(() => alert('log successful!'));
    }
};

export {
    logWeight,
    validate
};