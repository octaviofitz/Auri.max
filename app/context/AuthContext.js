'use client'

import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
     
    const [user, setUser] =  useState({
        logged: false,
        email: null,
        uid: null
    })

    return(
        <AuthProvider value={{user}}>
            {children}
        </AuthProvider>
    )
}