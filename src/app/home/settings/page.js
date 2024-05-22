import React from 'react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'

const page = () => {
    return (
        <>
            <Navbar />
            <div className='pl-[200px] p-2'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-semibold p-2 text-gray-500'>My Profile</h1>
                </div>
            </div>
        </>
    )
}

export default page