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
        return Swal.fire({
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
        throw error; // Lanza el error para manejarlo en el componente si es necesario
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
        try {
            await updateProduct(productId, values, file);
            // Redirigir después de mostrar la alerta de éxito
            router.push('/admin');
        } catch (error) {
            // Manejo del error si es necesario
        }
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
                            id="floating_company"
                            value={values.price}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_company"
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

                <div className="relative z-0 w-full mb-5 xl:mb-10 group">
                    <textarea
                        name="description"
                        id="floating_description"
                        rows="4"
                        value={values.description}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Descripción
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 xl:mb-10 group">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Imagen (opcional)
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    );
}
