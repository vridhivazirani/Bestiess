import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function usePulse() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    if (!db || !currentUser) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'pulse'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to relative time string
        time: doc.data().createdAt?.toDate ? getRelativeTime(doc.data().createdAt.toDate()) : 'Just now'
      }));
      setUpdates(posts);
      setLoading(false);
    }, (error) => {
      console.error("Pulse error:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const postUpdate = async (text) => {
    if (!db || !currentUser || !userData) return;
    
    await addDoc(collection(db, 'pulse'), {
      authorId: currentUser.uid,
      who: userData.username,
      avatar: userData.avatar || 'KawaiiGirl',
      text,
      createdAt: serverTimestamp(),
      visibility: 'public'
    });
  };

  return { updates, loading, postUpdate };
}

function getRelativeTime(date) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const daysDifference = Math.round((date - new Date()) / (1000 * 60 * 60 * 24));
  if (daysDifference < 0) {
    if (daysDifference === 0) {
      const minutesDifference = Math.round((date - new Date()) / (1000 * 60));
      if (minutesDifference === 0) return 'Just now';
      if (minutesDifference > -60) return `${Math.abs(minutesDifference)}m ago`;
      return `${Math.abs(Math.round(minutesDifference / 60))}h ago`;
    }
    return rtf.format(daysDifference, 'day');
  }
  return 'Just now';
}
