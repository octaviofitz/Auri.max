'use client';
import React from 'react';
import Image from 'next/image';
import { useCartContext } from '../context/CartContext'; 
import Link from 'next/link';

const ModalCart = ({ isOpen, toggleModal }) => {
  const { cart, removeFromCart } = useCartContext();

  if (!isOpen) return null;

  const isCartEmpty = cart.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 mx-auto bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-white text-center">Carrito de Compras</h3>
          <button
            onClick={toggleModal}
            className="text-white bg-transparent hover:bg-gray-200 hover:text-white rounded-lg text-sm p-2"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Cerrar carrito</span>
          </button>
        </div>
        <div className="p-4 -ml-7">
          {cart.length === 0 ? (
            <p className="text-white-900 text-center mb-4">Tu carrito está vacío</p>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex ml--10 mb-2 justify-around">
                <Image src={item.img} width={70} height={70} alt={`Imagen de ${item.name}`} />
                <div className="mt-5 text-white text-sm">
                  <p>{item.name} - ${item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-red-900 -mt-2 font-black text-2xl"
                >
                  X
                </button>
              </div>
            ))
          )}
          <div className="flex margin-auto align-center justify-center mt-2 -mb-5 ml-2">
            <Link href="/carrito">
              <button 
                onClick={toggleModal} 
                type="button" 
                className={`w-full px-6 py-3.5 text-base rounded-lg text-sm mb-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${isCartEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-white border border-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 text-white'} `}
                disabled={isCartEmpty}
              >
                Finalizar compra
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCart;
