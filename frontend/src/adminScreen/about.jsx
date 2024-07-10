import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BAinput from "../component/input";
import BAbutton from "../component/button";
import axios from "axios";

export default function About() {
    const [bookData, setbookData] = useState({});
    const [image, setImage] = useState({
        image_1: null,
        image_2: null,
        image_3: null,
        cover_image: null
    });


    // const handleChange = (key, val) => {
    //     bookData[key] = val;
    //     setbookData({ ...bookData });
    // };
    const handleChange = (key, val) => {
        setbookData((prevData) => ({ ...prevData, [key]: val }));
    };

    const navigate = useNavigate();


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setbookData((prevData) => ({ ...prevData, image_1: base64String }));
            setbookData((prevData) => ({ ...prevData, image_2: base64String }));
            setbookData((prevData) => ({ ...prevData, image_3: base64String }));
            setbookData((prevData) => ({ ...prevData, cover_image: base64String }));
            setImage(base64String);

            console.log(base64String); // Log the base64 string here
        };
        reader.readAsDataURL(file);
    };

    // const handleFileChange = (e, type) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const base64String = reader.result;
    //         setbookData((prevData) => ({ ...prevData, [type]: base64String }));
    //         setImage((prevImages) => ({ ...prevImages, [type]: base64String }));
    //         console.log(base64String); // Log the base64 string here
    //     };
    //     reader.readAsDataURL(file);
    // };


    const handleSubmit = (e) => {
        e.preventDefault();
        BookRegister(); // Call your custom submit handler
    };


    const BookRegister = async (e) => {


        const formData = {
            "tittle": bookData.tittle,
            "Short_Description": bookData.Short_Description,
            "Description": bookData.Description,
            "image_1": bookData.image_1,
            "image_2": bookData.image_2,
            "image_3": bookData.image_3,
            "cover_image": bookData.cover_image,

        }
        try {
            const response = await axios.post("https://book-library-psi-six.vercel.app/aboutpost", formData);
            console.log(response.data);
            if (response.data.error == "") {
                navigate('/book');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };

    return (
        <div className="my-5">
            <div className="">
                <div className="bg-[#ffffff] shadow-md p-4 rounded-[10px]">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title radikal-medium lg:text-[28px] text-[22px] mb-5">About</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12">
                                        <BAinput
                                            type="text"
                                            value={bookData.tittle}
                                            onChange={(e) => {
                                                handleChange("tittle", e.target.value);
                                            }}
                                            label="Tittle"
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <BAinput
                                            type="text"
                                            value={bookData.Short_Description}
                                            onChange={(e) => {
                                                handleChange("Short_Description", e.target.value);
                                            }}
                                            label="Short Description"
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        {/* <BAinput
                                            type="text"
                                            value={bookData.Description}
                                            onChange={(e) => {
                                                handleChange("Description", e.target.value);
                                            }}
                                            label="Description"
                                        /> */}
                                        <textarea
                                            className='p-2  border-2 border-indigo-200 focus:border-indigo-100 w-full outline-none rounded'
                                            placeholder='Description'
                                            rows={4}
                                            value={bookData.Description}
                                            onChange={(e) => {
                                                handleChange("Description", e.target.value);
                                            }}>

                                        </textarea>
                                    </div>

                                    <div className="md:col-span-6 col-span-12">
                                        <BAinput
                                            label="Image"
                                            // value={bookData.front_image}
                                            // onChange={handleFileChange}
                                            onChange={(e) => handleFileChange(e, 'image_1')}
                                            type="file"
                                            accept="image/*"
                                        />
                                        {image && <img src={bookData.image} width={50} alt="" />}
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <BAinput
                                            label="Image 2"
                                            // value={bookData.front_image}
                                            // onChange={handleFileChange}
                                            onChange={(e) => handleFileChange(e, 'image_2')}
                                            type="file"
                                            accept="image/*"
                                        />
                                        {image && <img src={bookData.image} width={50} alt="" />}
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <BAinput
                                            label="Image 3"
                                            // value={bookData.front_image}
                                            // onChange={handleFileChange}
                                            onChange={(e) => handleFileChange(e, 'image_3')}
                                            type="file"
                                            accept="image/*"
                                        />
                                        {image && <img src={bookData.image} width={50} alt="" />}
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <BAinput
                                            label="Cover Image"
                                            // value={bookData.front_image}
                                            // onChange={handleFileChange}
                                            onChange={(e) => handleFileChange(e, 'cover_image')}
                                            type="file"
                                            accept="image/*"
                                        />
                                        {image && <img src={bookData.image} width={50} alt="" />}
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
    );
}

