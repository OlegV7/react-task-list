import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDyeV34d9qrXDa8VYA87bQ3TkPnpEDYUM",
    authDomain: "todo-list-48126.firebaseapp.com",
    projectId: "todo-list-48126",
    storageBucket: "todo-list-48126.appspot.com",
    messagingSenderId: "639520209728",
    appId: "1:639520209728:web:aa1128213eb870efa998a5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();