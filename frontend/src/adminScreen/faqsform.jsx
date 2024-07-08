import React from 'react'
import BAbutton from '../component/button';
import BAinput from '../component/input';
import { useNavigate } from 'react-router';
import { useState } from "react";
import axios from "axios";






function Faqsform() {

    const [model, setModel] = useState({});
    const navigate = useNavigate();

    const handleChange = (key, val) => {
        model[key] = val;
        setModel({ ...model });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        Addfaqs(); // Call your custom submit handler
    };



    let Addfaqs = async (e) => {

        console.log(model);


        const formData = {
            "question": model.question,
            "answer": model.answer,
        }
        try {
            const response = await axios.post("http://localhost:8000/faqspost", formData);
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
                        <h5 className="card-title radikal-medium lg:text-[28px] text-[22px] mb-5">Add Book</h5>
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
                                    <BAinput
                                        type="text"
                                        value={model.answer}
                                        onChange={(e) => {
                                            handleChange("answer", e.target.value);
                                        }}
                                        label="Answer"
                                    />
                                </div>
                                {/* <div className="col-span-12">
                                    <BAinput
                                        type="Boolean"
                                        label="status"
                                        value={model.status}
                                        onChange={(e) => {
                                            handleChange("status", e.target.value);
                                        }}
                                    />
                                </div> */}

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

export default Faqsform