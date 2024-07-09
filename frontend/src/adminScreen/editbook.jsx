import React, { useState } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import BAinput from "../component/input";
import BAbutton from "../component/button";
import axios from "axios";
import { useEffect } from "react";


export default function EditBook() {
    const [bookData, setbookData] = useState({
        tittle: "",
        short_description: "",
        long_description: "",
        front_image: null,
        back_image: null,
        amazon_url: "",
        kindle_url: "",
        paper_back_url: "",
        audio_book_price: "",
        price: "",
        status: "",
    });
    const [image, setImage] = useState({
        front_image: null,
        back_image: null
    });
    const { id } = useParams();

    // const handleChange = (key, val) => {
    //     bookData[key] = val;
    //     setbookData({ ...bookData });
    // };
    const handleChange = (key, val) => {
        setbookData((prevData) => ({ ...prevData, [key]: val }));
    };

    const navigate = useNavigate();

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];

    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const base64String = reader.result;
    //         setbookData((prevData) => ({ ...prevData, image_url: base64String }));
    //         setImage(base64String);
    //         bookData.image_url = base64String;
    //         console.log(base64String); // Log the base64 string here
    //     };
    //     reader.readAsDataURL(file);
    // };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setbookData((prevData) => ({ ...prevData, [type]: base64String }));
            setImage((prevImages) => ({ ...prevImages, [type]: base64String }));
            console.log(base64String); // Log the base64 string here
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        BookEdit(); // Call your custom submit handler
    };

    const BookEdit = async (e) => {

        const formData = {
            "tittle": bookData.tittle,
            "short_description": bookData.short_description,
            "long_description": bookData.long_description,
            "front_image": bookData.front_image,
            "back_image": bookData.back_image,
            "amazon_url": bookData.amazon_url,
            "kindle_url": bookData.kindle_url,
            "paper_back_url": bookData.paper_back_url,
            "audio_book_price": bookData.audio_book_price,
            "price": bookData.price,
            "status": bookData.status,
        }
        try {
            const response = await axios.put(`http://localhost:8000/bookpost/${id}`, formData);
            console.log(response.data);
            if (response.data.error == "") {
                navigate('/book');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/bookpost/${id}`);
                const userData = response.data.data;
                console.log(userData);
                setbookData({
                    tittle: userData.tittle,
                    short_description: userData.short_description,
                    long_description: userData.long_description,
                    front_image: userData.front_image,
                    back_image: userData.back_image,
                    amazon_url: userData.amazon_url,
                    kindle_url: userData.kindle_url,
                    paper_back_url: userData.paper_back_url,
                    audio_book_price: userData.audio_book_price,
                    price: userData.price,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <>
            <div className="my-5">
                <div className="max-w-7xl mx-auto lg:px-0 px-2">
                    <div className="bg-[#ffffff] shadow-md p-4 rounded-[10px]">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title radikal-medium lg:text-[28px] text-[22px] mb-5">Update Book</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <BAinput
                                                type="text"
                                                value={bookData.tittle}
                                                onChange={(e) => {
                                                    handleChange("tittle", e.target.value);
                                                }}
                                                label="Book Tittle"
                                            />
                                        </div>

                                        <div className="md:col-span-6 col-span-12">
                                            <BAinput
                                                label="Book front image"
                                                // value={bookData.front_image}
                                                // onChange={handleFileChange}
                                                onChange={(e) => handleFileChange(e, 'front_image')}
                                                type="file"
                                                accept="image/*"
                                            />
                                            {image && <img src={bookData.image} width={50} alt="" />}
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <BAinput
                                                label="Book back image"
                                                // value={bookData.back_image}
                                                // onChange={handleFileChange}
                                                onChange={(e) => handleFileChange(e, 'back_image')}
                                                type="file"
                                                accept="image/*"
                                            />
                                            {image && <img src={bookData.image} width={50} alt="" />}
                                        </div>

                                        <div className="col-span-12 ">
                                            <BAinput
                                                type="text"
                                                label="short description"
                                                value={bookData.short_description}
                                                onChange={(e) => {
                                                    handleChange("short_description", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="col-span-12 ">

                                            <textarea
                                                className='p-2  border-2 border-indigo-200 focus:border-indigo-100 w-full outline-none rounded'
                                                placeholder='long description'
                                                rows={4}
                                                value={bookData.long_description}
                                                onChange={(e) => {
                                                    handleChange("long_description", e.target.value);
                                                }}>

                                            </textarea>
                                        </div>

                                        <div className="md:col-span-4 col-span-12">
                                            <BAinput
                                                type="text"
                                                label="amazon url"
                                                value={bookData.amazon_url}
                                                onChange={(e) => {
                                                    handleChange("amazon_url", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <BAinput
                                                type="text"
                                                label="kindle url"
                                                value={bookData.kindle_url}
                                                onChange={(e) => {
                                                    handleChange("kindle_url", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <BAinput
                                                type="text"
                                                label="paper back url"
                                                value={bookData.paper_back_url}
                                                onChange={(e) => {
                                                    handleChange("paper_back_url", e.target.value);
                                                }}
                                            />
                                        </div>

                                        <div className="md:col-span-6 col-span-12">
                                            <BAinput
                                                type="Number"
                                                label="audio book price"
                                                value={bookData.audio_book_price}
                                                onChange={(e) => {
                                                    handleChange("audio_book_price", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <BAinput
                                                type="Number"
                                                label="price"
                                                value={bookData.price}
                                                onChange={(e) => {
                                                    handleChange("price", e.target.value);
                                                }}
                                            />
                                        </div>


                                        <div className="col-span-12">
                                            <BAinput
                                                type="Boolean"
                                                label="status"
                                                value={bookData.status}
                                                onChange={(e) => {
                                                    handleChange("status", e.target.value);
                                                }}
                                            />
                                        </div>

                                        <div className="p-2 col-span-12">
                                            <BAbutton label={"Submit"} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
