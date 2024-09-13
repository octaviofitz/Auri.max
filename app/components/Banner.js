import Image from 'next/image';

function Banner() {
  return (
    <div className="relative w-[100vw] h-[20vh] lg:h-[55vh]">
      <Image
        src="/Banner.jpeg"
        layout="fill" // Ocupa todo el espacio del contenedor
        objectFit="cover" // La imagen mantiene la proporción sin deformarse
        objectPosition="top" // Controla qué parte de la imagen es visible (ejemplo: parte superior)
        alt="Banner Aurimax"
        className="w-full h-full"
      />
    </div>
  );
}

export default Banner;
