"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import { BASE_URL } from '../../../../utils/constants';

const page = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [no, setNo] = useState(0);
    const [products, setProducts] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedProducts = products.map(product => ({
            ...product,
            selected: !selectAll,
        }));
        setProducts(updatedProducts);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/inventory`)
                const data = await response.json();
                setProducts(data.data);
                setNo(data.data.length);
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
                                    <input
                                        type='checkbox'
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />ITEMS
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
                                        <input
                                            type="checkbox"
                                            checked={product.selected}
                                            onChange={() => {
                                                const updatedProducts = products.map((prod) => {
                                                    if (prod._id === product._id) {
                                                        return {
                                                            ...prod,
                                                            selected: !prod.selected,
                                                        };
                                                    }
                                                    return prod;
                                                });
                                                setProducts(updatedProducts);
                                            }}
                                        />{product.name}
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
                                    <td className="text-sm md:text-md p-3 flex items-center gap-2">
                                        <Link
                                            href={`/home/edit/${product._id}`}
                                            type="button"
                                            className="p-1 rounded-lg border-green-700 bg-green-700 text-white text-sm flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Link>
                                        <Link
                                            href={`/home/inventory/delete/${product._id}`}
                                            type="button"
                                            className="p-1 bg-red-700 text-white rounded-md border-red-700 text-sm flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </Link>
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