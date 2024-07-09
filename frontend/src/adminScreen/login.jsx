import BAbutton from "../component/button";
import BAinput from "../component/input";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import login from "../asset/images/login.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [model, setModel] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const fillModel = (key, val) => {
    model[key] = val;
    setModel({ ...model });
  };

  let LoginUser = async () => {
    const formData = {
      userName: model.userName,
      password: model.password,
      role: model.role
    };
    try {
      const response = await axios.post("http://localhost:8000/auth/login", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      if (response.data.isSuccessfull === true) {
        const userRole = response.data.data.user.role;
        const token = response.data.data.token;;
        localStorage.setItem("authToken", token);
        localStorage.setItem("role", userRole);
        if (userRole === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/book");
        }
      } else {
        console.error("Login error:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (



    <div className="max-w-7xl mx-auto lg:px-0 px-2">
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center gap-4">
        <div className="flex justify-center self-center z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <img src={login} className="w-10/12" />
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="">
            <div className="mb-4">
              <h1 className="mb-3 font-bold text-[40px] capitalize"> Welcome to our sites 👋 </h1>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">UserName</label>
                <BAinput
                  type="text"
                  label="userName"
                  value={model.userName}
                  onChange={(e) => fillModel("userName", e.target.value)}
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <BAinput
                  type={showPassword ? "text" : "password"}
                  label="password"
                  value={model.password}
                  onChange={(e) => fillModel("password", e.target.value)}
                />
                <span
                  className="absolute right-2 top-9 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                <label for="remember_me" className="ml-2 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <div className="py-2">
                <BAbutton onClick={LoginUser} label="Login" />
              </div>
              <div className="text-center">
                <Link className="text-gray-800" to="/signup">Create an Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
