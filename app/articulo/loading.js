import React from 'react';
import Image from 'next/image';

function loading() {
    return (
        <div className='w-full h-full min-h-screen flex justify-center items-center'>
           <h1>cargando Producto...</h1>
        </div>
    );
}

export default loading;
