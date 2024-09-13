import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-white-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-cyan-950 sm:text-center dark:text-cyan-950 font-extrabold">
          © 2024{' '}
          <Link href="/" className="hover:underline">
            AuriMax
          </Link>
          . Todos los derechos reservados.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-cyan-950 dark:text-cyan-950 sm:mt-0">
          <li>
            <Link href="/productos" className="hover:underline me-4 md:me-6">
              Productos
            </Link>
          </li>
          <li>
            <Link href="/nosotros" className="hover:underline me-4 md:me-6">
              Nosotros
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="hover:underline me-4 md:me-6">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
