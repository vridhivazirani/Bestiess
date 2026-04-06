import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this with your actual Firebase project configuration
// 1. Go to console.firebase.google.com
// 2. Create a new project
// 3. Add a Web App to the project
// 4. Copy the config object below
const firebaseConfig = {
  apiKey: "AIzaSyCLBOIAoKLABoH3tiRJOf8jbZE-ZFHTACs",
  authDomain: "bestieee-a4762.firebaseapp.com",
  projectId: "bestieee-a4762",
  storageBucket: "bestieee-a4762.firebasestorage.app",
  messagingSenderId: "283469968501",
  appId: "1:283469968501:web:03dfb9b726e81a2d13f43c"
};

// Initialize Firebase only if the API key has been changed from the placeholder
let app;
let auth;
let db;
let googleProvider;

try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.warn("⚠️ Firebase is not configured! Please update src/firebase.js with your config.");
  }
} catch (error) {
  console.error("Firebase initialization error", error);
}

export { auth, db, googleProvider };
