import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ id, img, name, price, description }) => {
  return (
    <div className="w-[85vw] max-w-sm bg-white border border-pink-100 border-3 rounded-lg shadow dark:bg-white-800 dark:border-white-700 mx-auto my-4 md:max-w-sm">
      <Link href={`/articulo/${id}`}>
        <Image src={img} alt={name} width={500} height={300} className="rounded-t-lg" />
      </Link>
      <div className="p-5">
        <Link href={`/articulo/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-teal-900 dark:text-teal-900">{name}</h5>
        </Link>
        <p className="mb-3 font-normal text-teal-900 dark:text-teal-900 overflow-hidden truncate">{description}</p>
        <Link href={`/articulo/${id}`}>
          <button className="inline-flex items-center px-3 py-2 font-medium text-base text-center text-white bg-teal-900 rounded-lg hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-900 dark:bg-teal-900 dark:hover:bg-teal-900 dark:focus:ring-teal-900">
            Ver más
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
