import firebase from "firebase/app";
import 'firebase/firestore';
import levelLabel from '../logic/activitylevelmap';

const fetchUserInfo = async (db, uid, isLoaded, setIsLoaded, setUser) => {
    if(!isLoaded) {
        try {
            // get current user info
            let query = await db.collection('users').doc(uid).get();
            let u = query.data();
            // Set an array of user data
            let userData = [`${u.fname} ${u.lname}`, u.height, u.weight, u.age, u.goal, u.gender, levelLabel.get(u.activityLevel)];
            setUser(userData);
            // Update user account with latest activity timestamp
            db.collection('users').doc(uid).update({
                loggedin: firebase.firestore.Timestamp.fromDate(new Date())
            });
            // finish loading
            setIsLoaded(true);
            return userData;
        } catch(err) {
            console.log(err);
            return err;
        }
    }
};

export default fetchUserInfo;