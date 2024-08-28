'use client';
import React from 'react';
import Image from 'next/image';
import { useCartContext } from '../context/CartContext';

function Page() {
    const { cart, removeFromCart, calculateTotal } = useCartContext();

    return (
        <section className='lg:flex lg:my-16'>
            <article className='mt-4 lg:w-[60vw] lg:ml-[8vw]'>
                {cart.map((item, index) => (
                    <div className='flex flex-col bg-white rounded-lg shadow m-4 dark:bg-gray-800 pt-3 pb-6 px-2' key={`${item.id}-${index}`}>
                        <div className='flex justify-around items-center'>
                            <Image src={item.img} alt='Productos carrito' width={100} height={100} className='xl:w-1/6' />
                            <p className='text-sm px-2 lg:text-xl'>{item.name}</p>
                            <p className='text-sm lg:text-xl'>${item.price}</p>
                        </div>
                        <div className='flex justify-around items-center mt-2'>
                            <p className='text-sm lg:text-xl'>Cantidad: {item.quantity}</p>
                            <button
                                type='button'
                                className='flex items-center text-sm mr-1 text-red-600'
                                onClick={() => removeFromCart(item.id)}
                            >
                                Quitar <Image src='/cancell.png' width={10} height={10} alt='quit' className='ml-2 lg:text-xl lg:mr-20' />
                            </button>
                        </div>
                    </div>
                ))}
            </article>

            <aside className='bg-white rounded-lg shadow m-4 dark:bg-gray-800 py-4 xl:h-[225px] xl:mt-[32px]'>
                <h3 className='px-5'>Resumen de compra</h3>
                <div className='flex justify-between px-5 my-2'>
                    <p>Productos</p>
                    <p>{cart.reduce((total, item) => total + item.quantity, 0)}</p> {/* Mostrar la cantidad total de productos en el carrito */}
                </div>

                <div className='flex justify-between px-5 my-2'>
                    <p>Envío</p>
                    <p>Gratis</p>
                </div>

                <div className='flex justify-between px-5 my-3 mb-5'>
                    <p className='font-black'>Total</p>
                    <p className='font-black'>${calculateTotal()}</p> 
                </div>

                <div className="flex margin-auto justify-center align-center px-20">
                    <button
                        type="button"
                        className="w-full px-6 py-3.5 text-base text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm mb-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Finalizar compra
                    </button>
                </div>
            </aside>
        </section>
    );
}

export default Page;
