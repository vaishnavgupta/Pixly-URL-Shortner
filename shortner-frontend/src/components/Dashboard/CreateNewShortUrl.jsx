import React, { useState } from 'react'
import { useStoredContext } from '../../contextApi/ContextApi'
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import Tooltip from '@mui/material/Tooltip';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api';
import toast from 'react-hot-toast';

const CreateNewShortUrl = ({setOpen, refetch}) => {

    const {token} = useStoredContext();
    const [loading,setLoading] = useState(false);

    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm({
        defaultValues : {
            original_url : ""
        },
        mode : "onTouched",
    });

    const createShortUrlHandler = async(data) => {
        setLoading(true);
        try{
            const {data : res} = await api.post("/api/urls/shorten", data, {
                headers: {
                    "Content-Type" : "application/json",
                    Accept : "application/json",
                    Authorization : "Bearer " + token,
                },
            });

            const shortenedUrl = `${import.meta.env.VITE_FRONTEND_REACT_URL}/${res.shortUrl}`;
            navigator.clipboard.writeText(shortenedUrl).then(() => {
                toast.success('Short URL Copied to Clipboard', {
                    position: "bottom-center",
                    className: "mb-6",
                    duration: 3000
                });
            });
            reset();
        }catch(error){
            console.log("!! ERROR !! " + error)
            toast.error('An Error Ocurred', {
                    position: "bottom-center",
                    className: "mb-6",
                    duration: 3000
            });
        }finally{
            setLoading(false);
            setOpen(false)
        }
    };

  return (
    <div className='flex justify-center items-center bg-white rounded-md'>
      <form onSubmit={handleSubmit(createShortUrlHandler)}
      className="sm:w-[450px] w-[360px] relative  shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >

        <h1 className="font-montserrat sm:mt-0 mt-3 text-center  font-bold sm:text-2xl text-[22px] text-slate-800 ">
                Create New Shorten Url
        </h1>

        <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />

        <div>
            <TextField
                label="Original Url"
                required
                id="original_url"
                placeholder="https://www.youtube.com"
                type="url"
                message="Url is Required"
                register={register}
                errors={errors}
            />
        </div>

        <button
          className="font-semibold text-white w-32  bg-gradient-to-r from-[#8F3A84] via-purple-600 to-blue-700  py-2  transition-colors  rounded-md my-3"
          type="text"
        >
          {loading ? "Loading..." : "Create"}
        </button>

        {!loading && (
          <Tooltip title="Close">
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              className=" absolute right-2 top-2  "
            >
              <RxCross2 className="text-slate-800   text-3xl" />
            </button>
          </Tooltip>
        )}

      </form>
    </div>
  )
}

export default CreateNewShortUrl
