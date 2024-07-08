import BAbutton from "../component/button";
import BAinput from "../component/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function UserRegister() {
    const [model, setModel] = useState({
        userName: "",
        email: "",
        password: "",
        cnic: ""
    });

    const fillModel = (key, val) => {
        model[key] = val;
        setModel({ ...model });
    };

    const navigate = useNavigate();

    let UserRegister = async (e) => {
        console.log(model);
        e.preventDefault();

        const formData = {
            "userName": model.userName,
            "email": model.email,
            "password": model.password,
            "cnic": model.cnic
        }
        try {
            const response = await axios.post("http://localhost:8000/signup", formData);
            console.log(response.data);
            if (response.data.error == "") {
                navigate('/getuser');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            <div className="my-5">
                <div className="max-w-7xl mx-auto lg:px-0 px-2">
                    <div className="bg-[#ffffff] shadow-md p-4 rounded-[10px]">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> User Register</h5>
                                <form>
                                    <div className="p-2">
                                        <BAinput
                                            type="text"
                                            label="userName"
                                            value={model.userName}
                                            onChange={(e) => fillModel("userName", e.target.value)}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <BAinput
                                            type="text"
                                            label="Email"
                                            value={model.email}
                                            onChange={(e) => fillModel("email", e.target.value)}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <BAinput
                                            label="password"
                                            type="password"
                                            value={model.password}
                                            onChange={(e) => fillModel("password", e.target.value)}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <BAinput
                                            label="CNIC"
                                            type="number"
                                            value={model.cnic}
                                            onChange={(e) => fillModel("cnic", e.target.value)}
                                        />
                                    </div>

                                    <div className="p-2">
                                        <BAbutton onClick={UserRegister} label={"Register"} />
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
