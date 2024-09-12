// src/lib/firebaseUtils.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

// Función para crear un ticket de compra en Firestore
export const createPurchaseTicket = async (cart, total) => {
    try {
        const docRef = await addDoc(collection(db, 'purchaseTickets'), {
            userId: auth.currentUser.uid, // Asumiendo que el usuario está autenticado
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            total,
            createdAt: new Date()
        });
        return docRef.id; // Devuelve el ID del ticket creado
    } catch (error) {
        console.error("Error creating purchase ticket: ", error);
        throw new Error("Error creating purchase ticket");
    }
};
