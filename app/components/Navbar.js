'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MenuIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import ModalCart from '../components/ModalCart';  
import { useCartContext } from '../context/CartContext';  

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart } = useCartContext();  

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

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);  // Calcula la cantidad total de productos

  return (
    <nav className="bg-white border-pink-100 dark:bg-white-900 relative w-full sm:w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/navBar.svg" alt="Flowbite Logo" width={52} height={52} className="h-16 text-teal-900" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-teal-900">AuriMax</span>
        </Link>

        <div className="flex items-center md:hidden">
          <div className="relative">
            <ShoppingCartIcon onClick={toggleModal} className="w-6 h-6 text-teal-900 dark:text-teal-900 mr-2" />
            {totalItems > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={toggleNavbar}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-teal-900 rounded-lg hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-pink-100 dark:text-teal-900 dark:hover:bg-pink-100 dark:focus:ring-pink-100"
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-pink-100 rounded-lg bg-pink-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-white-100 md:dark:bg-white-100 dark:border-pink-100">
  <li>
    <Link
      href="/"
      onClick={closeNavbar}
      className="block py-2 px-3 text-teal-900 text-xl bg-white-700 rounded md:bg-transparent md:text-teal-900 md:p-0 dark:text-teal-900 md:dark:text-teal-900 font-black hover:text-teal-600"
      aria-current="page"
    >
      Inicio
    </Link>
  </li>
  <li>
    <Link
      href="/productos"
      onClick={closeNavbar}
      className="block py-2 px-3 text-teal-900 text-xl rounded hover:bg-teal-600 md:hover:bg-transparent md:border-0 md:hover:text-teal-600 md:p-0 dark:text-teal-900 md:dark:hover:text-teal-600 dark:hover:bg-teal-600 dark:hover:text-teal-900 md:dark:hover:bg-transparent font-black" 
    >
      Productos
    </Link>
  </li>
  <li>
    <Link
      href="/nosotros"
      onClick={closeNavbar}
      className="block py-2 px-3 text-teal-900 text-xl rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-teal-900 md:dark:hover:text-teal-600 dark:hover:bg-teal-600 dark:hover:text-teal-900 md:dark:hover:bg-transparent font-black"
    >
      Nosotros
    </Link>
  </li>
  <li>
    <Link
      href="/contacto"
      onClick={closeNavbar}
      className="block py-2 px-3 text-teal-900 text-xl rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-teal-900 md:dark:hover:text-teal-600 dark:hover:bg-teal-600 dark:hover:text-teal-900 md:dark:hover:bg-transparent font-black"
    >
      Contacto
    </Link>
  </li>
  <li className="ml-auto hidden md:block">
    <div className="relative">
      <ShoppingCartIcon
        onClick={toggleModal}
        className="w-6 h-6 text-teal-900 dark:text-teal-900 cursor-pointer dark:hover:text-teal-600"
      />
      {totalItems > 0 && (
        <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  </li>
</ul>

        </div>
      </div>

      <ModalCart isOpen={isModalOpen} toggleModal={toggleModal}/>
    </nav>
  );
}
