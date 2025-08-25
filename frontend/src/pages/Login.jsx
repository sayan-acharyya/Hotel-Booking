import React, { useContext, useState } from 'react'
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const Login = () => {

    const {setUser,  navigate,setOwner, axios ,setCurrentUser} = useContext(AppContext);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
         const { data } = await axios.post("/api/user/login", formData);
         if(data.success){
              toast.success(data.message);
              setCurrentUser(data.user); 
              if(data.user.role === "owner"){
                setOwner(true)
                navigate("/owner");
              } else{
                setUser(true)
                navigate("/")
              }
         }else{
          toast.error(data.message);
         }

    }catch(error){
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <div className='mt-40 flex justify-center items-center mb-4 '>
      <form onSubmit={submitHandler} className="max-w-96 w-full mx-auto text-center border border-gray-300/60 rounded-2xl px-8 bg-white  shadow-md">
        <h1 className="text-blue-700 font-bold text-3xl mt-10  ">Login</h1>
        <p className="text-gray-600 text-sm mt-2">Good to see you again — let’s find your stay</p>
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail className='text-gray-500  w-4 h-4' />
          <input
            type="email"
            placeholder="Email id"
            name='email'
            value={formData.email}
            onChange={onChangeHandler}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock className='text-gray-500  w-4 h-4' />
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={formData.password}
            onChange={onChangeHandler}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />
        </div>
        <div className="mt-5 text-left text-indigo-500">

        </div>

        <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
          Login
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">Don’t have an account? <Link className="text-indigo-500" to="/signup">Sign up</Link></p>
      </form>
    </div>
  )
}

export default Login