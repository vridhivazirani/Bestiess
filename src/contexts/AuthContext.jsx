import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function register(email, password, username, displayName, avatar) {
    if (!auth) throw new Error("Firebase not configured");
    
    // First Create user in Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Then Create user document in Firestore
    const userDoc = {
      uid: user.uid,
      email: user.email,
      username: username,
      displayName: displayName,
      avatar: avatar,
      bio: "New bestie in the hub! ✨",
      level: 1,
      coins: 100,
      petName: "Sugar Bunny",
      petHappy: 100,
      petEnergy: 100,
      settings: {
        theme: 0,
        privacy: 1,
        notifs: true,
        dnd: false
      },
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, "users", user.uid), userDoc);
    setUserData(userDoc);
    return user;
  }

  function login(email, password) {
    if (!auth) throw new Error("Firebase not configured");
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    if (!auth) throw new Error("Firebase not configured");
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user document exists
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // Create new user doc
      const userDoc = {
        uid: user.uid,
        email: user.email,
        username: user.email.split('@')[0] + Math.floor(Math.random() * 1000), // temp
        displayName: user.displayName || 'New Bestie',
        avatar: "KawaiiGirl",
        bio: "New bestie in the hub! ✨",
        level: 1,
        coins: 100,
        petName: "Sugar Bunny",
        petHappy: 100,
        petEnergy: 100,
        settings: { theme: 0, privacy: 1, notifs: true, dnd: false },
        createdAt: new Date().toISOString()
      };
      await setDoc(docRef, userDoc);
      setUserData(userDoc);
    } else {
      setUserData(docSnap.data());
    }
    return user;
  }

  function logout() {
    if (!auth) throw new Error("Firebase not configured");
    return signOut(auth);
  }

  useEffect(() => {
    if (!auth) {
      // Mock user for UI if firebase is not configured
      console.log("Using mock user because Firebase is missing");
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch custom user data from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function updateProfile(dataToUpdate) {
    if (!auth || !currentUser) throw new Error("Firebase not configured or user not logged in");
    const docRef = doc(db, "users", currentUser.uid);
    await setDoc(docRef, dataToUpdate, { merge: true });
    setUserData(prev => ({ ...prev, ...dataToUpdate }));
  }

  const value = {
    currentUser,
    userData,
    register,
    login,
    loginWithGoogle,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
