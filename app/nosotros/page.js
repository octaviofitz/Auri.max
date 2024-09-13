import React from 'react';
import Image from 'next/image';

function Nosotros() {
    return (
        <section className='bg-pink-100 flex flex-col lg:flex-row px-4 md:px-12 py-8 lg:justify-around'>
            <div className='lg:w-5/12'>
            <h3 className='text-cyan-950 text-left text-5xl font-extrabold pl-2 py-10'>Aurimax es calidad</h3> 
            <p className='text-cyan-950 pl-2 text-lg pb-4'>En Aurimax, nos dedicamos a ofrecer productos innovadores y de alta calidad para mejorar la vida diaria de nuestros clientes. Nos enfocamos en crear soluciones que combinan diseño, tecnología y funcionalidad, garantizando una experiencia única en cada compra. Nuestro compromiso es brindar un servicio excepcional y un catálogo que se adapta a las necesidades actuales.</p>
            <p className='text-cyan-950 pl-2 text-lg pb-6'>Nuestro equipo está compuesto por profesionales apasionados que trabajan incansablemente para garantizar la satisfacción de nuestros clientes. Valoramos la confianza que depositan en nosotros, por lo que nos esforzamos en mantener altos estándares de calidad en todos nuestros productos.</p>
            </div>
            <div className="flex justify-center items-center pt-4 pb-6 lg:w-6/12">
                 <Image src='/nosotros.webp' alt='Aurimax' width={320} height={320} className='block rounded md:w-5/6 ' />
                    </div>
        </section>
    );
}

export default Nosotros;