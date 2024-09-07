'use client'
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

const createProduct = async (values, file) => {
    // Crear una referencia al archivo en Firebase Storage
    const storageRef = ref(storage, `products/${values.id}`);
    
    // Subir el archivo
    const fileSnapShot = await uploadBytes(storageRef, file);

    // Obtener la URL de descarga del archivo subido
    const fileURL = await getDownloadURL(fileSnapShot.ref);

    // Guardar los datos del producto en Firestore
    const docRef = doc(db, "products", values.id);
    return setDoc(docRef, {
        ...values,
        img: fileURL
    }).then(() => console.log("Producto agregado"));
};

export default function CreateForm() {
    const [values, setValues] = useState({
        id: '',
        name: '',
        category: '',
        stock: '',
        price: '',
    });

    const [file, setFile] = useState(null);

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
        if (file) {
            await createProduct(values, file);
        } else {
            console.log("No file selected");
        }
    };

    return (
        <div className="mx-4">
            <form onSubmit={handleSubmit}>
                <div className="mt-5">
                    <label>ID</label>
                    <input
                        type="number"
                        value={values.id}
                        name="id"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>

                <div className="mt-5">
                    <label>Nombre producto</label>
                    <input
                        type="text"
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>

                <div className="mt-5">
                    <label>Categoría</label>
                    <input
                        type="text"
                        value={values.category}
                        name="category"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>

                <div className="mt-5">
                    <label>Stock</label>
                    <input
                        type="number"
                        value={values.stock}
                        name="stock"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>

                <div className="mt-5">
                    <label>Precio</label>
                    <input
                        type="number"
                        value={values.price}
                        name="price"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>

                <div className="mt-5">
                    <label>Imagen del producto</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        name='img'
                    />
                </div>

                <button
                    type="submit"
                    className="mt-5 w-full bg-blue-500 text-white p-2 rounded"
                >
                    Crear producto
                </button>
            </form>
        </div>
    );
}
