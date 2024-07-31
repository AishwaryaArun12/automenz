import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceDetails } from '../../api/api';
import { useLoading } from '../../store/LoadingContext';

const ServiceDetails = () => {
  const { id } = useParams();
  const { setIsLoading } = useLoading();
  const [service, setService] = useState({});

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getServiceDetails(id);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
      setIsLoading(false);
    };

    fetchServiceDetails();
  }, [id]);

  if (!service) return null;

  return (
    <div className="min-h-screen  p-8 text-gray-300">
      <div className="max-w-4xl printable-section mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gray-700 border-b border-gray-600">
          <div className="flex items-center">
            <img src="/logo.jpeg" alt="Company Logo" className="h-16 rounded-full border-2 border-yellow-400" />
            <div className="mx-3">
              <h1 className="text-3xl font-semibold text-yellow-400">AUTOMENZ INTERNATIONAL Pvt Ltd</h1>
              <h2 className="text-sm">Eroor post, Tripunnithura, Ernakulam, 682306</h2>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Client and Vehicle Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300"><span className="font-semibold">Name:</span> {service?.vehicle?.client?.name}</p>
              <p className="text-gray-300"><span className="font-semibold">Contact:</span> {service?.vehicle?.client?.contactNumber}</p>
              <p className="text-gray-300"><span className="font-semibold">Address:</span> {service?.vehicle?.client?.location}, {service?.vehicle?.client?.city}</p>
              <p className="text-gray-300"><span className="font-semibold">Company:</span> {service?.vehicle?.client?.company}</p>

            </div>
            <div>
              <p className="text-gray-300"><span className="font-semibold">Registration:</span> {service.vehicle?.registrationNumber}</p>
              <p className="text-gray-300"><span className="font-semibold">Maker:</span> {service.vehicle?.maker}, {service.vehicle?.type}</p>
              <p className="text-gray-300"><span className="font-semibold">Colour:</span> {service.vehicle?.color}</p>

              <p className="text-gray-300"><span className="font-semibold">Model:</span> {service.vehicle?.model}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Service Information</h2>
          <p className="text-gray-300"><span className="font-semibold">Service Type:</span> {service.serviceType}</p>
          <p className="text-gray-300"><span className="font-semibold">Service Date:</span> {new Date(service.serviceDate).toLocaleDateString()}</p>
        </div>

        <div className="p-6 border-t border-gray-700">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Spares Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {['replacedSpares', 'renewalSpares'].map((spareType) => (
              <div key={spareType}>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">{spareType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                <ul className="list-disc list-inside">
                  {service[spareType]?.map((spare, index) => (
                    <li key={index} className="text-gray-300">{spare.spare.name} - Qty: {spare.quantity}</li>
                  ))}
                </ul>
              </div>
            ))}
            {[ 'mandatorySpares', 'recommendedSpares'].map((spareType) => (
              <div key={spareType}>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">{spareType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                <ul className="list-disc list-inside">
                  {service[spareType]?.map((spare, index) => (
                    <li key={index} className="text-gray-300">{spare.spare.name} - Validity: {spare.validity} {spare.validity == 1 ? 'month' : 'months'}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-end">
          <button 
            onClick={() => window.print()} 
            className="no-print bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition duration-300"
          >
            Print Service Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
