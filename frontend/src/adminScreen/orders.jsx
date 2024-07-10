import React from 'react'
import BAbutton from '../component/button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Orders() {
    const navigate = useNavigate();

    const Header = ["order_no", "tittle", "image", "price"];
    const [userData, setuserData] = useState([]);

    const GetData = async () => {
        try {
            const response = await axios.get("https://book-library-psi-six.vercel.app/orderget");
            // console.log("API Response:", response.data);
            console.log(response.data.data);
            setuserData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        GetData();
    }, [])

    const Delete = async (id) => {

        try {
            const response = await axios.delete(`https://book-library-psi-six.vercel.app/orderpost/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            console.log("Book deleted successfully:", response.data);
            GetData();
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    const Update = async (id) => {

        try {
            navigate(`/editorder/${id}`);
            const response = await axios.put(`https://book-library-psi-six.vercel.app/orderpost/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

        }
        catch (error) {
            console.error("Error fetching data:", error);
        }


    }

    return (
        <section className='mt-10'>

            <div className='bg-[#ffffff] shadow-md p-4 rounded-[10px]'>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div>
                            <h1 className='radikal-medium lg:text-[28px] text-[22px]'>Orders</h1>
                            <table className="w-[100%] text-white my-5">
                                <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4">
                                    <tr>
                                        {Header.map((x, i) => (
                                            <th key={i}>{x}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-slate-500">
                                    {userData && userData.length > 0 ? (
                                        userData.map((row, rowIndex) => (
                                            <tr key={rowIndex} className='border-[#000]/20 border-b'>
                                                {Header.map((col, colIndex) => (
                                                    <td key={colIndex} className='max-w-[550px] mx-auto '>
                                                        {col === "S.No" ? rowIndex + 1 :
                                                            col === "image" ? <img src={row[col]} alt={row.tittle} className="w-20 h-20 object-cover " /> :
                                                                row[col]}
                                                    </td>

                                                ))}
                                                <div className="flex gap-4 flex-row my-2">
                                                    <BAbutton
                                                        label="Delete"
                                                        onClick={() => Delete(row._id)}
                                                    />
                                                    {/* <BAbutton
                                                        label="Update"
                                                        onClick={() => Update(row._id)}
                                                    /> */}
                                                </div>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={Header.length}>no data found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <BAbutton
                            label="Add Orders"
                            onClick={() => {
                                navigate("/ordersform");
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders