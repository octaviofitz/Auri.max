'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useCartContext } from '../context/CartContext';
import { createPurchaseTicket } from '../lib/getTicket';
import { useRouter } from 'next/navigation'; // Importa useRouter

function Page() {
    const { cart, removeFromCart, calculateTotal, clearCart } = useCartContext(); // Asegúrate de que clearCart esté definido en tu contexto
    const [modalVisible, setModalVisible] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const router = useRouter(); // Inicializa useRouter

    const handleFinalizePurchase = async () => {
        try {
            const total = calculateTotal();
            const id = await createPurchaseTicket(cart, total);
            setTicketId(id);
            setModalVisible(true);
            // Opcional: Limpiar el carrito después de la compra
            // clearCart();
        } catch (error) {
            console.error("Error finalizing purchase:", error);
            // Manejar errores aquí si es necesario
        }
    };

    const handleCloseModal = () => {
        clearCart(); // Limpia el carrito
        setModalVisible(false); // Cierra el modal
        router.push('/'); // Redirige al índice
    };

    return (
        <section className='lg:flex lg:my-16 min-h-screen'>
            <article className='mt-4 lg:w-[60vw] lg:ml-[8vw]'>
                {cart.map((item, index) => (
                    <div className='flex bg-white rounded-lg shadow m-4 dark:bg-white-800 p-4' key={`${item.id}-${index}`}>
                        <Image src={item.img} alt='Productos carrito' width={100} height={100} className='xl:w-1/6' />
                        <div className='flex flex-col justify-around flex-grow mt-5'>
                            <div className='flex justify-around items-center -m-5 text-teal-900 font-black'>
                                <p className='text-sm lg:text-lg text-teal-900'>{item.name}</p>
                                <p className='text-sm lg:text-lg'>${item.price}</p>
                            </div>
                            <div className='flex justify-around items-center font-black'>
                                <p className='text-sm lg:text-lg text-teal-900 text-black'>Cantidad: {item.quantity}</p>
                                <button
                                    type='button'
                                    className='flex items-center text-sm text-red-600 ml-10'
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Quitar 
                                    <Image src='/cancell.png' width={10} height={10} alt='quit' className='ml-2 lg:text-lg' />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </article>

            <aside className='bg-white rounded-lg shadow m-4 dark:bg-white-800 py-4 xl:h-[225px] xl:mt-[32px] text-teal-900'>
                <h3 className='px-5'>Resumen de compra</h3>
                <div className='flex justify-between px-5 my-2'>
                    <p>Productos</p>
                    <p>{cart.reduce((total, item) => total + item.quantity, 0)}</p>
                </div>

                <div className='flex justify-between px-5 my-2'>
                    <p>Envío</p>
                    <p>Gratis</p>
                </div>

                <div className='flex justify-between px-5 my-3 mb-5'>
                    <p className='font-black'>Total</p>
                    <p className='font-black'>${calculateTotal()}</p>
                </div>

                <div className="flex justify-center px-20">
                    <button
                        type="button"
                        className="w-full px-6 py-3.5 text-base text-gray-900 bg-teal-900 border border-gray-300 focus:outline-none hover:bg-teal-900 focus:ring-4 focus:ring-teal-900 font-medium rounded-lg text-sm mb-3 dark:bg-teal-900 dark:text-white dark:border-teal-900 dark:hover:bg-teal-900 dark:hover:border-teal-900 dark:focus:ring-teal-900"
                        onClick={handleFinalizePurchase}
                    >
                        Finalizar compra
                    </button>
                </div>
            </aside>

            {/* Modal */}
            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
                    <div className="bg-white rounded-lg shadow m-4 dark:bg-pink-100 p-5 rounded-lg shadow-lg text-teal-900">
                        <h2 className="text-lg font-bold mb-2 text-center text-teal-900 text-black">COMPRA REALIZADA</h2>
                        <p className='text-center pt-3 text-semibold'>Su compra ha sido realizada con éxito. Le estaremos enviando un correo con los detalles.</p>
                        <p className='text-center pt-3 text-teal-900 text-black'>Su ticket de compra es: <strong>{ticketId}</strong></p>
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-teal-900 text-white rounded"
                                onClick={handleCloseModal} // Llama a handleCloseModal al hacer clic
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Page;
