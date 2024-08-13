import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { getDashboard } from "../api/api";
import { Card } from '../Components/Card';
import { useLoading } from "../store/LoadingContext";
export const Dashboard = () => {
  const {setIsLoading} = useLoading();
  const [card, setCard] = useState();
  const [tableData,setTableData] = useState([]);
  useEffect(()=>{
    (async function(){
      try {
        
        setIsLoading(true)
        const res = await getDashboard(); 
        setCard(res.data)
        console.log(res.data,'wwwwww')
        setTableData(res.data.expiredSpares)
        setIsLoading(false)
      } catch (error) {
        console.log(error,'yyyyyyyyyy')
        setIsLoading(false)
        toast(error.message)
      }
    })()
  },[])

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
      <Card  text={'Totoal Customers'} num={card?.clients}/>
      <Card  text={'Totoal Vehicles'} num={card?.vehicles}/>
      <Card  text={'Totoal Services'} num={card?.services}/>
      <Card  text={'Totoal Spareparts'} num={card?.spares}/>
      </div>
      <h1 className='text-white/65 text-3xl'>Upcoming Services</h1>
      {/* table start */}
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
             
              <th className="px-5 py-6  text-left text-sm font-semibold  capitalize tracking-wider">
                Vehicle No.
              </th>
              <th className="px-5 py-6  text-left text-sm font-semibold  capitalize tracking-wider">
                Service Date
              </th>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Customer
              </th>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Phone
              </th>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Spare
              </th>
            </tr>
          </thead>
          <tbody className="border-b-2  border-b-[#3F3F3F]">
            {tableData.map((data,i) => <tr className="" style={{ height: "50px" }}>
              <td className="px-5 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src={data.vehicleImage ? data?.vehicleImage : '/car1.jpeg'}
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                  </div>
                  {data.vehicleModel} {data.vehicleMaker}
                </div>
              </td>
              <td className="px-5 py-3 text-sm">{data?.reg}</td>

              <td className="px-5 py-3 text-sm">{new Date(data.date).toLocaleDateString()}</td>

              <td className="px-5 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src={data?.clientImage ? data?.clientImage : "/user.png"}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                  {data?.clientName}
                </div>
              </td>

              <td className="px-5 py-5 text-xs text-[#6F757E]">
                <div className="">
                 
                  {data.clientContactNumber}
                </div>
              </td>

              <td className="px-5 py-3 text-sm">
              <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src={data?.spare?.image ? data?.spare?.image : "/spare.jpeg"}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                  {data?.spare?.name}
                </div>
              </td>
            </tr>)}
           
          </tbody>
        </table> 
        </> : <div className=" text-white pt-40 text-2xl  text-center">No Spares Expired</div>}
        
      </div>
 
    </div>
  )
}
