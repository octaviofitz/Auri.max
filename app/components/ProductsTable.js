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
    <div className="relative overflow-x-auto mb-12 shadow-md sm:rounded-lg xl:my-10 xl:mx-10">

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
        <thead className="text-xs text-black uppercase bg-pink-100 dark:bg-red-100 dark:text-black">
          <tr className="text-teal-900 font-black text-base">
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
                className="bg-white text-teal-900 font-bold border-b dark:bg-pink-100 dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-pink-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black text-xl"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4 text-black-900">{product.id}</td>
                <td className="px-6 py-4 text-black-900">{product.category}</td>
                <td className="px-6 py-4 text-black-900">{product.stock}</td>
                <td className="px-6 py-4 text-black-900">${product.price}</td>
                <td className="px-6 py-4 text-black-900">
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
                    className="font-black text-blue-600 dark:text-blue-500 hover:underline mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="font-black text-red-600 dark:text-red-500 hover:underline -ml-1 mt-3"
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
