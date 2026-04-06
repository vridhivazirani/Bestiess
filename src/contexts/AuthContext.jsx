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
    
    // Check if user document exists, with a 4 second timeout fallback
    const docRef = doc(db, "users", user.uid);
    let docSnap;
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firestore connection timed out")), 4000)
      );
      docSnap = await Promise.race([getDoc(docRef), timeoutPromise]);
    } catch (firebaseError) {
      console.error("Firestore getDoc failed during Google Login:", firebaseError);
      // We'll proceed by assuming no document exists so we at least let them into the app!
      docSnap = { exists: () => false }; 
    }
    
    if (!docSnap.exists()) {
      // Create new user doc
      const userDoc = {
        uid: user.uid,
        email: user.email,
        username: (user.email || 'user').split('@')[0] + Math.floor(Math.random() * 1000), // temp
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
      try {
        await setDoc(docRef, userDoc);
      } catch (err) {
        console.error("Warning: Could not save new Google user to Firestore", err);
      }
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
        try {
          // Fetch custom user data from Firestore with a 4 second timeout
          // This prevents the app from hanging for 2 minutes if the user hasn't correctly enabled Firestore
          const docRef = doc(db, "users", user.uid);
          
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Firestore connection timed out. Is it enabled?")), 4000)
          );
          
          const docSnap = await Promise.race([getDoc(docRef), timeoutPromise]);
          
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to a generic userData so the app still loads instantly
          setUserData({ 
            displayName: user.displayName || "Bestie", 
            bio: "Update your bio!", 
            coins: 100,
            settings: { theme: 0, privacy: 1, notifs: true, dnd: false }
          });
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
