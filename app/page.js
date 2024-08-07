import React from "react";
import Data from '../data/Data.js';
import ProductList from "./components/ProductList.js";

export default function Home({}) {
  
  return (
    <section>
      <h1 className="text-2xl text-white font-semibold ml-8 mt-7 mb-3 lg:text-5xl lg:ml-16 lg:py-5">Todos los productos</h1>
      <ProductList category={'all'} data={Data} />
    </section>
  );
}
