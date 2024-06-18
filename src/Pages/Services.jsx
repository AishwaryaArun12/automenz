import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { toast } from "react-toastify";
import { useLoading } from "../store/LoadingContext";
import theme from "../Components/Theme";

const Services = () => {
  const navigate = useNavigate();
  const tableData = [{}]
  const { isLoading, setIsLoading } = useLoading();
  const [search,setSearch] =  useState('');
  const [page,setPage] = useState(1);
  const [data,setData] = useState([]);
  const [currency,setCurrency] = useState();
  const [count,setCount] = useState(10);

//   useEffect(()=>{
//     async function getData(){
//       try {
//         dispatch(loader())
//         const res = await getAllFoods(page,search);
//         setData(res.data.response.foods);
//         setCurrency(res.data.response.currency);
//         setCount(res.data.response.totalCount);
//         dispatch(loader())
//       } catch (error) {
        
//         toast(error.message)
//         dispatch(loader());
//       }
//     }
//     getData()
//   },[search,page])
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div className="h-full min-h-[600px] shadow-sm p-4">
      <p className="text-white text-2xl font-semibold mb-9">All Services</p>
      <div class="relative flex flex-col-2 mt-2">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-3 ps-10 text-sm bg-bodycolur rounded-lg"
          placeholder="Search Product"
           onChange={(e) => {
             setSearch(e.target.value);
           }}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div></div>
            <div>
              <button onClick={()=>{navigate('/service/add')}} className="text-black  p-2 inline-flex font-semibold items-center h-9 rounded-lg bg-yellow-400">
                Add Service
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full rounded-lg mt-10 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {tableData?.length ?<> <table className="min-w-[70vh] w-full text-center text-white  leading-normal mt-5">
          <thead className="border-b  border-b-[#3F3F3F]">
            <tr>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Vehicle
              </th>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Customer
              </th>
              {/* <th className="px-5 py-6  text-left text-sm font-semibold  capitalize tracking-wider"></th> */}
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Service
              </th>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Date
              </th>

              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border-b-2  border-b-[#3F3F3F]">
            {tableData.map((data,i) => <tr className="" style={{ height: "50px" }}>
              <td className="px-5 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src={data.image}
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                  </div>
                  {data.productName}
                </div>
              </td>
              <td className="px-5 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src={data?.userDetails?.image ? data?.userDetails?.image : "/user.png"}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                  {data?.userDetails?.name}
                </div>
              </td>

              <td className="px-5 py-5 text-xs text-[#6F757E]">
                <div className="">
                  <div className="flex items-center justify-start px-3 mb-3 gap-2 mt-2">
                  {[...Array(data.rating)].map((_, i) => (
                      <img key={i} src="/ratingStar.png" alt="star" className="w-4" />
                    ))}       
                    
                  </div>
                  {data.review}
                </div>
              </td>
              <td className="px-5 py-3 text-sm">{new Date(data.date).toLocaleDateString()}</td>

              <td className="px-5 py-3 text-sm">
                <div className="bg-[#1F222A] rounded-md border flex border-[#6F757E]">
                  <button className="flex w-full items-center justify-center   p-1">
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9094 13.0156H4.08438C3.5459 13.0156 3.10938 12.5791 3.10938 12.0406V3.26562H11.8844V12.0406C11.8844 12.5791 11.4479 13.0156 10.9094 13.0156Z"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.03984 10.0875V6.1875"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.96172 10.0875V6.1875"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.16406 3.2625H13.8391"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.9625 1.3125H6.0375C5.49902 1.3125 5.0625 1.74902 5.0625 2.2875V3.2625H9.9375V2.2875C9.9375 1.74902 9.50098 1.3125 8.9625 1.3125Z"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>)}
           
          </tbody>
        </table> 
        </> : <div className=" text-white pt-40 text-2xl  text-center">No Foods to Preview</div>}
        {tableData.length >0 && <div className="w-full flex justify-end px-10 mb-4 mt-8">
          <ThemeProvider theme={theme}>
            <Pagination
              count={Math.ceil(tableData.length)}
               onChange={handlePageChange}
            />
          </ThemeProvider>
        </div>}
      </div>
    </div>
  );
};

export default Services;
