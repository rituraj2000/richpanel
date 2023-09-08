import React, { useState } from "react";
import { LoginUser } from "../../apicalls/userAPIcalls";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await LoginUser(user);
      console.log(response);
      if (response.success === true) {
        toast.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/fblogin");
      } else {
        toast(response.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#004E96]">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96 flex flex-col items-center justify-center">
        <div className=" p-4 font-medium text-lg">Login to Your Account</div>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Email field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-lg border shadow-sm"
            />
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border shadow-sm"
            />
          </div>

          <div className=" text-xs pb-4 flex items-center">
            <div className="border-2 border-slate-400 rounded-sm m-1 p-1 h-1 w-1"></div>{" "}
            Remmber Me
          </div>
          {/* Login button */}
          <button
            type="submit"
            className="bg-[#004E96] text-white p-2 w-full rounded-md shadow-sm"
          >
            Login
          </button>
        </form>

        {/* Register navigation link */}
        <div className="mt-4 text-center">
          <span className="text-gray-700">New to MyApp? </span>
          <Link to="/register" className="text-[#004E96]">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
