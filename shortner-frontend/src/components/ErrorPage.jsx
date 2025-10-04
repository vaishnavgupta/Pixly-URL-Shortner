import React from 'react'
import { BiSolidErrorAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({message}) => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>

      <BiSolidErrorAlt className='text-5xl text-red-600 mb-3'  />
      <h1 className='font-bold font-sans text-3xl'>Oh! Something went wrong</h1>
      <p className='mt-4 font-sans text-2xl font-semibold mb-2'>{message}</p>
      
      <button onClick={() => navigate('/')} className='font-semibold bg-gradient-to-r from-[#8F3A84] via-purple-600 to-blue-700 text-white rounded-md px-4 py-2'>
        Go to Home
      </button>

    </div>
  )
}

export default ErrorPage
