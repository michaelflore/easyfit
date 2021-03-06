import firebase from "firebase/app";
import 'firebase/firestore';
import levelLabel from '../logic/activitylevelmap';

const fetchUserInfo = async (db, uid, isLoaded, setIsLoaded, setUser) => {
    if(!isLoaded) {
        try {
            let query = await db.collection('users').doc(uid).get();
            let u = query.data();
            let userData = [`${u.fname} ${u.lname}`, u.height, u.weight, u.age, u.goal, u.gender, levelLabel.get(u.activityLevel)];
            setUser(userData);
            db.collection('users').doc(uid).update({
                loggedin: firebase.firestore.Timestamp.fromDate(new Date())
            });
            setIsLoaded(true);
            return userData;
        } catch(err) {
            console.log(err);
            return err;
        }
    }
};

export default fetchUserInfo;