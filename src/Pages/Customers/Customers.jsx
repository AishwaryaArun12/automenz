import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getClientData } from '../../api/api'
import { Paginations } from '../../Components/Pagination/Paginations'
import { useLoading } from '../../store/LoadingContext'
import '../../toast.css'
import AddVehicle from '../Vehicles/AddVehicle'
import AddCustomer from './AddCustomer'

const Customers = () => {
  const {setIsLoading} = useLoading()
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState({})
  const [search,setSearch] = useState('');
   const [page,setPage] = useState(1)
  const [count,setCount] = useState(0);
  const [data, setData] = useState();
  const [ addVehicle,setAddVehicle] = useState(false);
  const [id,setId] = useState('');
  const [clientName, setClientName] = useState('')
  const navigate = useNavigate();


  useEffect(()=>{
    (async function(){
      try {
        
        setIsLoading(true)
        const res = await getClientData(search,page);        
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
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl">Clients</h1>
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
        <div>
              <button onClick={()=>{setData();setOpen(true)}} className="text-black  p-2 inline-flex font-semibold items-center h-9 rounded-lg bg-yellow-400">
                Add Client
              </button>
            </div>
      </div>
      
      <div class="bg-[#0A0A0B] p-4 rounded-lg shadow-md overflow-x-auto">
        <table class="min-w-full text-left">
          <thead className="border-b border-b-zinc-700">
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Company</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Location</th>
              <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2"><span className=' text-lg'> + </span> Vehicle</th>
              <th className='px-4 py-2'>Edit</th>
              <th class="px-4 py-2">More</th>
            </tr>
          </thead>
          <tbody>
          {tableData?.clients?.length ? tableData?.clients.map((data)=> <tr >
              <td class="px-4 py-2 flex items-center">
                <img
                  src={data?.image ? data?.image : '/user.png'}
                  alt="Customer"
                  class="w-10 h-10 rounded-full mr-4"
                />
                {data?.name}
              </td>
              <td class="px-4 py-2">{data?.company}</td>
              <td class="px-4 py-2">{data.email}</td>
              <td class="px-4 py-2">
                
                {data.location}
              </td>
              <td class="px-4 py-2">
                <span class="text-yellow-500">{data.contactNumber}</span>
              </td>
              <td class="px-4 py-5 flex justify-center items-center">
                <button className="p-0.5 flex mx-2 bg-yellow-400 rounded-md" onClick={()=>{setClientName(data.name); setId(data._id); setAddVehicle(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 -ml-2 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
               
                </button>
              </td>
              <td><button className="p-2 mx-5 bg-yellow-400 rounded-md" onClick={()=>{setData(data); setOpen(true)}}>
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.59647 11.4728L1 13L1.17582 9.99259L6.61001 1.09714C6.63833 1.0512 6.68368 1.01832 6.73615 1.00569C6.78862 0.993047 6.84396 1.00167 6.8901 1.02967L8.96318 2.29724C9.00912 2.32556 9.042 2.37091 9.05463 2.42338C9.06727 2.47585 9.05865 2.53119 9.03065 2.57733L3.59647 11.4728Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.74219 2.51367L8.16283 3.99386" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.05469 11.9102L1.9379 12.4499" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button></td>
              <td class="px-4 py-2 text-green-500"><div
         
          onClick={() => {
            navigate(`/customers/${data._id}`);
          }}
          className="bg-yellow-400 rounded-full w-9 h-9 p-2 px-4  cursor-pointer"
        >
          {" "}
          <img
            src="/Vector.png"
            className={` w-5 h-4 translate`}
            alt=""
          />
        </div></td>
            </tr>) : <div className=" text-white h-40 items-center flex flex-col justify-center text-xl">No data to preview.</div>}
            

            
          </tbody>
        </table>
      </div>
      {count && <div class="flex justify-between items-center mt-4">
        <span class="text-zinc-400">Showing {tableData.totalClients >= 7 ? count == page ? tableData.totalClients -((page -1) * 7) : 7 : tableData.totalClients} of {tableData.totalClients} {tableData.totalClients ==1 ?'user' : 'users'}</span>
        <div className=" flex justify-center mt-4 mb-5">     
         <Paginations totalPage={count} handlePageChange={handlePageChange}/></div>
      </div>}
      {open &&  <AddCustomer clientData={data} setClients={setTableData} setOpen={setOpen}/>}
      {addVehicle && <AddVehicle clientName={clientName} id={id} setOpen={setAddVehicle}/>}
    </div>
  )
}

export default Customers
