import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    if (!db || !currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'tasks'),
      where('authorId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    // Fallback if index fails
    const fallbackQ = query(
      collection(db, 'tasks'),
      where('authorId', '==', currentUser.uid)
    );
    
    const trySnapshot = (usedQuery) => {
      return onSnapshot(usedQuery, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // If using fallback query, we sort it locally
        if (usedQuery === fallbackQ) {
          posts.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
        }
        
        setTasks(posts);
        setLoading(false);
      }, (error) => {
        console.error("Tasks listener error (might need an index):", error);
        // If it was the indexed query that failed due to a missing composite index, try the simple query
        if (usedQuery === q && error.code === 'failed-precondition') {
          console.log("Falling back to unindexed query for tasks.");
          unsubscribe = trySnapshot(fallbackQ);
        } else {
           setLoading(false);
        }
      });
    };

    let unsubscribe = trySnapshot(q);
    return () => unsubscribe();
  }, [currentUser]);

  const addTask = async (title, status, icon, color) => {
    if (!db || !currentUser || !userData) return;
    
    await addDoc(collection(db, 'tasks'), {
      authorId: currentUser.uid,
      who: userData.displayName,
      title,
      status, // 'Pending', 'In Progress', 'Done'
      icon,
      color,
      createdAt: serverTimestamp()
    });
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    if (!db || !currentUser) return;
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      status: newStatus
    });
  };

  const deleteTask = async (taskId) => {
    if (!db || !currentUser) return;
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  return { tasks, loading, addTask, updateTaskStatus, deleteTask };
}
