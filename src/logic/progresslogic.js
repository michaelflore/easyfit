import firebase from "firebase/app";
import 'firebase/firestore';

// retrieves all weight logs from current user, then makes sure the db cannot be queried infinitely
const fetchLogs = async (db, uid, isLoaded, setIsLoaded, setLogs) => {
    if(!isLoaded) {
        try {
            const snapshot = await db.collection('users').doc(uid).collection('logs').get();
            // sort in order of log date since firestore is weird and doesnt store stuff in order
            setLogs(snapshot.docs.map(log => log.data()).sort((a, b) => b.date.toDate() - a.date.toDate()));
            setIsLoaded(true);
        } catch(e) {
            console.log(e);
            return e;
        }
    }
};

const logSettings = (i, logs, log, styles) => {
    let symbol = 'x';
    let colorTheme = styles.weightNeutral;

    if(i !== logs.length-1) {
        if(logs[i+1].weight > log.weight) {
            // weight loss
            symbol = '-';
            colorTheme = styles.weightLoss;
        } else if(logs[i+1].weight < log.weight) {
            // weight gain
            symbol = '+';
            colorTheme = styles.weightGain;
        } else {
            // no change
            symbol = 'x';
            colorTheme = styles.weightNeutral;
        }
    }

    return {
        symbol: symbol,
        colorTheme: colorTheme
    };
};

export {
    fetchLogs,
    logSettings
};