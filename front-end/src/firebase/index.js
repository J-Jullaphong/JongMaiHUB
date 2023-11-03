import firebase from "firebase/compat/app";
import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
