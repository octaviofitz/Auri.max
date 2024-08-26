import React from 'react';
import Image from 'next/image';

function loading() {
    return (
        <div className='w-full h-full min-h-screen flex justify-center items-center'>
           <h2>Cargando Categoría</h2>
        </div>
    );
}

export default loading;