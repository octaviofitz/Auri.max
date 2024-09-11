'use client'
import { createContext, useContext, useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

    const registerUser = async (values) => {
        try {
            console.log("Registering user with email:", email);
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log("User registered successfully:", userCredential);

            const user = userCredential.user;
            setUser({
                logged: true,
                email: user.email,
                uid: user.uid
            });
        } catch (error) {
            console.error("Error registering user: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};
