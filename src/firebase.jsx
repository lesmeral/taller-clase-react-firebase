import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvtkOOnyX9JOaGpZbhdp5wxZA8qLNC7RI",
  authDomain: "fir-taller-clase-react-w.firebaseapp.com",
  projectId: "fir-taller-clase-react-w",
  storageBucket: "fir-taller-clase-react-w.appspot.com",
  messagingSenderId: "374587116778",
  appId: "1:374587116778:web:bb1b7756fa1fbd8ff89b93",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };
