import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from './Components/Layout/AdminLayout';
import CustomerDetail from "./Pages/Customers/CustomerDetails";
import Customers from './Pages/Customers/Customers';
import { Dashboard } from './Pages/Dashboard';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import { Orders } from './Pages/Orders';
import AddServices from './Pages/Service/AddServices';
import Services from './Pages/Service/Services';
import SpareParts from "./Pages/SpareParts/SpareParts";
import VehicleDetails from "./Pages/Vehicles/VehicleDetails";
import Vehicles from "./Pages/Vehicles/Vehicles";

function App() {

  return (
    <>
      
        <ToastContainer position="top-center" />
        <Routes>
          {/* <Route element={<AdminPrivateRoute />}> */}
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route element={<AdminLayout />} path={""}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/service" element={<Services />} />
              <Route path="/service/add" element={<AddServices />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/vehicles/:id" element={<VehicleDetails />} />
              <Route path="/spares" element={<SpareParts />} />
              <Route path="/customers/:id" element={<CustomerDetail />} />

            </Route>
          {/* </Route> */}
         
          {/* <Route path="" element={<CheckLoggedIn />}>
            <Route element={<Loading />} path={"/loading"} />
            <Route element={<Blocked />} path={"/blocked"} />
            <Route element={<Declined />} path={"/declined"} />
          </Route> */}
          {/* <Route element={<ClinicInfoFillPage />} path={"/clinic-fillup"} />
          <Route element={<OtpVerification />} path={"/otp"} /> */}
          <Route element={<Login />} path={"/login"} />
          {/* <Route element={<Signup />} path={"/signup"} /> */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    
      
    </>
  )
}


export default App
