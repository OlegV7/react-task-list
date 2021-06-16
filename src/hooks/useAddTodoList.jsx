import { useEffect, useState } from 'react';
import { firestore } from '../firebase/config';

const useAddTodoList = () => {
    const [error, setError] = useState('');
    const [todos, setTodos] = useState(null);

    // On Snapshot
    useEffect(() => {
        try {
            const unsubscribe = firestore.collection('todos').onSnapshot(snapshot => {
                const list = [];
    
                snapshot.docs.map(doc => {
                    const todo = {
                        id: doc.id,
                        ...doc.data()
                    }
    
                    list.push(todo);

                    return list;
                });
    
                setTodos(list);

                return () => unsubscribe();
            });
        } catch(error) {
            setError(error);
        }
    }, []);

    return [todos, error];
};

export default useAddTodoList;