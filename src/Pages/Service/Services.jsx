import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DeleteService, EditService, getServiceData, NewService } from '../../api/api'
import DeleteModal from '../../Components/DeleteModal'
import { Paginations } from '../../Components/Pagination/Paginations'
import { useLoading } from '../../store/LoadingContext'
import '../../toast.css'
import AddServices from './AddServices'


const Services = () => {
  const navigate = useNavigate();
  const {setIsLoading} = useLoading()
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState({})
  const [search,setSearch] = useState('');
   const [page,setPage] = useState(1)
  const [count,setCount] = useState(0);
  const [data, setData] = useState();
  const [id,setId] = useState('');
  const [deleteModal,setDeleteModal] = useState(false)
  const [initialData,setInitialData] = useState(null);
  const [editMode,setEditMode] = useState(false)
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

  const handleSubmit = async (formData,editMode) => {
    if(editMode){
      const res = await EditService(formData);
      toast('Service Updated successfully.')
      setEditMode(false);
      setInitialData(null);
    getService()
    }else{
      const res = await NewService(formData);
      getService()
      toast('Service Added successfully.')
    }
    setOpen(false);

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
              <button onClick={() => {setEditMode(false); setInitialData(null); setOpen(true)}} className="text-black  p-2 inline-flex font-semibold items-center h-9 rounded-lg bg-yellow-400">
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
      <th className="whitespace-nowrap px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Vehicle
      </th>
      <th className="whitespace-nowrap px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Client Name
      </th>
      <th className="whitespace-nowrap px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Phone
      </th>
      <th className="whitespace-nowrap px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Service Type
      </th>
      <th className="whitespace-nowrap px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Service Date
      </th>
      <th className="whitespace-nowrap px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Spares
      </th>
      
      <th className="whitespace-nowrap px-5 py-6 text-sm font-semibold capitalize tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
          <tbody>
          {tableData?.services?.length ? tableData?.services.map((service,i)=> <tr key={i} className="" style={{ height: "50px" }}>
        <td className="whitespace-nowrap px-5 py-3 text-sm">
          {service?.vehicle?.registrationNumber}
        </td>
        <td className="whitespace-nowrap px-5 py-3 text-sm">
          {service.vehicle?.client?.name}
        </td>
        <td className="whitespace-nowrap px-5 py-3 text-sm">
          {service.vehicle.client.contactNumber}
        </td>
        <td className="whitespace-nowrap px-5 py-3 text-sm">{service.serviceType}</td>
        <td className="px-5 py-3 text-sm">
          {new Date(service.serviceDate).toLocaleDateString()}
        </td>
        <td className="whitespace-nowrap px-5 py-3 text-sm">
          <ul >
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
                {spare.spare.name} - Validity: {spare.validity} {spare.validity == 1 ? 'Month' : 'Months'}
              </li>
            ))}
            <p className='py-2 text-yellow-600'>Recommanded Spares</p>
            {service.recommendedSpares.map((spare, index) => (
              <li key={index} className="mb-2">
                {spare.spare.name} - Validity: {spare.validity} {spare.validity == 1 ? 'Month' : 'Months'}
              </li>
            ))}
          </ul>
        </td>
       
        <td className="whitespace-nowrap px-5 py-3 text-sm">
        <div 
            onClick={() => navigate(`/serviceDetails/${service._id}`)}
            className=" border border-gray-700 bg-[#1F222A] hover:bg-gray-500 w-10 h-8 p-1 flex items-center justify-center cursor-pointer my-4 rounded-md"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
            <button className="p-2 bg-[#1F222A] rounded-l-md border border-gray-700" onClick={()=>{setOpen(true); setEditMode(true);
    setInitialData(service);}}>
        <svg width="15" height="14" viewBox="0 0 15 14" fill="#e2e8fa" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.6">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.06535 8.15755L6.05469 8.44518L6.34177 6.43397L11.5125 1.26322C11.9885 0.787261 12.7602 0.787261 13.2361 1.26322C13.7121 1.73917 13.7121 2.51084 13.2361 2.9868L8.06535 8.15755Z" stroke="#6F757E" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.9375 1.83594L12.6611 3.55952" stroke="#6F757E" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.1562 8.21875V12.2812C11.1562 12.73 10.7925 13.0938 10.3438 13.0938H2.21875C1.77002 13.0938 1.40625 12.73 1.40625 12.2812V4.15625C1.40625 3.70752 1.77002 3.34375 2.21875 3.34375H6.28125" stroke="#6F757E" stroke-width="0.918314" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        </svg>

        </button>
        
        <button
    
    onClick={() => {
      setDeleteModal(true);
      setId(service._id)
    }}
       className="p-2 px-3 bg-[#1F222A] hover:bg-gray-500 rounded-r-md border border-gray-700"
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
      {open &&  <AddServices editMode ={editMode} initialData ={initialData} existingData={data} onSubmit={handleSubmit} open={open}  setOpen={setOpen}/>}
      {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} deleteFn={deleteService}/>}

    </div>
  );
};

export default Services;
