import * as Firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyD1nNKJ_CWBxRXr_2BGk3csee047ZIQ_uM",
    authDomain: "videoforu-c0ff4.firebaseapp.com",
    databaseURL: "https://videoforu-c0ff4-default-rtdb.firebaseio.com",
    projectId: "videoforu-c0ff4",
    storageBucket: "videoforu-c0ff4.appspot.com",
    messagingSenderId: "181286266228",
    appId: "1:181286266228:web:e3f4b8ee614642c11a3821",
    measurementId: "G-E247R5HT48"
};
class Fire {
    constructor () {
        if (!Firebase.apps.length)
        {
            Firebase.initializeApp(firebaseConfig);
        }
    }

}

Fire.shared = new Fire();
export default Fire;