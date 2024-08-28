'use client'
import React, { useEffect, useState } from 'react';
import ProductList from '@/app/components/ProductList.js';
import { useParams } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/config/firebase.js';

const getProducts = async (category) => {
    try {
        const productRef = collection(db, "products");
        const q = category === "all" 
            ? productRef 
            : query(productRef, where("category", "==", category.toLowerCase()));

        const querySnapshot = await getDocs(q);
        
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        
        console.log("Filtered Products:", products);
        return products || []; // Asegura que siempre retorne un arreglo
    } catch (error) {
        console.error("Error fetching products:", error);
        return []; // En caso de error, retorna un arreglo vacío
    }
}

const Page = () => {
    const { categoria } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts(categoria);
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, [categoria]);

    return (
        <div>
            {Array.isArray(products) && products.length > 0 ? (
                <ProductList data={products} />
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Page;
