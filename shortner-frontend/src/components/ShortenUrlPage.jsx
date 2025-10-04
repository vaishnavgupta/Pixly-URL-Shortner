import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ShortenUrlPage = () => {
    const { url } = useParams();    //extracts dynamic part of URL

    useEffect(() => {
        if(url){
            window.location.href = import.meta.env.VITE_BACKEND_SB_URL + `/${url}`
        }
    } , [url]);

  return null;
}
export default ShortenUrlPage;
