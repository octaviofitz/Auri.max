import React from 'react';
import DataCategory from '../../data/CategoryData.js';
import CategoriasList from '../components/CategoriasList.js';

function page() {
    return (
        <div>
            <CategoriasList data={DataCategory} />
        </div>
    );
}

export default page;
