"use client"
import React from 'react';
import Navbar from "../../../../../components/Navbar";
import { useParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from '../../../../../../utils/constants';

const DeleteProduct = () => {
    const { id } = useParams();
    async function deleteP() {
        const data = await axios.delete(`${BASE_URL}/api/inventory/delete/${id}`)
        if (data.status === 201) {
            console.log(data.status);
            window.location.href = '/home/inventory';
        }
        else {
            console.log(err);
        }
    }
    function goBack() {
        window.history.back();
    }
    return (
        <div>
            <Navbar />
            <div className="pl-[200px] p-4">
                <h1 className='text-4xl font-semibold p-4 ml-10'>Delete Product</h1>
                <div className='flex items-center gap-4'><h2 className='text-2xl font-semibold p-4 ml-10 text-red-600'>Are you sure you want to delete this product?</h2>
                    <button onClick={deleteP} className='bg-blue-900 border-blue-900 text-white font-semibold rounded-md text-2xl'>Yes</button>
                    <button onClick={goBack} className='bg-gray-500 border-gray-500 text-white font-semibold rounded-md text-2xl'>No</button></div>
            </div>
        </div>
    );
};

export default DeleteProduct;