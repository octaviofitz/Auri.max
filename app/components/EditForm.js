'use client'
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const updateProduct = async (id, values, file) => {
    try {
        let fileURL = values.img; // Mantener la URL de la imagen existente

        // Si hay un nuevo archivo, subirlo a Firebase Storage
        if (file) {
            const storageRef = ref(storage, `products/${id}`);
            const fileSnapShot = await uploadBytes(storageRef, file);
            fileURL = await getDownloadURL(fileSnapShot.ref);
        }

        // Actualizar los datos del producto en Firestore
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
            ...values,
            img: fileURL
        });

        // Mostrar alerta de éxito
        Swal.fire({
            title: '¡Éxito!',
            text: 'Producto editado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al editar el producto',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
};

export default function EditForm({ productId }) {
    const [values, setValues] = useState({
        id: '',
        name: '',
        category: '',
        stock: '',
        price: '',
        model: '',
        description: '',
        img: '',
    });

    const [file, setFile] = useState(null);
    const router = useRouter();

    // Cargar los datos del producto
    useEffect(() => {
        const loadProduct = async () => {
            const docRef = doc(db, "products", productId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const productData = docSnap.data();
                setValues({
                    id: productData.id || '', // Evitar undefined, asegurar que sea un string vacío
                    name: productData.name || '',
                    category: productData.category || '',
                    stock: productData.stock || '',
                    price: productData.price || '',
                    model: productData.model || '',
                    description: productData.description || '',
                    img: productData.img || '',
                });
            } else {
                console.log("No se encontró el producto");
                router.push('/admin'); // Redirigir si no se encuentra el producto
            }
        };

        if (productId) {
            loadProduct();
        }
    }, [productId, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProduct(productId, values, file);
    };

    return (
        <div className="mx-4">
            <form className="max-w-md mx-auto py-10 xl:py-20" onSubmit={handleSubmit}>
      

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nombre del producto
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
          <input
            type="number"
            value={values.id}
            disabled
            name="id"
            onChange={handleChange}
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ID
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
          <input
            type="text"
            name="category"
            id="floating_phone"
            value={values.category}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Categoría
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
          <input
            type="number"
            name="stock"
            id="floating_company"
            value={values.stock}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_company"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Stock
          </label>
        </div>
      </div>


      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
          <input
            type="number"
            name="price"
            id="floating_phone"
            value={values.price}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Precio
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
          <input
            type="text"
            name="model"
            id="floating_company"
            value={values.model}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_company"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Modelo
          </label>
        </div>
      </div>


      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
          <input
            type="text"
            name="description"
            id="largeInput"
            value={values.description}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="large-input"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Descripción
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 xl:mb-10 group">
          
<div className="max-w-lg mx-auto">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Imagen</label>
  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"
  onChange={handleFileChange}
  name='img' />
</div>

        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Editar producto
      </button>
    </form>
        </div>
    );
}
