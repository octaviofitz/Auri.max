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
        <div className='p-300px'>
            <CategoriasList data={categories} />
        </div>
    );
}

export default Page;
