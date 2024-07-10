import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BAinput from "../component/input";
import BAbutton from "../component/button";
import axios from "axios";

export default function OrdersForm() {
    const [bookData, setbookData] = useState({});
    const [image, setImage] = useState({
        image: null,

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
            setbookData((prevData) => ({ ...prevData, image: base64String }));

            setImage(base64String);

            console.log(base64String); // Log the base64 string here
        };
        reader.readAsDataURL(file);
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        BookRegister(); // Call your custom submit handler
    };


    const BookRegister = async (e) => {


        const formData = {
            "order_no": bookData.order_no,
            "tittle": bookData.tittle,
            "image": bookData.image,
            "price": bookData.price,
        }
        try {
            const response = await axios.post("https://book-library-psi-six.vercel.app/orderpost", formData);
            console.log(response.data);
            if (response.data.error == "") {
                navigate('/orders');
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
                            <h5 className="card-title radikal-medium lg:text-[28px] text-[22px] mb-5">Blogs Published</h5>
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
                                    <div className="md:col-span-6 col-span-12">
                                        <BAinput
                                            type="text"
                                            value={bookData.order_no}
                                            onChange={(e) => {
                                                handleChange("order_no", e.target.value);
                                            }}
                                            label="Order Number"
                                        />
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <BAinput
                                            type="Number"
                                            value={bookData.price}
                                            onChange={(e) => {
                                                handleChange("price", e.target.value);
                                            }}
                                            label="price"
                                        />
                                    </div>
                                    <div className="col-span-12">

                                        <BAinput
                                            label="Image"
                                            onChange={(e) => handleFileChange(e, 'image')}
                                            type="file"
                                            accept="image/*"
                                        />
                                        {image && <img src={bookData.image} width={50} alt="" />}
                                    </div>




                                    <div className="p-2 col-span-12">
                                        <BAbutton label={"Order"} />
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

