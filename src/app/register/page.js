"use client"
import React, { Component } from 'react'
import { BASE_URL } from '../../../utils/constants.js';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            cpassword: '',
            phone: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { fname, lname, email, password, cpassword, phone } = this.state;

        // Email validation function
        const isValidEmail = (email) => {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return pattern.test(email);
        };

        // Validate the fields
        if (fname === '' || lname === '' || email === '' || password === '' || cpassword === '' || phone === '') {
            alert("Please fill all the fields");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Invalid Email");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        try {
            if (!BASE_URL) {
                console.log('hello');
            }
            const data = await fetch(`${BASE_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ fname, lname, email, password, phone })
            });
            if (data.status === 201) {
                window.location.href = "/login";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    render() {
        return (
            <div>
                <title>User Register</title>
                <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
                    <div className='w-[500px] md:w-[500px] lg:w-[500px] h-[490px] bg-gray-200 shadow-lg rounded-3xl p-4 mx-auto my-auto'>
                        <div className={'w-full flex flex-col justify-center'}>
                            <h1 className='text-5xl flex items-center justify-center font-semibold px-4 lg:mr-3 pt-4'>User Register</h1>
                            <form action="" className='flex flex-col justify-center p-3 gap-5 mt-3 items-center'>
                                <div className='flex flex-col justify-center gap-5 w-full'>
                                    <div className='flex items-center gap-2 justify-between'>
                                        <input className='p-2 focus:outline-none shadow-lg rounded' type="text" name='Fname' placeholder='First Name' onChange={e => this.setState({ fname: e.target.value })} />
                                        <input className='p-2 focus:outline-none shadow-lg rounded' type="text" name='Lname' placeholder='Last Name' onChange={e => this.setState({ lname: e.target.value })} />
                                    </div>
                                    <input className='p-2 focus:outline-none shadow-lg rounded' type="email" name='phone' placeholder='Phone Number' onChange={e => this.setState({ phone: e.target.value })} />
                                    <input className='p-2 focus:outline-none shadow-lg rounded' type="email" name='email' placeholder='Email' onChange={e => this.setState({ email: e.target.value })} />
                                    <input className='p-2 focus:outline-none shadow-lg rounded' type="password" name='password' placeholder='Password' onChange={e => this.setState({ password: e.target.value })} />
                                    <input className='p-2 focus:outline-none shadow-lg rounded' type="password" name='cpassword' placeholder='Confirm Password' onChange={e => this.setState({ cpassword: e.target.value })} />
                                    <button className='bg-green-700 text-white p-2 text-xl border-green-700 rounded-xl' onClick={this.handleSubmit}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}