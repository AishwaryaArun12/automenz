import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { DeleteService, getServiceData, NewService } from '../../api/api'
import DeleteModal from '../../Components/DeleteModal'
import { Paginations } from '../../Components/Pagination/Paginations'
import { useLoading } from '../../store/LoadingContext'
import '../../toast.css'
import AddServices from './AddServices'


const Services = () => {
  const {setIsLoading} = useLoading()
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState({})
  const [search,setSearch] = useState('');
   const [page,setPage] = useState(1)
  const [count,setCount] = useState(0);
  const [data, setData] = useState();
  const [id,setId] = useState('');
  const [deleteModal,setDeleteModal] = useState(false)
  async function deleteService(){
    try {
      setIsLoading(true);
      await DeleteService(id);
      setIsLoading(false);
      setDeleteModal(false);
      setTableData(prev => ({
          ...prev,
          services: prev.services.filter(service => 
            service._id != id
          )
        }));
      toast('Selected Service Deleted successfully.')
  } catch (error) {
      setDeleteModal(false);
      setIsLoading(false);
      toast(error.message)
  }
  }

  const handleSubmit = async (formData) => {
    const res = await NewService(formData);
    getService()
  };
  async function getService(){
    try {
      
      setIsLoading(true)
      const res = await getServiceData(search,page);
      console.log(res.data,'rrrrrrrr')        
      setTableData(res.data)
      setCount(res.data.totalPages)
      setIsLoading(false)
    } catch (error) {
      console.log(error,'yyyyyyyyyy')
      setIsLoading(false)
      toast(error.message)
    }
  }


  useEffect(()=>{
    getService()
  },[search,page])
  function handlePageChange(event, newPage){
    setPage(newPage)
  }
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
          class="block w-full p-3 ps-10 text-sm bg-zinc-500 rounded-lg"
          placeholder="Search Service..."
           onChange={(e) => {
             setSearch(e.target.value);
           }}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div></div>
            <div>
              <button onClick={() => setOpen(true)} className="text-black  p-2 inline-flex font-semibold items-center h-9 rounded-lg bg-yellow-400">
                Add Service
              </button>
       
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#0A0A0B] p-4 rounded-lg shadow-md overflow-x-auto">
        <table class="min-w-full text-gray-200 overflow-x-auto text-left">
        <thead className="border-b border-b-[#3F3F3F]">
    <tr>
      <th className="px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Vehicle
      </th>
      <th className="px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Client Name
      </th>
      <th className="px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Phone
      </th>
      <th className="px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Service Type
      </th>
      <th className="px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Service Date
      </th>
      <th className="px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Spares
      </th>
      <th className="px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Next Service
      </th>
      <th className="px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Edit
      </th>
    </tr>
  </thead>
          <tbody>
          {tableData?.services?.length ? tableData?.services.map((service,i)=> <tr key={i} className="" style={{ height: "50px" }}>
        <td className="px-5 py-3 text-sm">
          {service?.vehicle?.registrationNumber}
        </td>
        <td className="px-5 py-3 text-sm">
          {service.vehicle?.client?.name}
        </td>
        <td className="px-5 py-3 text-sm">
          {service.vehicle.client.contactNumber}
        </td>
        <td className="px-5 py-3 text-sm">{service.serviceType}</td>
        <td className="px-5 py-3 text-sm">
          {new Date(service.serviceDate).toLocaleDateString()}
        </td>
        <td className="px-5 py-3 text-sm">
          <ul>
            <p className='py-2 text-yellow-600'>Replaced Spares</p>
            {service.replacedSpares.map((spare, index) => (
              <li key={index} className="mb-2">
                {spare.spare.name} - Qty: {spare.quantity}
              </li>
            ))}
            <p className='py-2 text-yellow-600'>Renewal Spares</p>
            {service.renewalSpares.map((spare, index) => (
              <li key={index} className="mb-2">
                {spare.spare.name} - Qty: {spare.quantity}
              </li>
            ))}
            <p className='py-2 text-yellow-600'>Mandatory Spares</p>
            {service.mandatorySpares.map((spare, index) => (
              <li key={index} className="mb-2">
                {spare.spare.name} - Qty: {spare.quantity}
              </li>
            ))}
            <p className='py-2 text-yellow-600'>Recommanded Spares</p>
            {service.recommendedSpares.map((spare, index) => (
              <li key={index} className="mb-2">
                {spare.spare.name} - Qty: {spare.quantity}
              </li>
            ))}
          </ul>
        </td>
        <td className="px-5 py-3 text-sm">
          {service.nextServiceDate ? new Date(service.nextServiceDate).toLocaleDateString() : 'N/A'}
        </td>
        <td className="px-5 py-3 text-sm">
        <button
    
    onClick={() => {
      setDeleteModal(true);
      setId(data._id)
    }}
       className="p-2 bg-[#1F222A] hover:bg-gray-200 rounded-md border border-gray-700"
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
        <span class="text-zinc-400">Showing {tableData.totalServices >= 7 ? count == page ? tableData.totalServices -((page -1) * 7) : 7 : tableData.totalServices} of {tableData.totalServices} {tableData.totalServices ==1 ?'service' : 'services'}</span>
        <div className=" flex justify-center mt-4 mb-5">     
         <Paginations totalPage={count} handlePageChange={handlePageChange}/></div>
      </div>}
      {open &&  <AddServices existingData={data} onSubmit={handleSubmit} open={open}  setOpen={setOpen}/>}
      {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} deleteFn={deleteService}/>}

    </div>
  );
};

export default Services;
