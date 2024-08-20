import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getSpareData, getVehicleData } from '../../api/api';
import { useLoading } from '../../store/LoadingContext';
import { Dropdown } from './Dropdown';

const CreateServiceModal = ({ open, setOpen, onSubmit }) => {
  const [spares, setSpares] = useState([]);
  const [sparesPage, setSparesPage] = useState(1);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [hasMoreSpares, setHasMoreSpares] = useState(true);
  const [search,setSearch] = useState('')
  const [page,setPage] = useState(1)
  const [formData, setFormData] = useState({
    vehicleId: '',
    serviceType: '',
    serviceDate: '',
    replacedSpares: [],
    renewalSpares: [],
    mandatorySpares: [],
    recommendedSpares: []
  });
  const [vehicles, setVehicles] = useState([]);
const [vehiclePage, setVehiclePage] = useState(1);
const [hasMoreVehicles, setHasMoreVehicles] = useState(true);
const {setIsLoading} = useLoading();

  useEffect(() => {
    if (open && !initialDataLoaded) {
      setIsLoading(true);
      fetchVehicles();
      setIsLoading(false)
    }
  }, [open,vehiclePage]);
  useEffect(() => {
    if (open && !initialDataLoaded) {
      setIsLoading(true);
      fetchSpares();
     setIsLoading(false)
    }
  }, [open, page]);
  function onClose(){
    setSpares();
    setVehicles();
    setOpen(false)
  }
  useEffect(() => {
    setPage(1); // Reset to first page when search term changes
    fetchSpares();
  }, [search]);


  const fetchSpares = async () => {

    if (initialDataLoaded && page === 1 && !search.length) return;
    try {

      const response = await getSpareData(search, page);
      const newSpares = response.data.spareParts;
      setSpares(page === 1 ? newSpares : prevSpares => [...prevSpares, ...newSpares]);
     
      setHasMoreSpares(newSpares.length === 7);
      if (page === 1) setInitialDataLoaded(true);
    } catch (error) {
      console.error('Error fetching spares:', error);
    }
  };

  const fetchVehicles = async () => {
    if (initialDataLoaded && page === 1) return;
    try {
      const response = await getVehicleData('', vehiclePage);
      const newVehicles = response.data.vehicles;
      setVehicles(page === 1 ? newVehicles : prevVehicles => [...prevVehicles, ...newVehicles]);
      
      setHasMoreVehicles(newVehicles.length === 10);
      if (page === 1) setInitialDataLoaded(true);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpareChange = (type, index, field, value) => {
    const updatedSpares = [...formData[type]];
    
    if (field === 'spare') {
      const existingIndex = updatedSpares.findIndex(item => item.spare === value);
      if (existingIndex !== -1 && existingIndex !== index) {
        toast.warn("This spare part is already in the list. Updating the existing entry.");
        updatedSpares[existingIndex].quantity += updatedSpares[index].quantity;
        updatedSpares.splice(index, 1);
      } else {
        updatedSpares[index] = { ...updatedSpares[index], [field]: value };
      }
    } else {
      updatedSpares[index] = { ...updatedSpares[index], [field]: value };
    }
    
    setFormData({ ...formData, [type]: updatedSpares });
  };
  

  const addSpare = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], { spare: '', quantity: 1 }]
    });
  };
  const recSpare = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], { spare: '', validity: 1 }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validation checks
    if (!formData.vehicleId) {
      toast.error("Please select a vehicle");
      setIsLoading(false)
      return;
    }
    
    if (!formData.serviceType.trim()) {
      toast.error("Service type is required");
      setIsLoading(false)
      return;
    }
    
    if (!formData.serviceDate) {
      toast.error("Please select a service date");
      setIsLoading(false)
      return;
    }
    
    const allSpares = [
      ...formData.replacedSpares,
      ...formData.renewalSpares,
      
    ];
    const spares = [
      ...formData.mandatorySpares,
      ...formData.recommendedSpares
    ]
    
    if (allSpares.some(spare => !spare.spare || spare.quantity <= 0)) {
      toast.error("Replaced and Recommanded spares must have a selection and a valid quantity");
      setIsLoading(false)
      return;
    }
    if (spares.some(spare => !spare.spare || spare.validity <= 0)) {
      toast.error("Recommanded and Mandatory spares must have a selection and a valid validity");
      setIsLoading(false)
      return;
    }
    
    // If all validations pass, submit the form
    try {
      onSubmit(formData);
      toast.success("Service created successfully");
      setOpen(false);
      setIsLoading(false)
      // Reset form data here if needed
    } catch (error) {
      toast.error("Error creating service: " + error.message);
      setIsLoading(false)
      
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full">
      <div className="relative top-3 mx-auto p-5 w-full lg:w-1/2 shadow-lg rounded-md overflow-y-auto bg-gray-800">
      <div className='flex justify-between items-center'>
     <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4 text-white">Create New Service</h2>
      <div className='rounded-full border border-red-600 px-2 cursor-pointer'>

      <button onClick={onClose} className="text-red-500 text-xl">&times;</button>
      </div>
      </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
        <label className="block text-gray-400 text-sm font-bold mb-2">
          Vehicle ID
        </label>
        <div className='grid grid-cols-2 '>
          <select
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            className="shadow appearance-none border border-black focus:border-yellow-500 rounded w-full py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>{vehicle.client.name + ' : ' + vehicle.registrationNumber}</option>
            ))}
          </select>
          {hasMoreVehicles && (
          <button
            type="button"
            onClick={() => setVehiclePage(prev=> prev+1)}
            className="bg-gray-600 hover:bg-gray-700 text-yellow-400 font-bold py-2 mx-auto px-2 rounded text-sm mt-2"
          >
            Load More Vehicles
          </button>
        )}
        </div>
      </div>
      <div className=' grid md:grid-cols-2 grid-cols-1 gap-6'>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Service Type
            </label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="shadow appearance-none border border-black focus:border-yellow-500 rounded w-full py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Service Date
            </label>
            <input
              type="date"
              name="serviceDate"
              value={formData.serviceDate}
              onChange={handleChange}
              className="shadow appearance-none border border-black focus:border-yellow-500 rounded w-full py-1.5 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
      </div>
      <div class="relative my-5">
                      <input
                        type="text"
                        placeholder="Search Spares Here..."
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
                    {['replacedSpares', 'renewalSpares', 'mandatorySpares', 'recommendedSpares'].map((spareType) => (
            <div key={spareType} className="mb-6 overflow-visible">
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-2'>
                <label className="block text-gray-400 text-sm font-bold">
                  {spareType.charAt(0).toUpperCase() + spareType.slice(1)}
                </label>
                <button
                  type="button"
                  onClick={() => spareType.includes('Spares') ? addSpare(spareType) : recSpare(spareType)}
                  className="text-yellow-600 hover:text-black hover:bg-yellow-600 bg-gray-900 font-bold py-1 px-2 rounded text-sm"
                >
                  + Add
                </button>
              </div>
             
  {formData[spareType].map((spare, index) => (
    <div key={index} className="flex flex-col md:flex-row mb-4 space-y-2 md:space-y-0 md:space-x-4">
      <Dropdown
        label="Select Spare"
        options={spares.map(s => ({ value: s._id, label: s.name }))}
        value={spare.spare}
        onChange={(value) => handleSpareChange(spareType, index, 'spare', value)}
      />
      <div className="w-full md:w-1/3 flex flex-col">
        <label className="block text-gray-400 text-sm font-bold mb-2">
          {spareType === 'replacedSpares' || spareType === 'renewalSpares' ? 'Quantity' : 'Validity'}
        </label>
        <input
          type="number"
          value={spare.quantity || spare.validity}
          onChange={(e) => handleSpareChange(spareType, index, spareType === 'replacedSpares' || spareType === 'renewalSpares' ? 'quantity' : 'validity', e.target.value)}
          className="shadow appearance-none border border-black focus:border-yellow-500 rounded py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  ))}
            </div>
          ))}
          
          {hasMoreSpares && (
            <button
              type="button"
              onClick={() => setPage((prev)=> prev+1)}
              className="bg-gray-600 hover:bg-gray-700 text-yellow-400 font-bold py-1 px-2 rounded text-sm mt-2"
            >
              Load More Spares
            </button>
          )}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Service
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
