import React from 'react';
import DataCategory from '../../data/CategoryData.js';
import CategoriasList from '../components/CategoriasList.js';

function page() {
    return (
        <div className='p-300px'>
            <CategoriasList data={DataCategory} />
        </div>
    );
}

export default page;
