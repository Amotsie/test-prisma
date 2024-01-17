import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

const WineForm = () => {
    const initialFormData = {
        name: '',
        year: '',
        varietal: '',
        rating: '',
        wineType: '',
        isConsumed: false, // Checkbox state
        dateConsumed: null, // Date picker state
    }

    const [formData, setFormData] = useState(initialFormData);

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log("[WINE FORM] - Handle change")
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDateChange = (date) => {
        console.log("[WINE FORM] - Handle Date change");
        let ISODate = new Date(String(date)).toISOString();

        setFormData((prevData) => ({
            ...prevData,
            dateConsumed: new Date(ISODate),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            name: formData.name,
            year: parseInt(formData.year),
            type: formData.wineType,
            verietal: formData.varietal,
            rating: parseFloat(formData.rating),
            ownerId: 1,
            consumed: formData.isConsumed,
            dateConsumed: formData.isConsumed && formData.dateConsumed ? formData.dateConsumed.toISOString() : null
        }

        try {
            const response = await fetch("/api/wines", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            let jsonData = await response.json();
            if (response.status === 201) {
                setResponseMessage("Added successfully, check wine list");
                setFormData(initialFormData);
                setTimeout(() => {
                    setResponseMessage("");
                }, "3000");
            } else {
                setResponseMessage(jsonData.message);
            }
        } catch (err) {
            console.error(err)
            setResponseMessage("Wine not added, please try again");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {responseMessage && (
                <div className="mb-4 text-green-700 border border-green-500 rounded-md py-1 px-2 text-center bg-lime-100">
                    {responseMessage}
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="year" className="block text-sm font-medium text-gray-600">
                    Year
                </label>
                <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="wineType" className="block text-sm font-medium text-gray-600">
                    Wine Type
                </label>
                <select
                    id="wineType"
                    name="wineType"
                    value={formData.wineType}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                >
                    <option value="">Select Wine Type</option>
                    <option value="RED">Red</option>
                    <option value="WHITE">White</option>
                    <option value="ROSE">Rosé</option>
                    <option value="RED_BLEND">Red blend</option>
                    <option value="WHITE_BLEND">White blend</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="varietal" className="block text-sm font-medium text-gray-600">
                    Varietal
                </label>
                <input
                    type="text"
                    id="varietal"
                    name="varietal"
                    value={formData.varietal}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-600">
                    Rating
                </label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Consumed</label>
                <input
                    type="checkbox"
                    id="isConsumed"
                    name="isConsumed"
                    checked={formData.isConsumed}
                    onChange={handleChange}
                    className="mr-2"
                />
                <span className="text-sm text-gray-600">Check if consumed</span>
            </div>

            <div className="mb-4">
                <label htmlFor="dateConsumed" className="block text-sm font-medium text-gray-600">
                    Date Consumed
                </label>
                <DatePicker
                    id="dateConsumed"
                    selected={formData.dateConsumed}
                    onChange={handleDateChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    disabled={!formData.isConsumed}
                />
            </div>

            <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Add Wine
                </button>
                <Link
                    href={'/list'}
                    className='bg-blue-100 text-black p-2 rounded-md hover:bg-blue-300 hover:text-blue-600'
                >
                    View List
                </Link>
            </div>
        </form>
    );
};

export default WineForm;
