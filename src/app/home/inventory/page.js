"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import {BASE_URL} from '../../../../utils/constants';
import axios from 'axios';

const page = () => {
    const [no, setNo] = useState(0);
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/inventory`)
                console.log(response)
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                    setNo(data.length);
                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []); 

    return (
        <>
            <Navbar />
            {/* All toolbar */}
            <div className='pl-[200px] p-4'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-semibold p-2'>Inventory</h1>
                    <p className='text-gray-500'>({no} inventory)</p>
                </div>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className="flex w-[250px] items-center justify-center border rounded-md px-1">
                            <div className="px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            <input
                                className=" bg-transparent p-2 w-full focus:outline-none"
                                type="text"
                                placeholder="Search for inventory"
                            />
                        </div>
                        <button className='flex items-center gap-2 text-gray-500 border-gray-500 rounded-md p-2'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                            </div>
                            <p className='font-semibold'>Filter</p>
                        </button>
                        <select className='p-2 border border-black font-semibold rounded-lg text-gray-500'>
                            <option>Category</option>
                        </select>
                        <select className='p-2 border border-black font-semibold rounded-lg text-gray-500'>
                            <option>Stock Alert</option>
                        </select>
                    </div>
                    <Link href="/home/new">
                    <button className='rounded-md bg-green-600 border-0 shadow-lg p-2 text-white font-semibold flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New Product
                    </button>
                    </Link>
                </div>

                {/* Table */}
                <div className="m-auto border rounded-lg text-gray-500">
                    <table className="w-full p-4">
                        <thead className="font-semibold border border-l-0 border-r-0 border-t-0">
                            <tr className='gap-2'>
                                <td className="text-md flex items-center gap-2 p-2">
                                    <input type='checkbox' />ITEMS
                                </td>
                                <td className="text-md p-2">
                                    CATEGORY
                                </td>
                                <td className="text-md p-2">
                                    SKU
                                </td>
                                <td className="text-md p-2">
                                    INCOMING
                                </td>
                                <td className="text-md p-2">
                                    STOCK
                                </td>
                                <td className="text-md p-2">
                                    UNIT PRICE
                                </td>
                                <td className="text-md p-2">
                                    ACTION
                                </td>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {products.map((product) => (
                                <tr key={product._id} className="border border-l-0 border-r-0 border-t-0">
                                    <td className="text-sm md:text-md p-3 flex items-center gap-2">
                                        <input type="checkbox" />{product.name}
                                    </td>
                                    <td className="text-sm md:text-md p-3">
                                        {product.category}
                                    </td>
                                    <td className="text-sm md:text-md p-3">
                                        {product.sku}
                                    </td>
                                    <td className="text-sm md:text-md p-3">
                                        {product.incoming}
                                    </td>
                                    <td className="text-sm md:text-md p-3">
                                        {product.stock}
                                    </td>
                                    <td className="text-sm md:text-md p-3">
                                        {product.price}
                                    </td>
                                    <td className="text-sm md:text-md p-3">
                                        ...
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='m-3 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <select className='p-2 border border-black font-semibold rounded-lg'>
                                <option>Show 20 entries</option>
                            </select>
                            <p>1-20 of {no} results</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button className='rounded-md shadow-lg p-2 border-gray-500 font-semibold flex items-center gap-2'>Previous</button>
                            <button className='rounded-md bg-green-600 border-0 shadow-lg p-2 text-white font-semibold flex items-center gap-2'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page