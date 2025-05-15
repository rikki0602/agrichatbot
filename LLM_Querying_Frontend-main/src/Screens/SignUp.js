import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/10.jpg";
import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";

function SignUp() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    if (!json.success) {
      alert("Error signing up");
    } else {
      localStorage.setItem("authToken", json.token);
      navigate("/login");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-screen flex flex-col items-center min-h-screen bg-custom-background bg-cover bg-center">
      <div className="w-full"><LandingNavbar /></div>
      <div className="bg-[#141F0E] bg-opacity-0 w-[40vw] h-full flex items-center justify-center" id="section5">
        <div className="w-full bg-[#97A760] bg-opacity-80 shadow-lg p-12 pt-8 h-[65vh] flex flex-col justify-center justify-items-center">
        <h2 className="text-2xl font-bold mb-4 text-white">SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-neutral-dark mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 shadow-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-neutral-dark mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 shadow-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-neutral-dark mb-1"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={onChange}
              required
              className="w-full p-2 border border-neutral rounded focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="w-2/3 bg-[#3a4e1d] text-white py-2 mt-6 px-4 rounded-full hover:bg-[#304118] transition duration-300"
            >
              Sign Up
            </button>
          </div>
          
        </form>
      </div>
      </div>
      <div className="w-full"><Footer /></div>
      
      
    </div>
  );
}

export default SignUp;
