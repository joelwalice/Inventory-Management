"use client"
import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Cookies from 'js-cookie'

const page = () => {
    useEffect(() => {
        if(!Cookies.get('isloggedIn')){
            window.location.href = "/login";
        }
    },[])
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