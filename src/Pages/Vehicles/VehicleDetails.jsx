import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const VehicleDetails = () => {
  const { id } = useParams();
  
  const location = useLocation();
  const { vehicle } = location.state;

  useEffect(() => {
    // Fetch vehicle details using the id
    // setVehicle(fetchedData);
  }, [id]);

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="min-h-screen text-white p-4">
      <h1 className="text-2xl mb-6">{vehicle.make} {vehicle.model} Details</h1>
      <div className="bg-[#1F1F1F] rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl mb-2">Vehicle Information</h2>
            <p>Make: {vehicle.make}</p>
            <p>Model: {vehicle.model}</p>
            <p>Year: {vehicle.year}</p>
            <p>License Plate: {vehicle.licensePlate}</p>
          </div>
          <div>
            <h2 className="text-xl mb-2">Owner Information</h2>
            <p>Name: {vehicle.ownerName}</p>
            <p>Contact: {vehicle.ownerContact}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl mb-2">Service History</h2>
          {/* Add a table or list of service history here */}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;