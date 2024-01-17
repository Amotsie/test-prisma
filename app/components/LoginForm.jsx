import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '', });

    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('[LOGIN FORM] Handle Login');

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            let data = await response.json();

            if (response.status === 200) {
                //redirect to wine list
                router.push('/list')
            } else {
                setLoginError(data.message);
            }
        } catch (err) {
            console.error(err);
            setLoginError('Invalid email or password. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {loginError && (
                <div className="mb-4 text-red-500">
                    {loginError}
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
