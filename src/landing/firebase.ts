import firebase from "firebase";

let initialized = false;

export function getFirebase() {
  if (!initialized) {
    initialized = true;
    const firebaseConfig = {
      apiKey: "AIzaSyBdciNSmhwj6MRd0k5Q9h91QOSoMVD64Ig",
      authDomain: "pitch-deck-aa105.firebaseapp.com",
      databaseURL: "https://pitch-deck-aa105.firebaseio.com",
      projectId: "pitch-deck-aa105",
      storageBucket: "pitch-deck-aa105.appspot.com",
      messagingSenderId: "363904212489",
      appId: "1:363904212489:web:a7a6488aff6522a742e2d8",
      measurementId: "G-X05HKKTBQT"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  return firebase;
}
