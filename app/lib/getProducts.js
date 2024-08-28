import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/config/firebase.js';

export async function getProducts() {
    const productRef = collection(db, "products");
    const querySnapshot = await getDocs(productRef);
    
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
}
