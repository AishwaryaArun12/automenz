import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { EditClient, NewClient } from '../../api/api';
import { storage } from '../../store/Firebase';
import { useLoading } from "../../store/LoadingContext";
import '../../toast.css';

const AddCustomer = ({setOpen,setClients,clientData}) => {
    const [image,setImage] = useState(clientData?.image)
    const { setIsLoading } = useLoading();
    const [data,setData] = useState({
        name: clientData?.name,
        email : clientData?.email,
        location: clientData?.location,
        contactNumber: clientData?.contactNumber,
        city: clientData?.city,
        company: clientData?.company,
        _id : clientData?._id
    })
    function handleImageSelect(e){
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = async (e) => {
        setImage(e.target.files[0])
      };
      fileInput.click();
     
    }
    async function handleSubmit(){
      
      setIsLoading(true)
      if (!data.name || !data.email || !data.location || !data.contactNumber || !data.city) {
        toast('Please fill in all required fields');
        setIsLoading(false);
        return;
      }
    
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        toast('Please enter a valid email address');
        setIsLoading(false);
        return;
      }
    
      // Phone number format validation (assuming a simple 10-digit format)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(data.contactNumber)) {
        toast('Please enter a valid 10-digit phone number');
        setIsLoading(false);
        return;
      }
      let file =image;
      if(image){
        if(typeof image != 'string'){
          try {
            const pathImagesRef = ref(storage, `images/${image.name}`);          
           await uploadBytes(pathImagesRef, image).then(async(snapshot) => {
              console.log('Uploaded a blob or file!',snapshot);
            await  getDownloadURL(ref(storage, pathImagesRef))
          .then(async(url) => {
            console.log(url,'wewhjhbdsbvhsbh')
             file = url;
          })
            }).catch(err=>{
              console.log(err)
              toast('Error while download image..!')
              setIsLoading(false)
              return;
            });
        } catch (error) {
          console.log(error)
          toast(error.message)
          setIsLoading(false)
          return;
        }
        }
    }
    try {
      if(data){
        console.log(data._id,'www')
        const res = await EditClient({...data, image: file})
        console.log(res.data.client, 'ddddddddd')
        setClients((prev) => ({
          ...prev,
          clients: prev.clients.map(client => 
            client._id === data._id ? res.data : client
          )
        }));
        setOpen(false);
        toast('Client data updated successfully');
      }else{
        const res = await NewClient({...data, image: file});
        setClients((prev) => ({...prev, clients: [...prev.clients,res.data.client]}));
        setOpen(false);
        toast('Client data added successfully');
      }
    } catch (error) {
      console.log(error,'dddd')
      toast('Error adding customer: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }
   
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40'>
    <div className="bg-zinc-800  w-full max-w-3xl p-12 top-3 h-[80vh] overflow-auto rounded-lg shadow-md relative">
        <div className='flex justify-between items-center'>

          <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
          <div className='rounded-full border border-orange-500 px-2 cursor-pointer'>

          <button onClick={()=>setOpen(false)} className="text-red-500 text-xl">&times;</button>
          </div>
        </div>
          <div className='flex justify-center '>

          <div className="flex w-fit justify-center mb-6 relative">
          <img className="w-48 h-48 object-cover rounded-full" src={image ? typeof image == 'string' ? image : window.URL.createObjectURL(image) :'https://placehold.co/150'} alt="Profile picture" />

            <div onClick={handleImageSelect} className='p-1 rounded-sm bg-white bg-opacity-50 absolute bottom-4 right-4'>

            <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8572 1.90446L20.096 0.141533C19.9073 -0.0471777 19.6007 -0.0471777 19.412 0.141533L17.8153 1.73653L15.7556 3.79621V1.37695C15.7556 1.10929 15.5395 0.893198 15.2719 0.893198H0.483754C0.217799 0.893198 0 1.10929 0 1.3772V13.7573C0 14.025 0.217799 14.241 0.483754 14.241H15.2719C15.5395 14.241 15.7556 14.025 15.7556 13.7573V8.69144L20.2619 4.18366L21.8572 2.58866C22.0476 2.3997 22.0476 2.09317 21.8572 1.90446ZM0.967753 1.86095H14.7881V4.76421L12.8753 6.67869L11.3771 5.18196C11.1884 4.99325 10.8819 4.99325 10.6932 5.18196L5.86909 10.0058L4.31761 8.45262C4.12719 8.26391 3.82237 8.26391 3.63219 8.45262L0.967753 11.1171V1.86095ZM14.7881 13.2735H0.967753V12.485L3.97417 9.48026L5.52736 11.0317C5.71607 11.2205 6.02261 11.2205 6.21132 11.0317L11.0354 6.20765L12.1902 7.36411L11.6546 7.89969C11.6111 7.9432 11.5756 7.99478 11.5514 8.05124L10.2322 11.1317C10.1547 11.3141 10.195 11.5253 10.3353 11.6656C10.4289 11.7575 10.5514 11.8076 10.6773 11.8076C10.7418 11.8076 10.8064 11.7947 10.8677 11.7673L13.9499 10.448C14.0064 10.4238 14.058 10.3898 14.1015 10.3463L14.7886 9.65919V13.2735H14.7881ZM12.2285 8.92855L13.0704 9.77213L11.5979 10.4028L12.2285 8.92855ZM14.9301 8.1478C14.9189 8.15904 14.9091 8.17029 14.8979 8.18178L13.6446 9.43333L12.5671 8.35435L13.2058 7.71562C13.209 7.71244 13.2139 7.70927 13.2171 7.70585C13.222 7.70096 13.2269 7.69607 13.2315 7.68971L18.1942 2.72873L19.2717 3.80599L14.9301 8.1478ZM19.7283 3.34961L18.6508 2.27235L19.754 1.16917L20.8313 2.24644L19.7283 3.34961Z" fill="black"/>
            </svg>
            </div>

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
            <div>
              <label className="block text-sm font-medium text-zinc-400">Contact Number</label>
              <input type="text" className="mt-1 block w-full border border-zinc-900 bg-zinc-700 rounded-md shadow-sm p-2" value={data.contactNumber} onChange={(e) => setData({...data, contactNumber: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400">Email</label>
              <input 
              type="email" 
              value={data.email} 
              onChange={(e) => setData({...data, email: e.target.value})}
              className="mt-1 block w-full border border-zinc-900 bg-zinc-700 rounded-md shadow-sm p-2" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400">Location</label>
              <input type="text" className="mt-1 block w-full border border-zinc-900 bg-zinc-700 rounded-md shadow-sm p-2" value={data.location} onChange={(e) => setData({...data, location: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400">City</label>
              <input 
type="text" 
value={data.city} 
onChange={(e) => setData({...data, city: e.target.value})}
className="mt-1 block w-full border border-zinc-900 bg-zinc-700 rounded-md shadow-sm p-2" 
/>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400">Company</label>
              <input type="text" className="mt-1 block w-full border border-zinc-900 bg-zinc-700 rounded-md shadow-sm p-2" value={data.company} onChange={(e) => setData({...data, company: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSubmit} className="px-6 py-2 bg-yellow-400 text-white rounded-md">Submit</button>
          </div>
        </div>      
</div>
  )
}

export default AddCustomer
