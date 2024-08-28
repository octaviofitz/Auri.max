'use client';
import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log({ cart });
    }, [cart]);

    // Añadir un artículo al carrito
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem => 
                    cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                    : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    // Eliminar un artículo del carrito
    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(cartItem => 
                    cartItem.id === itemId 
                    ? { ...cartItem, quantity: cartItem.quantity - 1 } 
                    : cartItem
                );
            } else {
                return prevCart.filter(cartItem => cartItem.id !== itemId);
            }
        });
    };

    // Calcular el total del carrito
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto del carrito
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};
