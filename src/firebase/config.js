import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCfXa9pxPNqCxGsmxO-fSiGPSVaIINioaY",
  authDomain: "ninja-project-e3388.firebaseapp.com",
  projectId: "ninja-project-e3388",
  storageBucket: "ninja-project-e3388.appspot.com",
  messagingSenderId: "814572685047",
  appId: "1:814572685047:web:948c1cb1358e1b8db775f2"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }