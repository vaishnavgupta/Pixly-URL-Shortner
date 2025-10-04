import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoredContext } from '../contextApi/ContextApi';

const LoginPage = () => {

    const [loader , setLoader] = useState(false);
    const {setToken} = useStoredContext()
    
    const navigate  = useNavigate()
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues : {
            username : "",
            email : "",
            password : "",
        },
        mode : "onTouched",
    });
    
      const loginHandler = async(data) => {
        setLoader(true);
        try {
            const {data : response} = await api.post(
                "/api/auth/public/login",
                data
            );
            toast.success('User Login Successfull', {
                position: "bottom-center"
            })
            setToken(response.token);
            localStorage.setItem("JSON_WEB_TOKEN",JSON.stringify(response.token));
            console.log(response.token);
            //Storing the JWT Token in Local Browser Storage
            reset();
            navigate("/dashboard");
        } catch (error) {
            console.error(error)   
            toast.error("User Login Failed",{
                position: "bottom-center"
            })
        } finally{
            setLoader(false);
        }
      };

  return (
    <div
        className='min-h-[calc(100vh-64px)] flex justify-center items-center'
    >
      <form onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] border border-gray-300 shadow-custom py-8 sm:px-8 px-4 rounded-md">
            <h1 className='text-center font-serif text-[#8F3A84] font-bold lg:text-3xl text-2xl'>
                Login Here
            </h1>

            <hr className='mt-2 mb-5 text-black'/>

            <div className='flex flex-col gap-3'>
                <TextField
                    label="Username"
                    required
                    placeholder="Enter Username"
                    id = "username"
                    type = "text"
                    message="Username is required"
                    register={register}
                    errors={errors}
                />
                <TextField
                    label="Password"
                    required
                    placeholder="Enter Password"
                    id = "password"
                    type = "password"
                    message="Password is required"
                    min={6}
                    register={register}
                    errors={errors}
                />
            </div>

            <button 
            type='submit'
            disabled = {loader}
            className='font-semibold text-white bg-gradient-to-r from-[#8F3A84] via-purple-600 to-blue-700 w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'
            >
                {loader ? "Loading..." : "Login"}
            </button>

            <p className='text-center text-sm text-slate-700 mt-6'>
                Don't have an account?  
                <Link
                    className='font-semibold underline hover:text-black'
                    to="/register">
                        <span className='text-blue-600'> Register Here</span>
                </Link>
            </p>

      </form>
    </div>
  )
}

export default LoginPage
