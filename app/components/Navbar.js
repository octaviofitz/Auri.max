// components/Navbar.js
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MenuIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import ModalCart from '../components/ModalCart';  // Verifica la ruta

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/navbar.png" alt="Flowbite Logo" width={32} height={32} className="h-8" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AuriMax</span>
        </Link>

        <div className="flex items-center md:hidden">
          <ShoppingCartIcon onClick={toggleModal} className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-4" />
          <button
            onClick={toggleNavbar}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full md:flex md:items-center md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                onClick={closeNavbar}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/productos"
                onClick={closeNavbar}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/nosotros"
                onClick={closeNavbar}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                onClick={closeNavbar}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contacto
              </Link>
            </li>
            <li className="ml-auto hidden md:block">
              <ShoppingCartIcon onClick={toggleModal} className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer" />
            </li>
          </ul>
        </div>
      </div>

      {/* Modal */}
      <ModalCart isOpen={isModalOpen} toggleModal={toggleModal}/>
    </nav>
  );
}
