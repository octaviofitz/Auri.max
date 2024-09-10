import React from 'react';
import EditForm from '@/app/components/EditForm';

function page({params}) {
    return (
        <div>
            <EditForm productId={params.id} />
        </div>
    );
}

export default page;