import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData, updateProfile } = useAuth();

  useEffect(() => {
    if (!db || !currentUser || !userData) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter the global users list to strictly those who we've added (or who added us)
      // And we definitely don't want to list ourselves!
      const myFriendsList = userData.friendIds || [];
      const connections = allUsers.filter(u => u.uid !== currentUser.uid && myFriendsList.includes(u.uid));
      
      setFriends(connections);
      setLoading(false);
    }, (error) => {
      console.error("Friends gallery read failed:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser, userData?.friendIds]);

  const requestFriend = async (targetUsername) => {
    if (!db || !currentUser) return;
    
    try {
      // Find the user by exactly matching their @username
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("username", "==", targetUsername));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        throw new Error("No user found with that username!");
      }

      const targetUID = snap.docs[0].data().uid;

      if (targetUID === currentUser.uid) {
        throw new Error("You can't add yourself!");
      }

      const existingFriends = userData.friendIds || [];
      if (!existingFriends.includes(targetUID)) {
        await updateProfile({ friendIds: [...existingFriends, targetUID] });
        console.log(`Friend ${targetUsername} successfully synced to database!`);
      } else {
        throw new Error("You are already besties!");
      }

    } catch (e) {
      console.error(e);
      throw e; // Pass to UI to alert
    }
  };

  const poke = async (friendId) => {
    console.log("Poked friend!", friendId);
  }

  const zap = async (friendId) => {
    console.log("Zapped friend!", friendId);
  }

  return { friends, loading, requestFriend, poke, zap };
}
