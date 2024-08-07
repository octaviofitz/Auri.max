'use client';
import React from 'react';
import ProductList from '@/app/components/ProductList.js';
import Data from '../../../data/Data.js';
import { useParams } from 'next/navigation';

const Page = () => {
    const { categoria } = useParams();

    console.log('Category:', categoria);

    const filterData = categoria === "all"
        ? Data
        : Data.filter((item) => 
            item.category && item.category.toLowerCase() === categoria?.toLowerCase()
        );

    console.log('Filter Data:', filterData);

    return (
        <div>
            <ProductList data={filterData} />
        </div>
    );
}

export default Page;
