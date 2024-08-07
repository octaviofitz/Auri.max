import React from 'react';
import CategoriasCard from './CategoriasCard';

function CategoriasList({ data }) {

  return (
    <div className="flex flex-wrap justify-center lg:justify-between">
      {data.map((product, index) => {
        // Verifica que product.category tenga un valor válido
        console.log('Product category:', product.name);
        const href = `/productos/${product.name}`;
        
        return (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2 box-border">
            <CategoriasCard
              img={product.img}
              name={product.name}
              description={product.description}
              href={href}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CategoriasList;
