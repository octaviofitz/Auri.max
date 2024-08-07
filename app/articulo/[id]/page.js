// app/articulos/[id]/page.js
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
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-lg shadow">
        <Image src={product.img} alt={product.name} width={500} height={300} className="rounded-t-lg" />
        <div className="p-5">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-lg font-semibold bg-red-300 mt-4">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
