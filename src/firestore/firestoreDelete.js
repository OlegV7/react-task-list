import { firestore } from '../firebase/config';

export const deleteItemFirestore = (id) => {
    firestore.collection('todos').doc(id).delete();
};

