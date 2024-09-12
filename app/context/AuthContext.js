// src/context/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        logged: false,
        email: null,
        uid: null
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para manejar carga

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    logged: true,
                    email: user.email,
                    uid: user.uid
                });
            } else {
                setUser({
                    logged: false,
                    email: null,
                    uid: null
                });
            }
            setLoading(false); // Actualiza el estado de carga después de verificar el usuario
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    const registerUser = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered successfully:", userCredential);
            setUser({
                logged: true,
                email: userCredential.user.email,
                uid: userCredential.user.uid
            });
            setError(null);
        } catch (error) {
            console.error("Error registering user: ", error.message);
            setError(error.message);
        }
    };

    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully:", userCredential);
            setUser({
                logged: true,
                email: userCredential.user.email,
                uid: userCredential.user.uid
            });
            setError(null);
        } catch (error) {
            console.error("Error logging in user: ", error.message);
            setError("Usuario o contraseña incorrectas");
        }
    };

    return (
        <AuthContext.Provider value={{ user, registerUser, loginUser, error, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
