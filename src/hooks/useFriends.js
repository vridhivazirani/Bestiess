import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!db || !currentUser) {
      setLoading(false);
      return;
    }

    // A complete implementation would listen to 'friends' collection 
    // where array-contains uid, then fetch the user profiles.
    // For simplicity in this demo, let's assume we store friend user blocks 
    // directly, or we fetch the "users" collection directly and show registered users as potential besties.
    
    // So let's just fetch ALL users except ourselves for now 
    // to simulate finding people in the community to friend.
    // In a real app we'd have a separate 'friend_relations' table.

    const q = query(collection(db, 'users'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const otherUsers = allUsers.filter(u => u.uid !== currentUser.uid);
      setFriends(otherUsers);
      setLoading(false);
    }, (error) => {
      console.error("Friends error:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const requestFriend = async (targetUsername) => {
    if (!db || !currentUser) return;
    // In a full implementation, you'd find the user by targetUsername and send a friendship doc
    console.log("Friend request sent to", targetUsername);
  };

  const poke = async (friendId) => {
    console.log("Poked friend!", friendId);
    // Here we could add a notification doc
  }

  const zap = async (friendId) => {
    console.log("Zapped friend!", friendId);
  }

  return { friends, loading, requestFriend, poke, zap };
}
