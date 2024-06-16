import React from 'react'
import { Outlet } from "react-router-dom";
import LoadingSpinner from '../Spinner/LoadingSpinner';
import Nav from './Nav';

const AdminLayout = () => {
  return (
    <div>
      <Nav/>
      <main>
        <Outlet/>
      </main>
      <LoadingSpinner/>
    </div>
  )
}

export default AdminLayout
