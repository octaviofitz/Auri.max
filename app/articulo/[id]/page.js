'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import { useCartContext } from '@/app/context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [errorMessage, setErrorMessage] = useState(''); // Manejar errores de stock

  const min = 1;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data();
          setProduct({ id: productSnap.id, ...data });
          setStock(data.stock); // Setear el stock
        } else {
          console.log('No se encontró producto!');
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      setErrorMessage(''); // Limpiar mensaje de error si el incremento es válido
    } else {
      setErrorMessage(`No puedes agregar más de ${stock} productos.`);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
      setErrorMessage(''); // Limpiar mensaje de error si el decremento es válido
    }
  };

  const handleAddToCart = () => {
    if (quantity <= stock) {
      addToCart({ ...product, quantity, stock });
      setErrorMessage(''); // Limpiar mensaje de error si se añade correctamente
    } else {
      setErrorMessage(`No puedes agregar más de ${stock} productos.`);
    }
  };

  if (!product) {
    return <div className="text-center mt-8 text-xl">Cargando...</div>;
  }

  return (
    <div className="container mx-auto my-8 bg-amber-50 lg:my-20 max-w-full overflow-x-hidden">
      <div className="mx-auto bg-amber-50 rounded-lg md:w-3/4 lg:flex lg:justify-around lg:w-full max-w-full"> {/* Ajustamos el ancho a `w-full` y max-w-full */}
        <div className="lg:w-[40vw]"> {/* Imagen ocupa 40vw en pantallas grandes */}
          <Image
            src={product.img}
            alt={product.name}
            width={500}
            height={300}
            className="rounded-t-lg object-cover w-full h-auto md:w-[55vw] m-auto"
          />
        </div>
        <div className="px-10 lg:w-[60vw]"> {/* Información del producto ocupa 60vw en pantallas grandes */}
          <h2 className="text-5xl font-bold text-teal-900 font-black mb-2 xl:text-6xl xl:mb-6">{product.name}</h2>
          <p className="text-3xl font-black py-4 text-teal-900 rounded-lg inline-block xl:text-4xl">
            ${product.price}
          </p>
          <p className="text-sm mb-4 font-semi-bold xl:text-base xl:mb-6">Stock: {stock}</p>
          <p className="text-black-700 mb-4 font-semi-bold break-words w-full overflow-hidden lg:pr-20 xl:text-lg">
            {product.description}</p>
          <div className='flex'>
            <div>
              <Image src='/envios.svg' alt='' width={40} height={40} />
            </div>
            <div className='pt-1.5 pl-3'>
              <span className='text-teal-900 text-black-700 font-semi-bold pt-4'>Envios gratis</span>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <form className="flex items-center">
              <button
                type="button"
                onClick={decrement}
                className="bg-gray-100 dark:bg-teal-900 dark:hover:bg-teal-600 dark:border-gray-600 hover:bg-teal-600 border border-gray-300 rounded-l-lg p-2 h-12 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
              </button>
              <input
                type="text"
                id="quantity-input"
                value={quantity}
                className="bg-teal-900 border-x-0 border-gray-300 h-12 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-12 pb-6 dark:bg-teal-900 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pt-5"
                readOnly
              />
              <button
                type="button"
                onClick={increment}
                className="bg-gray-100 dark:bg-teal-900 dark:hover:bg-teal-600 dark:border-gray-600 hover:bg-teal-600 border border-gray-300 rounded-r-lg p-2 h-12 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </form>

            <button
              onClick={handleAddToCart}
              type="button"
              className={`ml-4 px-10 h-12 mt-3 text-base text-gray-900 ${stock === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-900'} border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm mb-3 dark:${stock === 0 ? 'bg-gray-300' : 'bg-teal-900'} dark:text-white dark:border-gray-600 ${stock === 0 ? 'dark:cursor-not-allowed' : 'dark:hover:bg-teal-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
              disabled={stock === 0}
            >
              Agregar al carrito
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>} {/* Mostrar mensaje de error */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
