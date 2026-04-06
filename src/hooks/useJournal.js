import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useJournal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!db || !currentUser) {
      setLoading(false);
      return;
    }

    // Only get journal entries for the current user
    const q = query(
      collection(db, 'journal'), 
      where('authorId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        let dateStr = 'Today';
        let timeStr = 'Just now';
        
        if (data.createdAt?.toDate) {
          const date = data.createdAt.toDate();
          dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }

        return {
          id: doc.id,
          ...data,
          date: dateStr,
          time: timeStr
        };
      });
      setEntries(posts);
      setLoading(false);
    }, (error) => {
      console.error("Journal error:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const postEntry = async (text, emo) => {
    if (!db || !currentUser) return;
    
    await addDoc(collection(db, 'journal'), {
      authorId: currentUser.uid,
      text,
      emo,
      createdAt: serverTimestamp(),
      private: true
    });
  };

  const removeEntry = async (id) => {
    if (!db) return;
    await deleteDoc(doc(db, 'journal', id));
  }

  return { entries, loading, postEntry, removeEntry };
}
