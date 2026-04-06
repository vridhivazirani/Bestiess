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
      where('authorId', '==', currentUser.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort locally by createdAt to bypass Firebase's requirement for a manual composite index
      posts.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      
      setTasks(posts);
      setLoading(false);
    }, (error) => {
      console.error("Tasks listener error:", error);
      setLoading(false);
    });

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
