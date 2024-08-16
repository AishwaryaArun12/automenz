import { default as React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { DeleteVehicle, getVehicleData } from '../../api/api';
import DeleteModal from '../../Components/DeleteModal';
import { Paginations } from '../../Components/Pagination/Paginations';
import { useLoading } from '../../store/LoadingContext';
import '../../toast.css';
import AddVehicle from './AddVehicle';

const Vehicles = () => {
    const {setIsLoading} = useLoading()
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState({})
  const [search,setSearch] = useState('');
   const [page,setPage] = useState(1)
  const [count,setCount] = useState(0);
  const [data, setData] = useState();
  const [deleteModal, setDeleteModal] = useState(false)
  const [id,setId] = useState();
  const navigate = useNavigate();
  async function deletefn(){
    try {
        setIsLoading(true);
        await DeleteVehicle(id);
        setIsLoading(false);
        setDeleteModal(false);
        setTableData(prev => ({
            ...prev,
            vehicles: prev.vehicles.filter(vehicle => 
              vehicle._id != id
            )
          }));
        toast('Selected Vehicle Deleted successfully.')
    } catch (error) {
        setDeleteModal(false);
        setIsLoading(false);
        toast(error.message)
    }
}

  useEffect(()=>{
    (async function(){
      try {
        
        setIsLoading(true)
        const res = await getVehicleData(search,page); 
        console.log(res.data,'kkkkk')       
        setTableData(res.data)
        setCount(res.data.totalPages)
        setIsLoading(false)
      } catch (error) {
        console.log(error,'yyyyyyyyyy')
        setIsLoading(false)
        toast(error.message)
      }
    })()
  },[search,page])
  function handlePageChange(event, newPage){
    setPage(newPage)
  }
  return (
    <div class="min-h-screen  text-white p-4">
        <ToastContainer/>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl">Vehicles</h1>
      <div class="relative">
        <input
          type="text"
          placeholder="Search..."
          class="bg-[#0A0A0B] text-white p-2 pl-10 rounded-md focus:outline-none"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <svg
          class="w-5 h-5 text-zinc-500 absolute left-3 top-3"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14A6 6 0 108 2a6 6 0 000 12z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
     
    </div>
    
    <div class="bg-[#0A0A0B] p-4 rounded-lg shadow-md overflow-x-auto">
      <table class="min-w-full text-left text-sm lg:text-sm">
        <thead className="border-b border-b-zinc-700">
          <tr>
            <th class="px-4 py-2 whitespace-nowrap">Model</th>
            <th class="px-4 py-2whitespace-nowrap">Maker</th>
            
            <th class="px-4 py-2 whitespace-nowrap">Colour</th>
            <th class="px-4 py-2 whitespace-nowrap">Client</th>
            <th class="px-4 py-2 whitespace-nowrap">Client Phone</th>
            <th className='px-4 py-2 whitespace-nowrap'>Actions</th>
            {/* <th class="px-4 py-2">Delete</th> */}
          </tr>
        </thead>
        <tbody>
        {tableData?.vehicles?.length ? tableData?.vehicles.map((data)=> <tr >
            <td class="px-4 py-2 whitespace-nowrap flex items-center justtify-start mr-3">
              <img
                src={data?.image ? data?.image : '/car1.jpeg'}
                alt="Vehicle"
                class="w-10 h-10 rounded-full mr-4"
              />
              {data?.model}
            </td>
            <td class="px-4 py-2 whitespace-nowrap">{data?.maker}</td>
            
            <td class="px-4 py-2 whitespace-nowrap">
              <span class="text-yellow-500">{data.color}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">{data?.client.name}</td>
            <td class="px-4 py-2 whitespace-nowrap">{data?.client.contactNumber}</td>
           
            <td className='whitespace-nowrap flex items-center'>
            <button className="p-2  bg-[#1F222A] rounded-l-md border border-gray-800" onClick={()=>{setData(data); setOpen(true)}}>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="#e2e8fa" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.6">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.06535 8.15755L6.05469 8.44518L6.34177 6.43397L11.5125 1.26322C11.9885 0.787261 12.7602 0.787261 13.2361 1.26322C13.7121 1.73917 13.7121 2.51084 13.2361 2.9868L8.06535 8.15755Z" stroke="#6F757E" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.9375 1.83594L12.6611 3.55952" stroke="#6F757E" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.1562 8.21875V12.2812C11.1562 12.73 10.7925 13.0938 10.3438 13.0938H2.21875C1.77002 13.0938 1.40625 12.73 1.40625 12.2812V4.15625C1.40625 3.70752 1.77002 3.34375 2.21875 3.34375H6.28125" stroke="#6F757E" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </svg>

            </button>
            <div 
            onClick={() => navigate(`/vehicles/${data._id}`,{
                state: { vehicle : data},
              })}
            className=" border border-y-gray-800 bg-[#1F222A] w-10 h-8 p-1 flex items-center justify-center cursor-pointer"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
            <button
            onClick={() => {
                setDeleteModal(true);
                setId(data._id)
              }}
      
            className="p-2 bg-[#1F222A] rounded-r-md border border-gray-800 "
        >
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9094 13.0156H4.08438C3.5459 13.0156 3.10938 12.5791 3.10938 12.0406V3.26562H11.8844V12.0406C11.8844 12.5791 11.4479 13.0156 10.9094 13.0156Z" stroke="#F85949" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.03984 10.0875V6.1875" stroke="#F85949" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.96172 10.0875V6.1875" stroke="#F85949" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.16406 3.2625H13.8391" stroke="#F85949" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.9625 1.3125H6.0375C5.49902 1.3125 5.0625 1.74902 5.0625 2.2875V3.2625H9.9375V2.2875C9.9375 1.74902 9.50098 1.3125 8.9625 1.3125Z" stroke="#F85949" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </button>
        </td>
            
          </tr>) : <div className=" text-white h-40 items-center flex flex-col justify-center text-xl">No data to preview.</div>}
          

          
        </tbody>
      </table>
    </div>
    {count && <div class="flex justify-between items-center mt-4">
      <span class="text-zinc-400">Showing {tableData.totalClients >= 7 ? count == page ? tableData.totalClients -((page -1) * 7) : 7 : tableData.totalClients} of {tableData.totalClients} {tableData.totalClients ==1 ?'user' : 'users'}</span>
      <div className=" flex justify-center mt-4 mb-5">     
       <Paginations totalPage={count} handlePageChange={handlePageChange}/></div>
    </div>}
    {open &&  <AddVehicle vehicleData={data} setVehicles={setTableData} setOpen={setOpen}/>}
    {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} deleteFn={deletefn}/>}
  </div>
  )
}

export default Vehicles
