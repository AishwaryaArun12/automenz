import AdminLayout from './Components/Layout/AdminLayout'
import { Dashboard } from './Pages/Dashboard'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from './Pages/NotFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          {/* <Route element={<AdminPrivateRoute />}> */}
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route element={<AdminLayout />} path={""}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/clinics" element={<Clinicks />} />
              <Route
                path="/clinicOverview/:id"
                element={<ClinicksOverview />}
              /> */}
            </Route>
          {/* </Route> */}
         
          {/* <Route path="" element={<CheckLoggedIn />}>
            <Route element={<Loading />} path={"/loading"} />
            <Route element={<Blocked />} path={"/blocked"} />
            <Route element={<Declined />} path={"/declined"} />
          </Route> */}
          {/* <Route element={<ClinicInfoFillPage />} path={"/clinic-fillup"} />
          <Route element={<OtpVerification />} path={"/otp"} />
          <Route element={<Login />} path={"/login"} />
          <Route element={<Signup />} path={"/signup"} /> */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}


export default App
