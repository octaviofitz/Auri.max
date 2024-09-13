import Image from 'next/image';
import Link from 'next/link';

const CategoriasCard = ({ name, description, img, href }) => {
  return (
    <div className="w-[85vw] max-w-sm bg-white border border-pink-100 rounded-lg shadow dark:bg-white dark:border-pink-100 mx-auto my-4">
      <Link href={href}>
        <Image src={img} alt={name} width={500} height={300} className="rounded-t-lg" />
      </Link>
      <div className="p-5">
        <Link href={href}>
          <h5 className="mb-2 text-3xl text-center font-bold tracking-tight text-teal-900 dark:text-teal-900">{description}</h5>
        </Link>
        <Link href={href}>
        </Link>
      </div>
    </div>
  );
};

export default CategoriasCard;
