"use client";
import React from "react";
import ProductsTable from "../components/ProductsTable";
import { useRouter } from "next/navigation";


function Admin() {

  const router = useRouter();

  
const handleCreateProduct = () => {
  router.push("/admin/create");
};

const handleContact = () => {
  router.push("/admin/contact");
};

const handleSales = () => {
  router.push("/admin/sales");
};
  
  return (
    <div className="mt-6">
      <h2 className="text-2xl text-teal-900 font-black font-semibold ml-8 my-8 lg:text-5xl lg:ml-16 lg:py-5 xl:mt-0 xl:mb-6">
        Panel de administración
      </h2>

      <div className="flex flex-wrap mb-2 xl:-mb-4">
        <div>
          <button
            className="inline-flex items-center ml-7 mb-4 px-3 py-2 text-sm font-medium text-center text-white bg-teal-900 rounded-lg hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-900 dark:bg-teal-900 dark:hover:bg-teal-900 dark:focus:ring-teal-900 xl:ml-16 xl:mb-12 text-l"
            onClick={handleCreateProduct}
          >
            Crear producto
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>

        <div>
          <button
            className="inline-flex items-center ml-5 mb-2 px-3 py-2 text-sm font-medium text-center text-white bg-teal-900 rounded-lg hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-900 dark:bg-teal-900 dark:hover:bg-teal-900 dark:focus:ring-teal-900 xl:ml-16 xl:mb-12 text-l"
            onClick={handleSales}
          >
            Ventas
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>

        <div>
          <button
            className="inline-flex items-center ml-7 mb-8 px-3 py-2 text-sm font-medium text-center text-white bg-teal-900 rounded-lg hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-900 dark:bg-teal-900 dark:hover:bg-teal-900 dark:focus:ring-teal-900 xl:ml-16 xl:mb-12 text-l"
            onClick={handleContact}
          >
            Consultas
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>

      <ProductsTable />
    </div>
  );
}

export default Admin;
