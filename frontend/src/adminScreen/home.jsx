import React, { useEffect, useState } from 'react'
import BAbutton from '../component/button';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [bookData, setbookData] = useState([]);

    // const Header = ["S.No", "Front Image", "Back Image", "Tittle", "Short Description", "Price"];

    const role = localStorage.getItem('role');

    const Delete = async (id) => {
        if (role === "admin") {
            try {
                const response = await axios.delete(`http://localhost:8000/bookpost/${id}`);
                console.log("Book deleted successfully:", response.data);
                GetData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            alert("You are not admin");
        }
    }

    const Update = async (id) => {
        if (role === "admin") {
            navigate(`/editbook/${id}`);
        } else {
            alert("You are not admin");
        }

        // if (role === "admin") {
        //     try {
        //         navigate(`/editbook/${id}`);
        //         const response = await axios.put(`http://localhost:8000/bookpost/${id}`, {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem('authToken')}`
        //             }
        //         });

        //     }
        //     catch (error) {
        //         console.error("Error fetching data:", error);
        //     }
        // }
        // else {
        //     alert("You are not admin");
        // }

    }

    const Add = async () => {
        if (role === "admin") {
            try {
                navigate(`/addbook`);
                const response = await axios.post(`http://localhost:8000/bookpost`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        else {
            alert("You are not admin");
        }

    }

    const GetData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/bookget");
            // console.log("API Response:", response.data);
            setbookData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        GetData();
    }, [])


    return (
        <>
            <section className='mt-10'>
                <div className='bg-[#ffffff] shadow-md p-4 rounded-[10px]'>
                    <div className=''>
                        <div className='grid grid-cols-12 gap-4'>
                            <div className="col-span-12 ">
                                <BAbutton onClick={() => Add()} label="Add Book" />
                            </div>
                            {Array.isArray(bookData) && bookData.length > 0 ? (
                                bookData.map((x, index) => (
                                    <div key={index} className='md:col-span-4 col-span-12 border border-[#000] shadow-md p-4'>
                                        <Link to={`/bookdetails/${x._id}`}>
                                            <h3 className='text-[16px] text-[#000] '>{index + 1}</h3>
                                            <h3 className='radikal-bold text-[#000] '>{x.tittle}</h3>
                                            <div className=''>
                                                <img src={x.front_image} className='my-4 w-[150px]' alt={x.front_image} />
                                                <img src={x.back_image} className='my-4 w-[150px]' alt={x.back_image} />
                                            </div>
                                        </Link>
                                        <p className=''>{x.short_description}</p>
                                        <h4 className=''><span className='radikal-bold'>Rs.</span> {x.price}</h4>

                                        <BAbutton onClick={() => Update(x._id)} label="Update" />
                                        <BAbutton onClick={() => Delete(x._id)} label="Delete" />

                                    </div>
                                ))
                            ) : (
                                <div className='text-center my-4'>Loading...</div>
                            )}

                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}




export default Home