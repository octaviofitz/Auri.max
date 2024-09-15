import Image from 'next/image';

function Banner() {
  return (
    <div className="relative w-screen max-w-full h-[20vh] lg:h-[55vh] overflow-hidden">
      <Image
        src="/Banner.jpeg"
        layout="fill" // Ocupa todo el espacio del contenedor
        objectFit="cover" // La imagen mantiene la proporción sin deformarse
        objectPosition="top" // Controla qué parte de la imagen es visible
        alt="Banner Aurimax"
        className="w-full h-full"
      />
    </div>
  );
}

export default Banner;
