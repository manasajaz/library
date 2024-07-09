import React from 'react'
import BAbutton from '../component/button';
import BAinput from '../component/input';
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from "react";
import axios from "axios";

function Editfaqs() {

    const [model, setModel] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();


    const handleChange = (key, val) => {
        model[key] = val;
        setModel({ ...model });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        Addfaqs(); // Call your custom submit handler
    };



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/faqspost/${id}`);
                const userData = response.data.data;
                console.log(userData);
                setModel({
                    question: userData.question,
                    answer: userData.answer,

                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);


    let Addfaqs = async (e) => {

        console.log(model);
        const formData = {
            "question": model.question,
            "answer": model.answer,
        }
        try {
            const response = await axios.put(`http://localhost:8000/faqspost/${id}`, formData);
            console.log(response.data);
            if (response.data.error == "") {
                navigate('/faqs');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }





    return (
        <div className="my-5">

            <div className="max-w-7xl mx-auto lg:px-0 px-2">
                <div className="bg-[#ffffff] shadow-md p-4 rounded-[10px]">
                    <div className="card-body">
                        <h5 className="card-title radikal-medium lg:text-[28px] text-[22px] mb-5">Edit FAQs</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12">
                                    <BAinput
                                        type="text"
                                        value={model.question}
                                        onChange={(e) => {
                                            handleChange("question", e.target.value);
                                        }}
                                        label="Question"
                                    />
                                </div>
                                <div className="col-span-12">
                                    <textarea className='p-2  border-2 border-indigo-200 focus:border-indigo-100 w-full outline-none rounded' rows={4} placeholder='Answer'
                                        value={model.answer}
                                        onChange={(e) => {
                                            handleChange("answer", e.target.value);
                                        }}
                                    ></textarea>
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
    )
}

export default Editfaqs