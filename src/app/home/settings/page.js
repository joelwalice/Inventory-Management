"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import Cookies from 'js-cookie';
import Link from 'next/link';
import { BASE_URL } from '../../../../utils/constants';

const page = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [taxid, setTaxid] = useState("");
    const [pin, setPin] = useState("");
    const [edit, setEdit] = useState(false);
    const [edita, setEdita] = useState(false);
    const [editp, setEditp] = useState(false);

    const submitFunc = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/name`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fname, lname, email
                }),
            })
            if (response.status === 201) {
                setEdit(!edit);
                Cookies.set('fname', fname);
                Cookies.set('lname', lname);
                window.location.href = "/home/settings";
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    const submit = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    country, city, pin, taxid, email
                }),
            })
            if (response.status === 201) {
                setEdita(!edita);
                Cookies.set('country', country);
                Cookies.set('city', city);
                Cookies.set('pin', pin);
                Cookies.set('taxid', taxid);
                window.location.href = "/home/settings";
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    const submitP = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/phone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone, email
                }),
            })
            if (response.status === 201) {
                setEditp(!editp);
                Cookies.set('phone', phone);
                window.location.href = "/home/settings";
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (Cookies.get('fname')) {
            setFname(Cookies.get('fname'));
        }
        if (Cookies.get('lname')) {
            setLname(Cookies.get('lname'));
        }
        if (Cookies.get('email')) {
            setEmail(Cookies.get('email'));
        }
        if (Cookies.get('phone')) {
            setPhone(Cookies.get('phone'));
        }
        if (Cookies.get('country')) {
            setCountry(Cookies.get('country'));
        }
        if (Cookies.get('city')) {
            setCity(Cookies.get('city'));
        }
        if (Cookies.get('pin')) {
            setPin(Cookies.get('pin'));
        }
        if (Cookies.get('taxid')) {
            setTaxid(Cookies.get('taxid'));
        }


    }, [])

    return (
        <>
            <Navbar />
            <div className='pl-[200px] p-2'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-semibold p-2 text-gray-500'>My Profile</h1>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='w-full h-[140px] border border-grey rounded-2xl mx-[15px] my-[20px] shadow shadow-gray-100'>
                        {/* <img src={} alt='img'/> */}
                        {edit ? <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-[15px]'>
                                <div className='rounded-full bg-black w-[100px] min-h-[100px] my-[20px] ml-[30px]'></div>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='flex items-center gap-2'>First Name : <p className='font-bold text-xl'><input type="text" onChange={(e) => setFname(e.target.value)} value={fname} className='flex shadow-lg rounded-lg border p-2' /></p></h1>
                                    <h1 className='flex items-center gap-2'>Last Name : <p className='font-bold text-xl'><input type="text" onChange={(e) => setLname(e.target.value)} value={lname} className='flex shadow-lg rounded-lg border p-2' /></p></h1>
                                </div>
                            </div>
                            <button className='text-white bg-green-600 flex items-center gap-[10px] border border-green-300 rounded-3xl px-4 py-2 m-5 cursor-pointer shadow shadow-gray-100' onClick={submitFunc}>
                                <p>Submit</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div> : <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-[15px]'>
                                <div className='rounded-full bg-black w-[100px] h-[100px] my-[20px] ml-[30px]'></div>
                                <div>
                                    <h1 className='flex items-center gap-2'>First Name : <p className='font-bold text-xl'>{fname}</p></h1>
                                    <h1 className='flex items-center gap-2'>Last Name : <p className='font-bold text-xl'>{lname}</p></h1>
                                </div>
                            </div>
                            <button className='text-gray-400 flex items-center gap-[10px] border border-gray-300 rounded-3xl px-4 py-2 m-5 cursor-pointer shadow shadow-gray-100' onClick={() => setEdit(!edit)}>
                                <p>Edit</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div>}
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    {editp ? <div className='w-full border border-grey rounded-2xl mx-[15px] my-[20px] pb-5 shadow shadow-gray-100'>
                        <div className='flex items-center justify-between'>
                            <p className='font-bold text-xl p-5'>Personal Information</p>
                            <button className='text-white bg-green-600 flex items-center gap-[10px] border border-green-300 rounded-3xl px-4 py-2 m-5 cursor-pointer shadow shadow-gray-100' onClick={submitP}>
                                <p>Submit</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <table className='table-auto w-[40%] my-[auto] mx-[20px]'>
                                <tbody>
                                    <tr>
                                        <td className='text-gray-400 mr-[30px]'>Email Address</td>
                                        <td className='text-gray-400 pr-[30px]'>Phone</td>
                                    </tr>
                                    <tr>
                                        <td className='mr-[30px]'><input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className='flex shadow-lg rounded-lg border p-2' /></td>
                                        <td className='pr-[30px]'><input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} className='flex shadow-lg rounded-lg border p-2' /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> : <div className='w-full border border-grey rounded-2xl mx-[15px] my-[20px] pb-5 shadow shadow-gray-100'>
                        <div className='flex items-center justify-between'>
                            <p className='font-bold text-xl p-5'>Personal Information</p>
                            <button className='text-gray-400 flex items-center gap-[10px] border border-gray-300 rounded-3xl px-4 py-2 m-5 cursor-pointer shadow shadow-gray-100' onClick={() => setEditp(!editp)}>
                                <p>Edit</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <table className='table-auto w-[40%] my-[auto] mx-[20px]'>
                                <tbody>
                                    <tr>
                                        <td className='text-gray-400 mr-[30px]'>Email Address</td>
                                        <td className='text-gray-400 pr-[30px]'>Phone</td>
                                    </tr>
                                    <tr>
                                        <td className='mr-[30px]'>{email}</td>
                                        <td className='pr-[30px]'>{phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>}
                </div>
                <div className='flex items-center justify-center'>
                    {edita ? <div className='w-full border border-grey rounded-2xl mx-[15px] my-[20px] pb-5 shadow shadow-gray-100'>
                        <div className='flex items-center justify-between'>
                            <p className='font-bold text-xl p-5'>Address</p>
                            <button className='text-white bg-green-600 flex items-center gap-[10px] border border-green-300 rounded-3xl px-4 py-2 m-5 cursor-pointer shadow shadow-gray-100' onClick={submit}>
                                <p>Submit</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <table className='table-auto w-[65%] my-[auto] mx-[20px]'>
                                <tbody>
                                    <tr>
                                        <td className='text-gray-400 mr-[30px]'>Country</td>
                                        <td className='text-gray-400 pr-[30px]'>City/State</td>
                                    </tr>
                                    <tr>
                                        <td className='mr-[30px]'><input type="text" onChange={(e) => setCountry(e.target.value)} value={country} className='flex shadow-lg rounded-lg border p-2' /></td>
                                        <td className='pr-[30px]'><input type="text" onChange={(e) => setCity(e.target.value)} value={city} className='flex shadow-lg rounded-lg border p-2' /></td>
                                    </tr>
                                    <tr className='h-[30px]'></tr>
                                    <tr>
                                        <td className='text-gray-400 mr-[30px]'>Postal Code</td>
                                        <td className='text-gray-400 pr-[30px]'>TAX ID</td>
                                    </tr>
                                    <tr>
                                        <td className='mr-[30px]'><input type="text" onChange={(e) => setPin(e.target.value)} value={pin} className='flex shadow-lg rounded-lg border p-2' /></td>
                                        <td className='pr-[30px]'><input type="text" onChange={(e) => setTaxid(e.target.value)} value={taxid} className='flex shadow-lg rounded-lg border p-2' /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> : <div className='w-full border border-grey rounded-2xl mx-[15px] my-[20px] pb-5 shadow shadow-gray-100'>
                        <div className='flex items-center justify-between'>
                            <p className='font-bold text-xl p-5'>Address</p>
                            <button className='text-gray-400 flex items-center gap-[10px] border border-gray-300 rounded-3xl px-4 py-2 m-5 cursor-pointer shadow shadow-gray-100' onClick={() => setEdita(!edita)}>
                                <p>Edit</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <table className='table-auto w-[65%] my-[auto] mx-[20px]'>
                                <tbody>
                                    <tr>
                                        <td className='text-gray-400 mr-[30px]'>Country</td>
                                        <td className='text-gray-400 pr-[30px]'>City/State</td>
                                    </tr>
                                    <tr>
                                        <td className='mr-[30px]'>{country}</td>
                                        <td className='pr-[30px]'>{city}</td>
                                    </tr>
                                    <tr className='h-[30px]'></tr>
                                    <tr>
                                        <td className='text-gray-400 mr-[30px]'>Postal Code</td>
                                        <td className='text-gray-400 pr-[30px]'>TAX ID</td>
                                    </tr>
                                    <tr>
                                        <td className='mr-[30px]'>{pin}</td>
                                        <td className='pr-[30px]'>{taxid}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default page