import React from 'react';
import Image from 'next/image';

function Banner() {
    return (
        <section>
            <Image src='/Banner.webp' width={100} height={200} className='w-[100vw]' alt='Banner Aurimax' />
        </section>
    );
}

export default Banner;