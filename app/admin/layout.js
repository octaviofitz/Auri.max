'use client'
import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import LoginPage from './login/LoginPage';

const AdminLayout = ({ children }) => {
    const { user, loading } = useAuthContext();

    // Muestra "Cargando..." mientras se verifica el estado de autenticación
    if (loading) {
        return <div className='flex margin-auto justify-center text-center my-20'>Cargando...</div>;
    }

    // Si el usuario no está autenticado, muestra la página de login
    if (!user?.logged) {
        return <LoginPage />;
    }

    // Muestra el contenido de la página de administración si el usuario está autenticado
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayout;
