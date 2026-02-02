import { useState } from "react";
import Graph from "./Graph.jsx";
import { useStoreContext } from "../contextApi/ContextApi.jsx";
import { useFetchTotalClicks, useFetchMyShortUrls } from "../hooks/useQuery.js";
import ShortenPopUp from "./ShortenPopUp.jsx";
import ShortenUrlList from "./ShortenUrlList.jsx";
import { FaLink } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Loader from "../components/Loader.jsx";

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

// Get default dates (current year)
const getDefaultDates = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31);
  return {
    start: formatDate(startOfYear),
    end: formatDate(endOfYear),
  };
};

const DashboardLayout = () => {
  // const refetch = false;
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);
  const defaultDates = getDefaultDates();
  const [startDate, setStartDate] = useState(defaultDates.start);
  const [endDate, setEndDate] = useState(defaultDates.end);

  const {
    isLoading,
    data: myShortenUrls,
    refetch,
  } = useFetchMyShortUrls(token, onError);
  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(
    token,
    startDate,
    endDate,
    onError,
  );
  function onError() {
    navigate('/error');
  }
  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className="flex flex-wrap gap-4 mb-4 items-center justify-center sm:justify-start">
            <div className="flex items-center gap-2">
              <label htmlFor="startDate" className="text-slate-700 font-medium">
                From:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="endDate" className="text-slate-700 font-medium">
                To:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className=" h-96 relative ">
            {totalClicks.length === 0 && (
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
            <Graph graphData={totalClicks} />
          </div>
          <div className="py-5 sm:text-end text-center">
            <button
              className="bg-custom-gradient px-4 py-2 rounded-md text-white"
              onClick={() => setShortenPopUp(true)}
            >
              Create a New Short URL
            </button>
          </div>
          <div>
            {!isLoading && myShortenUrls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-2 items-center justify-center  py-6 sm:px-8 px-5 rounded-md   shadow-lg  bg-gray-50">
                  <h1 className="text-slate-800 font-montserrat   sm:text-[18px] text-[14px] font-semibold mb-1 ">
                    You haven't created any short link yet
                  </h1>
                  <FaLink className="text-blue-500 sm:text-xl text-sm " />
                </div>
              </div>
            ) : (
              <ShortenUrlList data={myShortenUrls} />
            )}
          </div>
        </div>
      )}
      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashboardLayout;
