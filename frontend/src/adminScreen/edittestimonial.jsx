import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BAinput from "../component/input";
import BAbutton from "../component/button";
import axios from "axios";


function EditTestimonial() {

    const [bookData, setbookData] = useState({});
    const [image, setImage] = useState(null);

    const { id } = useParams();



    // const handleChange = (key, val) => {
    //     bookData[key] = val;
    //     setbookData({ ...bookData });
    // };
    const handleChange = (key, val) => {
        setbookData((prevData) => ({ ...prevData, [key]: val }));
    };

    const navigate = useNavigate();


    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setbookData((prevData) => ({ ...prevData, [type]: base64String }));
            setImage(base64String);
            console.log(base64String); // Log the base64 string here
        };
        reader.readAsDataURL(file);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        BookRegister(); // Call your custom submit handler
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://book-library-psi-six.vercel.app/testimonialpost/${id}`);
                const userData = response.data.data;
                console.log(userData);
                setbookData({
                    tittle: userData.tittle,
                    description: userData.description,
                    image: userData.image


                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);


    const BookRegister = async (e) => {


        const formData = {
            "tittle": bookData.tittle,
            "description": bookData.description,
            "image": bookData.image,

        }
        try {
            const response = await axios.put(`https://book-library-psi-six.vercel.app/testimonialpost/${id}`, formData);
            console.log(response.data);
            if (response.data.error == "") {
                navigate('/testimonials');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };

    return (
        <div className="my-5">
            <div className="max-w-7xl mx-auto lg:px-0 px-2">
                <div className="bg-[#ffffff] shadow-md p-4 rounded-[10px]">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title radikal-medium lg:text-[28px] text-[22px] mb-5">Edit Testimonials</h5>
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
                                    <div className="col-span-12">
                                        <textarea className="p-2  border-2 border-indigo-200 focus:border-indigo-100 w-full outline-none rounded" rows={4} placeholder="Description"
                                            value={bookData.description}
                                            onChange={(e) => {
                                                handleChange("description", e.target.value);
                                            }}
                                        ></textarea>
                                    </div>

                                    <div className="md:col-span-6 col-span-12">
                                        <BAinput
                                            label="Image"
                                            // value={bookData.front_image}
                                            // onChange={handleFileChange}
                                            onChange={(e) => handleFileChange(e, 'image')}
                                            type="file"
                                            accept="image/*"
                                        />
                                        {image && <img src={bookData.image} className="rounded-full w-20 h-20 my-2" alt="" />}
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
    )
}

export default EditTestimonial