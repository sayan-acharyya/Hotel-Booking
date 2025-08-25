 import React, { useContext, useState } from 'react'
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const { axios, navigate } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const [loading, setLoading] = useState(false); // 👈 loading state

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader

    try {
      const { data } = await axios.post("/api/user/signup", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // stop loader
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      role: ""
    });
  };

  return (
    <div className='mt-40 flex justify-center items-center mb-4 '>
      <form 
        onSubmit={submitHandler} 
        className="max-w-96 w-full mx-auto text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-md"
      >
        <h1 className="text-blue-700 font-bold text-3xl mt-10">Sign up</h1>
        <p className="text-gray-600 text-sm mt-2">Sign up and unlock your dream stays</p>

        {/* Username */}
        <div className="flex items-center w-full mt-10 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <User className='text-gray-500 w-4 h-4' />
          <input
            type="text"
            placeholder="Username"
            name='name'
            value={formData.name}
            onChange={onChangeHandler}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center w-full mt-5 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail className='text-gray-500 w-4 h-4' />
          <input
            type="email"
            placeholder="Email id"
            name='email'
            value={formData.email}
            onChange={onChangeHandler}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Role */}
        <div className="flex items-center w-full mt-5 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <select
            name="role"
            onChange={onChangeHandler}
            value={formData.role}
            className="w-[90%] rounded-lg focus:outline-none focus:ring-0 bg-transparent text-gray-500"
            required
          >
            <option value="">Select your role</option>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock className='text-gray-500 w-4 h-4' />
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={formData.password}
            onChange={onChangeHandler}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className={`mt-5 w-full h-11 rounded-full text-white flex items-center justify-center 
          ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-500 hover:opacity-90 transition-opacity"}`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Register"
          )}
        </button>

        <p className="text-gray-500 text-sm mt-3 mb-11">
          Already have an account? <Link className="text-indigo-500" to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
