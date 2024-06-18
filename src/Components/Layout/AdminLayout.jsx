import React from 'react'
import { Outlet } from "react-router-dom";
import LoadingSpinner from '../Spinner/LoadingSpinner';
import Nav from './Nav';
import FoodSideBar from './FoodSideBar';
import Bgvideo from './BgVideo';

const AdminLayout = () => {
  return (
    <div>
        <Nav />
      <FoodSideBar/>
       <LoadingSpinner/>
       <div
      className="sm:ml-64 relative top-0 "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="p-4 relative">
        <Bgvideo/>
        <Outlet />
       
     </div>
     </div>
     
      
    </div>
  )
}

export default AdminLayout
