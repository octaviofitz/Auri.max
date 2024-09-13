'use client';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../config/firebase';
import CategoriasList from '../components/CategoriasList.js';

function Page() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const categoryCollection = collection(db, 'categorys');
            const categorySnapshot = await getDocs(categoryCollection);
            const categoryList = categorySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategories(categoryList);
        };

        fetchData();
    }, []);

    return (
        <div className='pt-[75px] min-h-screen'>
            <h3 className='text-5xl text-teal-900 px-10 font-black -mt-4 mb-6 lg:text-center lg:text-6xl lg:mb-12'>Elegí tu tipo de auriculares</h3>
            <CategoriasList data={categories} />
        </div>
    );
}

export default Page;
