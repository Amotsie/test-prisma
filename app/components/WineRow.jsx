import prisma from '@/lib/prisma';
import Link from 'next/link';

export default function WineRow(props) {
    const {
        id,
        name,
        year,
        type,
        verietal,
        rating,
        consumed,
        dateConsumed
    } = props.data;

    //TODO: Implement delete wine entry 
    async function handleDelete(wineID) {

        const wineToEdit = await prisma.wine.delete({
            where: {
                id: wineID
            },
        });

    }

    return (
        <tr className=" border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td scope="col" className="px-6 py-4">{id}</td>
            <td scope="col" className="px-6 py-4">{name}</td>
            <td scope="col" className="px-6 py-4">{year}</td>
            <td scope="col" className="px-6 py-4">{type}</td>
            <td scope="col" className="px-6 py-4">{verietal}</td>
            <td scope="col" className="px-6 py-4">{rating}</td>
            <td scope="col" className="px-6 py-4">{consumed ? "Yes" : "No"}</td>
            <td scope="col" className="px-6 py-4">{dateConsumed ? dateConsumed.toDateString() : "N/A"}</td>
            <td scope="col" className="px-6 py-4">
                <Link
                    href={`/edit/${id}`}
                    className='inline-block rounded border-2 border-teal-700 px-3 py-2 text-xs font-medium uppercase leading-normal text-emerald-950 transition duration-150 ease-in-out hover:border-teal-600 hover:bg-emerald-500 hover:bg-opacity-10 hover:text-emerald-600'
                >Edit</Link>
            </td>
        </tr>
    )
}


