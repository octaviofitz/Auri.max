import React from 'react';
import Image from 'next/image';

function Contacto() {
    return (
        <section className='flex flex-col lg:flex-row lg:justify-around lg:items-start py-12 bg-pink-100'>
            <div className='lg:w-1/2 flex justify-center lg:justify-end mb-10 lg:mb-0'>
                <Image
                    src='/contacto.webp'
                    width={320}
                    height={320}
                    alt='Contacto Aurimax'
                    className='rounded-xl md:w-1/2 lg:w-3/4'
                />
            </div>
            <div className='px-[12vw] lg:w-1/2 lg:px-[1vw]'>
                <h2 className='text-3xl text-teal-900 mb-8 lg:text-left font-black'>
                    Contacto
                </h2>
                <p className='text-teal-900 font-normal text-lg'>En Aurimax, nos apasiona ofrecerte la mejor experiencia de sonido con auriculares de alta calidad. Si tienes alguna consulta sobre nuestros productos, envíos o necesitas asistencia personalizada, no dudes en ponerte en contacto con nosotros. Completa el formulario y te responderemos a la brevedad. ¡Estamos aquí para ayudarte!</p>

                <form className="max-w-md mx-auto lg:mx-0 py-10 xl:py-20">
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
                            <input
                                type="text"
                                name="name"
                                required
                                id="floating_first_name"
                                className="block py-2.5 px-0 w-full text-sm text-teal-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-900 focus:outline-none focus:ring-0 focus:border-teal-900 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="floating_first_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-900 peer-focus:dark:text-teal-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nombre y apellido
                            </label>
                        </div>
                    </div>

                    <div className="relative z-0 w-full mb-5 xl:mb-10 group">
                            <input
                                type="email"
                                name="name"
                                required
                                id="floating_first_name"
                                className="block py-2.5 px-0 w-full text-sm text-teal-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-900 focus:outline-none focus:ring-0 focus:border-teal-900 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="floating_first_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-900 peer-focus:dark:text-teal-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Correo electrónico
                            </label>
                        </div>                

                    <div className="relative z-0 w-full mb-5 xl:mb-10 group">
                        <textarea
                            name="description"
                            id="floating_company"
                            required
                            className="block py-2.5 px-0 w-full text-sm text-teal-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-900 focus:outline-none focus:ring-0 focus:border-teal-900 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_company"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-900 peer-focus:dark:text-teal-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Descripción
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-teal-900 hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-900 dark:hover:bg-teal-900 dark:focus:ring-teal-900"
                    >
                        Enviar consulta
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contacto;
