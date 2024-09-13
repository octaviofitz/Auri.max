import React, { Suspense } from 'react';
import ProductList from './components/ProductList.js';
import { getProducts } from './lib/getProducts.js';

export default async function Home() {
    const products = await getProducts();  

    return (
        <section>
            <h1 className="text-3xl text-pink-100 font-black ml-8 mt-7 mb-3 lg:text-5xl lg:ml-16 lg:py-5">
                Todos los productos
            </h1>
            <Suspense fallback={<div>Cargando...</div>}>
                <ProductList category={'all'} data={products} />
            </Suspense>
        </section>
    );
}
