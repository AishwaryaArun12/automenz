import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVehicleDetails } from '../../api/api'; // Assume this function exists
import { useLoading } from '../../store/LoadingContext';

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setIsLoading(true);
        const res = await getVehicleDetails(id);
        setVehicle(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
        setIsLoading(false);
      }
    };
    fetchVehicleDetails();
  }, [id]);

  if (!vehicle) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen text-white p-4">
      <div className="bg-[#0A0A0B] rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <img src={vehicle.image || '/car1.jpeg'} alt={vehicle.model} className="w-full h-auto rounded-lg" />
          </div>
          <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold mb-6">{vehicle.maker} {vehicle.model}</h1>
  
            <p className="text-yellow-500 mb-4">{vehicle.type}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Color</p>
                <p>{vehicle.color}</p>
              </div>
              <div>
                <p className="text-gray-400">Date of Manufacture</p>
                <p>{new Date(vehicle.dateOfManufacture).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Registration Number</p>
                <p>{vehicle.registrationNumber}</p>
              </div>
              <div>
              <p className="text-gray-400">Next Service</p>
                <p>{''}</p>

              </div>
              <div>
                <p className="text-gray-400">Driver</p>
                <p>{vehicle.driverName}</p>
              </div>
              <div>
                <p className="text-gray-400">Driver Phone</p>
                <p>{vehicle.driverPhone}</p>
              </div>
              <div>
                <p className="text-gray-400">Client Name</p>
                <p>{vehicle.client.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Client Phone</p>
                <p>{vehicle.client.contactNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0A0A0B] rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Service History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-white">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Replaced Spares</th>
                <th className="px-4 py-2 text-left">Renewal Spares</th>
                <th className="px-4 py-2 text-left">Recommended Spares</th>
                <th className="px-4 py-2 text-left">Mandatory Spares</th>

              </tr>
            </thead>
            <tbody>
              {vehicle.services.map((service, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-[#1F222A]' : ''}>
                  <td className="px-4 py-2">{new Date(service.serviceDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{service.serviceType}</td>
                  <td className="px-4 py-2 text-wrap">{service.replacedSpares.map(spare=>spare.spare.name).join(', ')}</td>
                  <td className="px-4 py-2 text-wrap">{service.renewalSpares.map(spare=>spare.spare.name).join(', ')}</td>
                  <td className="px-4 py-2 text-wrap">{service.recommendedSpares.map(spare=>spare.spare.name).join(', ')}</td>
                  <td className="px-4 py-2 text-wrap">{service.mandatorySpares.map(spare=>spare.spare.name).join(', ')}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="bg-[#0A0A0B] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Recommended Services</h2>
        <ul className="list-disc pl-5">
          {vehicle.services[0].recommendedSpares.map((spare, index) => (
            <li key={index}>{spare}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default VehicleDetails;
