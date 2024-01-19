import prisma from '@/lib/prisma';
import React from 'react'
import WineRow from '../components/WineRow';
import Link from 'next/link';

async function getWineList() {
    const list = await prisma.wine.findMany();
    return list;
}

export default async function WineList() {
    const wineList = await getWineList();
    return (
        <main>
            <h1 className="mb-4 mt-2 bt-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white text-center"
            >
                Wine List
            </h1>
            <Link
                href={'/create'}
                className='inline-block ml-3 mb-3 rounded border-2 border-teal-700 px-3 py-2 text-xs font-medium uppercase leading-normal text-emerald-950 transition duration-150 ease-in-out hover:border-teal-600 hover:bg-green-600 hover:bg-opacity-10 hover:text-emerald-600'
            >
                Add Wine
            </Link>
            <div className="flex flex-col mx-3">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border font-medium dark:border-neutral-500 ">
                                    <tr className="bg-teal-700 text-teal-50">
                                        <th scope="col" className="px-6 py-4">ID</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Year</th>
                                        <th scope="col" className="px-6 py-4">Type</th>
                                        <th scope="col" className="px-6 py-4">Varietal</th>
                                        <th scope="col" className="px-6 py-4">Rating</th>
                                        <th scope="col" className="px-6 py-4">Consumed</th>
                                        <th scope="col" className="px-6 py-4">Date Consumed</th>
                                        <th scope="col" className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wineList.map((w) =>
                                        <WineRow key={w.id} data={w} className />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
