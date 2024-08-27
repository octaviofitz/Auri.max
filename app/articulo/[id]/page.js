'use client'
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-8 text-xl"></div>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="max-w-xl mx-auto bg-gray-800 border border-gray-200 rounded-lg shadow md:w-3/4 lg:w-1/2 xl:w-1/3">
        <Image
          src={product.img}
          alt={product.name}
          width={500}
          height={300}
          className="rounded-t-lg object-cover"
        />
        <div className="p-5 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
          <p className="text-black-700 mb-4 font-semi-bold">{product.description}</p>
          <p className="text-lg font-semibold py-2 px-4 rounded-lg inline-block">
            ${product.price}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col items-center -mt-3 mb-4">
          <div className="w-[75vw] md:w-[20vw]">
            <button
              onClick={() => addToCart(product)}
              type="button"
              className="w-full px-6 py-3.5 text-base text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm mb-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Agregar al carrito
            </button>
          </div>
          <div className="w-[75vw] md:w-[20vw]">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
