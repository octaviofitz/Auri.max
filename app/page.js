import React from "react";
import Data from '../data/Data.js';
import ProductList from "./components/ProductList.js";

export default function Home({}) {
  
  return (
    <div>
      <ProductList category={'all'} data={Data} />
    </div>
  );
}
