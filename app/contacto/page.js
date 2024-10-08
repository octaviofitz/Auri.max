'use client'

import React, { useState } from "react";
import Image from "next/image";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Swal from 'sweetalert2';

async function sendContactInfo(name, email, message) {
  try {
    const contactDoc = doc(db, "contacts", Date.now().toString());
    await setDoc(contactDoc, {
      name,
      email,
      message,
      timestamp: new Date()
    });

    Swal.fire({
      title: '¡Éxito!',
      text: 'Tu mensaje ha sido enviado correctamente. Te estaremos respondiendo a la brevedad',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}

function Contacto() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendContactInfo(values.name, values.email, values.message);
    setValues({ name: '', email: '', message: '' });
  };

  return (
    <section className="flex flex-col my-8 mx-3 md:my-12 md:mx-10 lg:flex-row lg:justify-around lg:items-start bg-pink-100 lg:pt-20 lg:mt-10 lg:mx-10 rounded-lg">
      <div className="pt-10 lg:w-1/2 flex justify-center lg:justify-end mb-10 lg:mb-0 lg:pt-0">
        <Image
          src="/contacto.webp"
          width={320}
          height={320}
          alt="Contacto Aurimax"
          className="md:w-1/2 lg:w-[40vw] rounded-lg lg:ml-6"
        />
      </div>

      <div className="px-[12vw] lg:w-[60vw] lg:pl-16 lg:pr-6">
        <h2 className="text-3xl text-teal-900 mb-8 lg:text-left font-black xl:text-5xl">
          Contacto
        </h2>
        <p className="text-teal-900 font-normal text-lg lg:text-lg 2xl:text-2xl">
          En Aurimax, nos apasiona ofrecerte la mejor experiencia de sonido con
          auriculares de alta calidad. Si tienes alguna consulta sobre nuestros
          productos, envíos o necesitas asistencia personalizada, no dudes en
          ponerte en contacto con nosotros. Completa el formulario y te
          responderemos a la brevedad. ¡Estamos aquí para ayudarte!
        </p>

        <form className="max-w-md mx-auto lg:mx-0 py-10 xl:py-20 sm:pr-20 sm:max-w-none md:pr-50 lg:-mt-8" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 xl:mb-10 group xl:pr-60">
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-lg text-teal-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-900 focus:outline-none focus:ring-0 focus:border-teal-900 peer lg:"
                placeholder=" "
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-900 peer-focus:dark:text-teal-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 lg:text-base"
              >
                Nombre
              </label>
            </div>

          <div className="relative z-0 w-full mb-5 xl:mb-10 group lg:-mt-2 xl:pr-60">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              id="floating_email"
              className="block py-2.5 px-0 w-full text-base text-teal-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-900 focus:outline-none focus:ring-0 focus:border-teal-900 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-900 peer-focus:dark:text-teal-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Correo electrónico
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 xl:mb-10 group lg:-mt-2 xl:pr-60">
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              required
              id="floating_message"
              rows="3"
              className="block py-2.5 px-0 w-full text-lg text-teal-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-900 focus:outline-none focus:ring-0 focus:border-teal-900 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_message"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mensaje
            </label>
          </div>

          <button
            type="submit"
            className="text-white mt-6 bg-teal-900 hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-900 font-medium text-base rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-900 dark:hover:bg-teal-900 dark:focus:ring-teal-900"
          >
            Enviar consulta
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contacto;
