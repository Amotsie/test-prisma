'use client'
import EditWineForm from "@/app/components/EditWineForm";
import { useEffect, useState } from "react"

const EtitWinePage = ({ params }) => {
    const id = params.editId;
    const [editData, setEditData] = useState(null);
    const [fetchError, setFetchError] = useState("");

    useEffect(() => {
        return async () => {
            try {
                const response = await fetch("/api/wines/" + id)
                let data = await response.json();
                setEditData(data);
            } catch (error) {
                console.error(error.message)
                setFetchError(error.message)
            }
        };
    }, [editData, fetchError]);
    return (
        <div>
            {fetchError && <p>{fetchError}</p>}
            {
                editData ? <EditWineForm editData={editData} />
                    : <h1 className="mt-12 text-lg font-bold text-gray-500 lg:text-xl dark:text-gray-400 text-center">Loading....</h1>}
        </div>

    )
}

export default EtitWinePage