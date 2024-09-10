"use client";
import { useState, useEffect } from "react";
import { getProducts } from "../lib/getProducts";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [deletingProductId, setDeletingProductId] = useState(null); // Estado para rastrear el producto que se está eliminando
  const router = useRouter();

  const handleCreateProduct = () => {
    router.push('/admin/create');
  };

  useEffect(() => {
    async function fetchProducts() {
      const productsData = await getProducts();
      setProducts(productsData);
    }
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        setDeletingProductId(id); // Establece el ID del producto que se está eliminando
        await deleteDoc(doc(db, "products", id));
        setProducts(products.filter((product) => product.id !== id));
        setDeletingProductId(null); // Restablece el ID del producto que se está eliminando
        Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setDeletingProductId(null); // Restablece el ID del producto en caso de error
      Swal.fire('Error', 'Hubo un problema al eliminar el producto.', 'error');
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg xl:my-10 xl:mx-10 py-5">
      <h2 className="text-2xl text-white font-semibold ml-8 mt-4 mb-4 lg:text-5xl lg:ml-16 lg:py-5 xl:mt-0 xl:mb-6">
        Panel de administración
      </h2>

      <button className="inline-flex items-center ml-7 mb-8 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 xl:ml-16 xl:mb-12 text-l" 
      onClick={handleCreateProduct}>
        Crear producto
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre producto</th>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Categoría</th>
            <th scope="col" className="px-6 py-3">Stock</th>
            <th scope="col" className="px-6 py-3">Precio</th>
            <th scope="col" className="px-10 py-3">Imagen</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={75}
                    height={75}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline -ml-1"
                    disabled={deletingProductId === product.id} // Deshabilita el botón si este producto se está eliminando
                  >
                    {deletingProductId === product.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-20 text-center">
                Cargando productos...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
