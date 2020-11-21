import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBtlrNUSXB9rLXKAH79Xjtl_LhJDf-NptY",
    authDomain: "test-project-1cc40.firebaseapp.com",
    databaseURL: "https://test-project-1cc40.firebaseio.com",
    projectId: "test-project-1cc40",
    storageBucket: "test-project-1cc40.appspot.com",
    messagingSenderId: "708631431254",
    appId: "1:708631431254:web:27ec2bd4747d4c6e8cd3f7"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();