"use client"
import React from 'react'
import WineForm from '../components/WineForm'

export default function Create() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 bt-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white text-center">Add wine</h1>
            <WineForm />
        </div>
    )
}
