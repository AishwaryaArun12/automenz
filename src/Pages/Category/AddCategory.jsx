import { default as React, useState } from 'react';
import { toast } from 'react-toastify';
import { EditCategory, NewCategory } from "../../api/api";
import { useLoading } from "../../store/LoadingContext";
import '../../toast.css';

const AddCategory = ({categoryData ,setOpen,setCategories}) => {
    const { setIsLoading } = useLoading();
    const [data,setData] = useState({
        name: categoryData?.name,  
        _id : categoryData?._id
    })
    
    async function handleSubmit() {
        setIsLoading(true);
        
        if (!data.name ) {
          toast('Please fill name field');
          setIsLoading(false);
          return;
        }
       
        try {
          let response;
          if (data._id) {
            response = await EditCategory(data);
            setCategories(prev => ({
              ...prev,
              categories: prev.categories.map(category => 
                category._id === data._id ? response.data : category
              )
            }));
            toast('Categories data updated successfully');
          } else {
          
            response = await NewCategory(data);
            setCategories(prev => ({...prev, categories: [...prev.categories, response.data]}));
            toast('New category added successfully');
          }
          setOpen(false);
        } catch (error) {
          console.error(error);
          toast('Error processing category data: ' + error.message);
        } finally {
          setIsLoading(false);
        }
      }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40'>
    <div className="bg-zinc-800  w-full max-w-3xl p-12 top-3  overflow-auto rounded-lg shadow-md relative">
        <div className='flex justify-between items-center'>

          <h2 className="text-2xl font-semibold mb-4">{data._id ? 'Edit Category' : 'Add New Category'}</h2>
          <div className='rounded-full border border-red-600 px-2 cursor-pointer'>

          <button onClick={()=>setOpen(false)} className="text-red-500 text-xl">&times;</button>
          </div>
        </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400">Name</label>
              <input 
              type="text" 
              value={data.name} 
              onChange={(e) => setData({...data, name: e.target.value})}
              className="mt-1 block w-full border border-zinc-900 bg-zinc-700 rounded-md shadow-sm p-2" 
              />
            </div>
           
          </div>


          <div className="flex justify-center mt-5">
            <button onClick={handleSubmit} className="px-6 py-2 bg-yellow-400 text-white rounded-md">Submit</button>
          </div>
        </div>      
</div>
  )
}

export default AddCategory
