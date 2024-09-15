import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ data }) {
  return (
    <div className="w-screen border-box flex flex-col flex-wrap md:flex-row lg:flex-wrap lg:justify-between">
      {data.map((product, index) => (
        <div key={index} className="w-full p-2 md:w-1/2 lg:w-1/2 lg:px-2 lg:py-4 xl:w-1/3">
          <ProductCard
            id={product.id} 
            img={product.img}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
