import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

const EditWineForm = ({ editData }) => {
    let initialFormData = {
        name: editData.name,
        year: editData.year,
        type: editData.type,
        varietal: editData.verietal,
        rating: editData.rating,
        consumed: editData.consumed ? true : false,
        dateConsumed: editData.dateConsumed ? new Date(editData.dateConsumed) : null
    }

    const router = useRouter();

    const [formData, setFormData] = useState(initialFormData);

    const [editError, setEditError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log("EDIT WINE FORM - Handle change")
        console.log(checked, value)
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDateChange = (date) => {
        console.log("EDIT WINE FORM - Handle Date change");
        let ISODate = new Date(String(date)).toISOString();
        setFormData((prevData) => ({
            ...prevData,
            dateConsumed: new Date(ISODate),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            wineId: editData.id,
            name: formData.name,
            year: parseInt(formData.year),
            type: formData.type,
            verietal: formData.varietal,
            rating: parseFloat(formData.rating),
            ownerId: 1,
            consumed: formData.consumed,
            dateConsumed: formData.consumed && formData.dateConsumed ? formData.dateConsumed.toISOString() : null
        }

        try {
            const response = await fetch("/api/wines", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            if (response.status === 201) {
                //redirect to wine list
                router.push('/list')
            } else {
                setEditError("Wine adit failed, please try again.");
            }
        } catch (err) {
            console.error(err);
            setEditError('Invalid email or password. Please try again.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Edit Wine</h1>
                {editError && (
                    <div className="mb-4 text-orange-700 border border-amber-500 rounded-md py-1 px-2 text-center bg-amber-100">
                        {editError}
                    </div>
                )}
                <label htmlFor="name" className="mb-4">
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
                    id="consumed"
                    name="consumed"
                    checked={formData.consumed}
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
                    disabled={!formData.consumed}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Save Wine
            </button>
        </form>
    );
};

export default EditWineForm;
