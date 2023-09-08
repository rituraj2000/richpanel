import React, { useState } from "react";
import { RegisterUser } from "../../apicalls/userAPIcalls";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const register = async () => {
    try {
      const response = await RegisterUser(user);

      if (response.success) {
        toast(response.message);
      } else {
        toast(response.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const [user, setUser] = useState({
    name: "",
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
    register(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#004E96]">
      <div className="bg-white px-11 py-7 rounded-3xl shadow-lg w-96 flex flex-col items-center">
        <div className=" p-4 font-medium text-lg">Create Account</div>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Name field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border shadow-sm"
            />
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border shadow-sm"
            />
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border shadow-sm"
            />
          </div>

          <div className=" text-xs pb-4 flex items-center"> <div className="border-2 border-slate-400 rounded-sm m-1 p-1 h-1 w-1"></div> Remmber Me</div>

          {/* Register button */}
          <button
            type="submit"
            className="bg-[#004E96] text-white p-2 w-full rounded-md shadow-sm"
          >
            Sign Up
          </button>

          {/* Register navigation link */}
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/" className="text-blue-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
