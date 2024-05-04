import React from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

const page = () => {
    return (
        <>
            <Navbar />
            <div className='pl-[200px] p-4'>
                <div>
                    Dashboard
                </div>
            </div>
        </>
    )
}

export default page