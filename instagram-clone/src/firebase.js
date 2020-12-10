import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyCTlEqsWCB1L7soMp5IlillZaSloGijnEY',
    authDomain: 'instagram-clone-95041.firebaseapp.com',
    databaseURL: 'https://instagram-clone-95041-default-rtdb.firebaseio.com',
    projectId: 'instagram-clone-95041',
    storageBucket: 'instagram-clone-95041.appspot.com',
    messagingSenderId: '63045274814',
    appId: '1:63045274814:web:ec583a8990bf24429822ef',
    measurementId: 'G-WE7H851SWK',
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };