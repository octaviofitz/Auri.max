'use client';
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        console.log({cart});
    }, [cart]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    }

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    }

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, calculateTotal}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
