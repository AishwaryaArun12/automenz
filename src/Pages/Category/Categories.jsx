import { default as React, useEffect, useState } from 'react';
import { toast} from 'react-toastify';
import { DeleteCategory, getCategoryData } from '../../api/api';
import DeleteModal from '../../Components/DeleteModal';
import { Paginations } from '../../Components/Pagination/Paginations';
import { useLoading } from '../../store/LoadingContext';
import '../../toast.css';
import AddCategory from './AddCategory';

const Categories = () => {
    const {setIsLoading} = useLoading()
    const [open, setOpen] = useState(false)
    const [tableData, setTableData] = useState({})
    const [search,setSearch] = useState('');
     const [page,setPage] = useState(1)
    const [count,setCount] = useState(0);
    const [data, setData] = useState();
    const [deleteModal, setDeleteModal] = useState(false)
    const [id,setId] = useState();

    async function deleteSpare(){
        try {
            setIsLoading(true);
            await DeleteCategory(id);
            setIsLoading(false);
            setDeleteModal(false);
            setTableData(prev => ({
                ...prev,
                categories: prev.categories.filter(category => 
                  category._id != id
                )
              }));
            toast('Selected Category Deleted successfully.')
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
          const res = await getCategoryData(search,page);        
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
    <div className="flex flex-col space-y-4 mb-6 md:flex-row md:items-center md:justify-between md:space-y-0">
  <div className="flex justify-between items-center md:w-auto">
    <h1 className="text-2xl">Category</h1>
    <button 
      onClick={() => {setData(); setOpen(true)}} 
      className="text-black p-2 inline-flex font-semibold items-center h-9 rounded-lg bg-yellow-400 md:hidden"
    >
      Add Category
    </button>
  </div>
  
  <div className="relative w-full md:w-auto md:ml-40 md:flex-grow md:mx-4">
    <input
      type="text"
      placeholder="Search..."
      className="w-full bg-[#0A0A0B] text-white p-2 pl-10 rounded-md focus:outline-none"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <svg
      className="w-5 h-5 text-zinc-500 absolute left-3 top-1/2 transform -translate-y-1/2"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14A6 6 0 108 2a6 6 0 000 12z"
        clipRule="evenodd"
      ></path>
    </svg>
  </div>

  <div className="hidden md:block">
    <button 
      onClick={() => {setData(); setOpen(true)}} 
      className="text-black p-2 inline-flex font-semibold items-center h-9 rounded-lg bg-yellow-400"
    >
      Add Category
    </button>
  </div>
</div>





<div class="bg-[#0A0A0B] p-4 rounded-lg shadow-md overflow-x-auto">
  <table class="min-w-full text-left">
    <thead className="border-b border-b-zinc-700">
      <tr>
         <th class="px-4 py-2"></th>
        <th class="px-4 py-2">Name</th>
       
        <th className='px-4 py-2'>Actions</th>
       
      </tr>
    </thead>
    <tbody>
    {tableData?.categories?.length ? tableData?.categories.map((data,i)=> <tr >
        <td class="px-4 py-2">
          <span class="text-yellow-500">{i+1}</span>
        </td>
        <td class="px-4 py-2 items-center">
          
          {data?.name}
        </td>
       
       

        <td className=' flex items-center'>
        <button className="p-2 bg-[#1F222A] rounded-l-md border border-gray-400" onClick={()=>{setData(data); setOpen(true)}}>
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
       setId(data._id)
     }}
        className="p-2 bg-[#1F222A] rounded-r-md border border-gray-400 border-l-0"
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
  <span class="text-zinc-400">Showing {tableData.totalCategories >= 10 ? count == page ? tableData.totalCategories -((page -1) * 10) : 10 : tableData.totalCategories} of {tableData.totalCategories} {tableData.totalCategories ==1 ?'category' : 'categories'}</span>
  <div className=" flex justify-center mt-4 mb-5">     
   <Paginations totalPage={count} handlePageChange={handlePageChange}/></div>
</div>}
{open &&  <AddCategory categoryData={data} setCategories={setTableData} setOpen={setOpen}/>}
{deleteModal && <DeleteModal setDeleteModal={setDeleteModal} deleteFn={deleteSpare}/>}
</div>
  )
}

export default Categories
