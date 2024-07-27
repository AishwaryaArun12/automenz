import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getClientDetails } from '../../api/api';
import { useLoading } from '../../store/LoadingContext';

const CustomerDetail = () => {
    const { setIsLoading } = useLoading();
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchCustomerData();
    }, [id]);

    const fetchCustomerData = async () => {
        try {
            setIsLoading(true);
            const res = await getClientDetails(id);
            setCustomer(res.data);
            setVehicles(res.data.vehicles);
        } catch (error) {
            console.log(error);
            toast(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white p-8 bg-gradient-to-b from-[#151515] to-[#0A0A0B]">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate('/customers')}
                        className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors bg-[#1A1A1B] px-4 py-2 rounded-full shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Clients
                    </button>
                </div>
                
                {customer && (
    <div className="bg-[#0A0A0B] p-8 rounded-2xl shadow-xl mb-12 border border-gray-400/20">
        <div className="flex items-center mb-6">
            <img 
                src={customer.image || '/user.png'} 
                alt={customer.name}
                className="w-24 h-24 rounded-full mr-6 object-cover"
            />
            <h2 className="text-3xl font-semibold text-gray-300">{customer.name}</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 text-lg">
            <p className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                <span className="font-medium text-zinc-300">Company : </span> {" " + customer.company}
            </p>
            <p className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="font-medium text-zinc-300">Email : </span> {customer.email}
            </p>
            <p className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="font-medium text-zinc-300">Location : </span> {customer.location}
            </p>
            <p className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className="font-medium text-zinc-300">Phone : </span> {customer.contactNumber}
            </p>
        </div>
    </div>
)}


                <h2 className="text-3xl font-bold mb-8 text-yellow-400">Vehicles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                    {vehicles.length ? vehicles.map(vehicle => (
                        <div onClick={()=>{navigate(`/vehicles/${vehicle._id}`)}} key={vehicle.id} className="bg-[#0A0A0B] p-6 rounded-xl cursor-pointer shadow-xl flex flex-col transition-transform hover:scale-105">
                            <img 
                                src={vehicle.image || '/car1.jpeg'} 
                                alt={`${vehicle.maker} ${vehicle.model}`}
                                className="w-full h-56 object-cover rounded-lg mb-6"
                            />
                            <h3 className="text-2xl font-semibold mb-4 text-yellow-400">{vehicle.maker} {vehicle.model}</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <p><span className="font-medium text-yellow-400">Type:</span> {vehicle.type}</p>
                                <p><span className="font-medium text-yellow-400">Color:</span> {vehicle.color}</p>
                                <p><span className="font-medium text-yellow-400">Manufacture:</span> {new Date(vehicle.dateOfManufacture).toLocaleDateString()}</p>
                                <p><span className="font-medium text-yellow-400">Driver:</span> {vehicle.driverName}</p>
                                <p><span className="font-medium text-yellow-400">Driver Phone:</span> {vehicle.driverPhone}</p>
                                <p><span className="font-medium text-yellow-400">Reg Number:</span> {vehicle.registrationNumber}</p>
                            </div>
                        </div>
                    )) : <div> No Vehicles Registered Yet..</div>}
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
