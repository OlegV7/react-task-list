import { firestore } from '../firebase/config';

export const addItemFirestore = async item => {
    firestore.collection('todos').add(item);
}