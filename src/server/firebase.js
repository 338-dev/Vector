import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBkCy2r0o78JbnaLoH1KvTQnZFNahzy7WE",
    authDomain: "quizapp-25dc0.firebaseapp.com",
    projectId: "quizapp-25dc0",
    storageBucket: "quizapp-25dc0.appspot.com",
    messagingSenderId: "426496260561",
    appId: "1:426496260561:web:94531f299ea3e8147b88f0",
    measurementId: "G-JSB1ZHDRQM"
  };

firebase.initializeApp(firebaseConfig);
    
export default firebase; 