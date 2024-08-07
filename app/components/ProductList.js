import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ data }) {
  return (
    <div className="flex flex-wrap justify-center lg:justify-between">
      {data.map((product, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2 box-border">
          <ProductCard
            id={product.id}  // Pasamos el id del producto
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
