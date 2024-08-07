import Image from 'next/image';
import Data from '../../../data/Data';

export async function generateStaticParams() {
  const paths = Data.map((product) => ({
    id: product.id.toString(),
  }));

  return paths;
}

const ProductPage = ({ params }) => {
  const product = Data.find((prod) => prod.id.toString() === params.id);

  if (!product) {
    return <div className="text-center mt-8 text-xl">Producto no encontrado</div>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="max-w-xl mx-auto bg-gray-800 border border-gray-200 rounded-lg shadow md:w-3/4 lg:w-1/2 xl:w-1/3">
        <Image
          src={product.img}
          alt={product.name}
          width={500}
          height={300}
          className="rounded-t-lg object-cover"
        />
        <div className="p-5 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
          <p className="text-black-700 mb-4 font-semi-bold">{product.description}</p>
          <p className="text-lg font-semibold py-2 px-4 rounded-lg inline-block">
            ${product.price}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col items-center">
          <div className="w-[75vw] md:w-[20vw]">
            <button
              type="button"
              className="w-full px-6 py-3.5 text-base text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm mb-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Agregar al carrito
            </button>
          </div>
          <div className="w-[75vw] md:w-[20vw]">
            <button
              type="button"
              className="w-full px-6 py-3.5 text-base text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mb-10"
            >
              Comprar ahora
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
