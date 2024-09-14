// src/components/auth/LoginForm.js
'use client'
import { useState } from 'react';
import { useAuthContext } from '@/app/context/AuthContext';

function LoginForm() {
    const { registerUser, loginUser, error } = useAuthContext();
    const [values, setValues] = useState({
        email: "",
        password: "",
        isLogin: true
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.isLogin) {
            await loginUser(values.email, values.password);
        } else {
            await registerUser(values.email, values.password);
        }
    };

    return (
        <div>
            <h2 className='text-teal-900 font-black text-3xl -mb-4 text-center xl:text-6xl mt-6 lg:mt-12 xl:-mb-0'>Iniciar sesión</h2>
            <form className="max-w-sm mx-auto p-10 pb-30" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-teal-900">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="bg-white border border-gray-300 text-teal-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-teal-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-semibold dark:text-teal-900">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-teal-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                {error && (
                    <div className="mb-5 text-red-500">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    className="text-white bg-teal-900 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-900 dark:hover:bg-teal-600 dark:focus:ring-teal-900"
                >
                    {values.isLogin ? "Ingresar" : "Registrarme"}
                </button>
                <button
                    type="button"
                    className="text-white bg-teal-900 hover:bg-teal-900 sm:ml-4 focus:ring-4 focus:outline-none focus:ring-teal-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-900 dark:hover:bg-teal-600 dark:focus:ring-teal-900 mt-2"
                    onClick={() => setValues({ ...values, isLogin: !values.isLogin })}
                >
                    {values.isLogin ? "Registrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
