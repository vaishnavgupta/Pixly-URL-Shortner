import React, { useEffect, useState } from 'react'
import Graph from './Graph'
import { fetchTotalClicks } from '../../api/fetchTotalClicks'
import CreateUrlPopup from './CreateUrlPopup';
import { fetchTotalShortUrls } from '../../api/fetchTotalShortUrls';
import { FaLink } from 'react-icons/fa'
import ShortenUrlLIst from './ShortenUrlLIst';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { useStoredContext } from '../../contextApi/ContextApi';

const DashboardPage = () => {
  const { token } = useStoredContext();
  const [data, setData] = useState([]);
  const [urlData, setUrlData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shortUrlPopUp , setShortUrlPopUp] = useState(false);
  const refetch = false;
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const clicks = await fetchTotalClicks(token, "2025-01-01", "2026-12-31");
        const formatted = convertData(clicks);
        setData(formatted);
      } catch (err) {
        console.error(err);
        redirectToError();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  console.log(data);

  useEffect(() => {
    const loadUrlsData = async () => {
      try {
        const myUrls = await fetchTotalShortUrls(token);
        const formatted = convertToUrlsData(myUrls);
        setUrlData(formatted);
      } catch (err) {
        console.error(err);
        redirectToError();
      } finally {
        setLoading(false);
      }
    };
    loadUrlsData();
  }, [token]);

  console.log(urlData);

  const convertData = (dataObj) => {
    return Object.keys(dataObj).map((date, index) => ({
      id: index + 1,
      clickDate: date,
      count: dataObj[date],
    }));
  };

  const convertToUrlsData = (dataArray) => {
    return dataArray.map((item) => ({
      id: item.id,
      originalUrl: item.originalUrl,
      shortUrl: item.shortUrl,
      clickCount: item.clickCount,
      createdAt: item.createdAt,
    }));
  };

  const redirectToError = () => {
    console.log("Error Occured --> Error Page")
    navigate('/error');
  }

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      {loading ? (
        <div className='flex flex-col items-center justify-center w-full h-[500px]'>
          <FallingLines
            color="#8F3A84"
            width="65"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
          <p>Building Anaytics for you...</p>
        </div>
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className="h-96 relative">
            {data.length === 0 && (
                <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                    <h1 className=" text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                       No Data For This Time Period
                    </h1>
                    <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600 ">
                       Share your short link to view where your engagements are
                       coming from
                    </h3>
                </div>
            )}
            <Graph graphData={data} />
          </div>
          <div className="py-5 sm:text-end text-center">
            <button className="bg-gradient-to-r from-[#8F3A84] via-purple-600 to-blue-700 px-4 py-2 text-white rounded-md"
            onClick={() => setShortUrlPopUp(true)}
            >
              Create New Short URL
            </button>
          </div>

            <div>
              {!loading && urlData.length === 0 ? (
                <div className="flex justify-center pt-16">
                  <div className="flex gap-2 items-center justify-center  py-6 sm:px-8 px-5 rounded-md   shadow-lg  bg-gray-50">
                    <h1 className="text-slate-800 font-montserrat   sm:text-[18px] text-[14px] font-semibold mb-1 ">
                      You haven't created any short link yet
                    </h1>
                    <FaLink className="text-blue-500 sm:text-xl text-sm " />
                  </div>
                </div>
              ) : (
                <ShortenUrlLIst shortenUrlData={urlData}/>
              )}
            </div>

        </div>
      )}

      <CreateUrlPopup
        refetch={refetch}
        open = {shortUrlPopUp}
        setOpen={setShortUrlPopUp}
      />

    </div>
  );
};

export default DashboardPage;
