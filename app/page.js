'use client'
import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/config/firebase.js';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productRef = collection(db, "products");
                const querySnapshot = await getDocs(productRef);
                
                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section>
            <h1 className="text-2xl text-white font-semibold ml-8 mt-7 mb-3 lg:text-5xl lg:ml-16 lg:py-5">
                Todos los productos
            </h1>
            <ProductList category={'all'} data={products} />
        </section>
    );
}
