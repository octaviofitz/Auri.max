'use client';
import React from 'react';
import Image from 'next/image';
import { useCartContext } from '../context/CartContext';

function page() {

    const { cart, removeFromCart, calculateTotal } = useCartContext();

    return (
        <section>
            <article className='mt-4'>
            {cart.map(item =>
                <div className='flex justify-around bg-white rounded-lg shadow m-4 dark:bg-gray-800 align-center py-4 px-2' >
                   <Image src={item.img} alt='Productos carrito' className='' width={100} height={100} />
                   <p className='mt-6 text-sm px-2'>{item.name}</p>
                   <p className='mt-6 text-sn'>${item.price}</p>
                   <button type='button'>Quitar <Image src='/cancell.png' width={30} height={30} alt='quit' /></button>
                </div> )}
            </article>

            <article className='bg-white rounded-lg shadow m-4 dark:bg-gray-800 py-4'>
                <h3 className='px-5'>Resumen de compra</h3>
                <div className='flex justify-between px-5 my-2'>
                    <p>Productos</p>
                    <p>3</p>
                        </div>
                
                        <div className='flex justify-between px-5 my-2'>
                    <p>Envío</p>
                    <p>Gratis</p>
                        </div>

                        <div className='flex justify-between px-5 my-3 mb-5 '>
                    <p className='font-black'>TOTAL</p>
                    <p className='font-black'>$ {calculateTotal()}</p>
                        </div>

                        {/* <hr className='bg-gray-300'></hr> */}

                        <div className="flex margin-auto justify-center align-center px-20">
            <button
              type="button"
              className="w-full px-6 py-3.5 text-base text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm mb-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                Finalizar compra
            </button>
          </div>
            </article>
        </section>
    );
}

export default page;