import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [userCount, setUserCount] = useState(0);
    const [bookCount, setBookCount] = useState(0);


    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/signup");
            setUserCount(response.data.data.length);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchBookData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/bookget");
            setBookCount(response.data.data.length);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchBookData();

    }, []);

    return (
        <>
            <section className='mt-10'>

                <div className='bg-[#ffffff] shadow-md p-4 rounded-[10px]'>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <h1 className='radikal-medium lg:text-[28px] text-[22px] mb-5'>Dashboard</h1>
                        </div>
                        <div className="lg:col-span-3 col-span-6 col-span-12 mx-auto">
                            <Link to={"/getuser"} className='no-underline text-decoration-none text-[#000]'>
                                <div className='h-[50px] w-[50px] rounded-full bg-[#e8fafc] p-2 flex justify-center items-center cursor-pointer'>

                                    <svg className='text-[#00CFE8] w-[22px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user avatar-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>

                                </div>
                            </Link>
                            <div>
                                <p className='mb-1 radikal-bold'>{userCount}</p>
                                <p className='mb-1 radikal-light'>Users</p>
                            </div>
                        </div>
                        <div className="lg:col-span-3 col-span-6 col-span-12 mx-auto">
                            <Link to={"/book"} className='no-underline text-decoration-none text-[#000]'>
                                <div className='h-[50px] w-[50px] rounded-full bg-[#efecfd] p-2 flex justify-center items-center cursor-pointer'>
                                    <svg className='text-[#7367F0] w-[22px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user avatar-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                            </Link>
                            <div>
                                <p className='mb-1 radikal-bold'>{bookCount}</p>
                                <p className='mb-1 radikal-light'>Books</p>
                            </div>
                        </div>
                        <div className="lg:col-span-3 col-span-6 col-span-12 mx-auto">
                            <Link to={"/blogs"} className='no-underline text-decoration-none text-[#000]'>
                                <div className='h-[50px] w-[50px] rounded-full bg-[#fce9eb] p-2 flex justify-center items-center cursor-pointer'>
                                    <svg className='text-[#EA5455] w-[22px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user avatar-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                            </Link>
                            <div>
                                <p className='mb-1 radikal-bold'>3</p>
                                <p className='mb-1 radikal-light'>Blogs</p>
                            </div>
                        </div>
                        <div className="lg:col-span-3 col-span-6 col-span-12 mx-auto">
                            <Link to={"/orders"} className='no-underline text-decoration-none text-[#000]'>
                                <div className='h-[50px] w-[50px] rounded-full bg-[#e8f9ee] p-2 flex justify-center items-center cursor-pointer'>
                                    <svg className='text-[#28C76F] w-[22px]' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign avatar-icon"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                </div>
                            </Link>
                            <div>
                                <p className='mb-1 radikal-bold'>4</p>
                                <p className='mb-1 radikal-light'>Orders</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>

    )
}

export default Dashboard