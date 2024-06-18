import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { toggleFoodHeight, toggleFoodNoHeight } from "./FoodToogleFun";

function FoodSideBar() {
  const navigate = useNavigate();
 const openSidebar = true
  const { toggleSidebar } = true;


  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-30 w-64 h-screen pt-2 transition-transform  
      ${toggleSidebar ? "translate-x-0" : "-translate-x-full"} 
        border-r sm:translate-x-0 bg-black  border-gray-700`}
      aria-label="Sidebar"
    >
      <div
        class="h-full relative  pb-4 overflow-y-auto  bg-black"
        style={{ scrollbarWidth: "none" }}
      >
        {/* <button
        //   onClick={() => dispatch(openSidebar())}
          className="absolute sm:hidden block right-6 text-white text-2xl mt-3"
        >
          X{" "}
        </button> */}
        <div className=" flex items-center mb-10 mt-10 ">
          <div>
            <img src="/logo.jpeg" className="w-14 h-14 mx-3" alt="" />
          </div>
          <div>
            <h1 className="text-yellow-300 text-2xl">
              Automenz
            </h1>
          </div>
        </div>
        <ul class="space-y-9 font-medium">
          <li>
            <a
              onClick={() => {
                navigate("/dashboard");
               
                // dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/dashboard"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/dashboard"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={`${
                  window.location.pathname === "/food/vendor/dashboard"
                    ? "#FFDD11"
                    : "white"
                }`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_183_3365)">
                  <path d="M8.25 3H6C4.34315 3 3 4.34315 3 6V8.25C3 9.90685 4.34315 11.25 6 11.25H8.25C9.90685 11.25 11.25 9.90685 11.25 8.25V6C11.25 4.34315 9.90685 3 8.25 3Z" />
                  <path d="M18 3H15.75C14.0931 3 12.75 4.34315 12.75 6V8.25C12.75 9.90686 14.0931 11.25 15.75 11.25H18C19.6568 11.25 21 9.90686 21 8.25V6C21 4.34315 19.6568 3 18 3Z" />
                  <path d="M8.25 12.75H6C4.34315 12.75 3 14.0931 3 15.75V18C3 19.6569 4.34315 21 6 21H8.25C9.90685 21 11.25 19.6569 11.25 18V15.75C11.25 14.0931 9.90685 12.75 8.25 12.75Z" />
                  <path d="M18 12.75H15.75C14.0931 12.75 12.75 14.0931 12.75 15.75V18C12.75 19.6569 14.0931 21 15.75 21H18C19.6568 21 21 19.6569 21 18V15.75C21 14.0931 19.6568 12.75 18 12.75Z" />
                </g>
                <defs>
                  <clipPath id="clip0_183_3365">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(3 3)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <span className="ms-3 ">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/service");
                // dispatch(openSidebar());
                
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/service"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/service"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 10.8333C20 12.2142 18.8808 13.3333 17.5 13.3333C16.1192 13.3333 15 12.2142 15 10.8333C15 9.4525 16.1192 8.33333 17.5 8.33333C18.8808 8.33333 20 9.4525 20 10.8333ZM17.5 15C16.1192 15 15 16.1192 15 17.5C15 18.8808 16.1192 20 17.5 20C18.8808 20 20 18.8808 20 17.5C20 16.1192 18.8808 15 17.5 15ZM12.0833 9.58333H1.25C0.56 9.58333 0 10.1425 0 10.8333C0 11.5242 0.56 12.0833 1.25 12.0833H12.0833C12.7733 12.0833 13.3333 11.5242 13.3333 10.8333C13.3333 10.1425 12.7733 9.58333 12.0833 9.58333ZM12.0833 16.25H1.25C0.56 16.25 0 16.8092 0 17.5C0 18.1908 0.56 18.75 1.25 18.75H12.0833C12.7733 18.75 13.3333 18.1908 13.3333 17.5C13.3333 16.8092 12.7733 16.25 12.0833 16.25ZM20 3.75V4.16667C20 5.545 18.8783 6.66667 17.5 6.66667H2.5C1.12167 6.66667 0 5.545 0 4.16667V3.75C0 1.6825 1.6825 0 3.75 0H16.25C18.3175 0 20 1.6825 20 3.75ZM17.5017 4.16667L17.5 3.75C17.5 3.06083 16.9392 2.5 16.25 2.5H3.75C3.06083 2.5 2.5 3.06083 2.5 3.75V4.16667H17.5017Z"
                  fill={`${
                    window.location.pathname === "/service"
                      ? "#FFDD11"
                      : "white"
                  }`}
                />
              </svg>
              <span className="ms-3 ">Services</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/products");
                // dispatch(openSidebar());
                
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/products"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/products"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 11C14.5 11.69 13.957 12 13.289 12H11V10H13.289C13.957 10 14.5 10.31 14.5 11ZM13.27 14H11V16H9V8H13.27C14.777 8 16 9.473 16 11C16 12.488 14.777 13 13.27 14ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="#858D9D"/>
</svg>

              <span className="ms-3 ">Products</span>
            </a>
          </li>
          <li>
            <a
              // onClick={() => {
              //   navigate("vendor/customers");
              //   setDropdownproduct(false);
              //   dispatch(openSidebar());
              //   toggleFoodNoHeight();
              
              // }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/food/vendor/customers"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/food/vendor/customers"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15.3333C11.3407 15.3333 10.6963 15.1378 10.1481 14.7716C9.59994 14.4053 9.17269 13.8847 8.9204 13.2756C8.66811 12.6665 8.6021 11.9963 8.73072 11.3497C8.85933 10.7031 9.1768 10.1092 9.64298 9.64298C10.1092 9.1768 10.7031 8.85933 11.3497 8.73072C11.9963 8.6021 12.6665 8.66811 13.2756 8.9204C13.8847 9.17269 14.4053 9.59994 14.7716 10.1481C15.1378 10.6963 15.3333 11.3407 15.3333 12C15.3333 12.8841 14.9821 13.7319 14.357 14.357C13.7319 14.9821 12.8841 15.3333 12 15.3333ZM6.73583 15.3333H2.83333C2.61232 15.3333 2.40036 15.2455 2.24408 15.0893C2.0878 14.933 2 14.721 2 14.5C2.0079 13.3034 2.4431 12.149 3.22713 11.2451C4.01116 10.3411 5.09239 9.74702 6.27583 9.57C6.41335 9.55073 6.5535 9.56614 6.68355 9.61481C6.81361 9.66348 6.92943 9.74388 7.02051 9.8487C7.11159 9.95353 7.17502 10.0794 7.20506 10.215C7.2351 10.3506 7.23078 10.4915 7.1925 10.625C7.0648 11.0722 7.00001 11.535 7 12C7.00024 12.7415 7.16713 13.4734 7.48833 14.1417C7.54875 14.2685 7.57611 14.4086 7.56788 14.5488C7.55965 14.6891 7.51609 14.825 7.44125 14.9439C7.36642 15.0628 7.26273 15.1608 7.13984 15.2289C7.01694 15.297 6.87883 15.3329 6.73833 15.3333H6.73583ZM16.1667 22H7.83333C7.61232 22 7.40036 21.9122 7.24408 21.7559C7.0878 21.5996 7 21.3877 7 21.1667C7 19.8406 7.52678 18.5688 8.46447 17.6311C9.40215 16.6934 10.6739 16.1667 12 16.1667C13.3261 16.1667 14.5979 16.6934 15.5355 17.6311C16.4732 18.5688 17 19.8406 17 21.1667C17 21.3877 16.9122 21.5996 16.7559 21.7559C16.5996 21.9122 16.3877 22 16.1667 22ZM17 8.66667C16.3407 8.66667 15.6963 8.47117 15.1481 8.1049C14.5999 7.73863 14.1727 7.21803 13.9204 6.60895C13.6681 5.99986 13.6021 5.32964 13.7307 4.68303C13.8593 4.03643 14.1768 3.44249 14.643 2.97631C15.1092 2.51014 15.7031 2.19267 16.3497 2.06405C16.9963 1.93543 17.6665 2.00144 18.2756 2.25374C18.8847 2.50603 19.4053 2.93327 19.7716 3.48143C20.1378 4.0296 20.3333 4.67406 20.3333 5.33333C20.3333 6.21739 19.9821 7.06524 19.357 7.69036C18.7319 8.31548 17.8841 8.66667 17 8.66667ZM7 8.66667C6.34073 8.66667 5.69626 8.47117 5.1481 8.1049C4.59994 7.73863 4.17269 7.21803 3.9204 6.60895C3.66811 5.99986 3.6021 5.32964 3.73072 4.68303C3.85933 4.03643 4.1768 3.44249 4.64298 2.97631C5.10915 2.51014 5.7031 2.19267 6.3497 2.06405C6.9963 1.93543 7.66652 2.00144 8.27561 2.25374C8.8847 2.50603 9.40529 2.93327 9.77156 3.48143C10.1378 4.0296 10.3333 4.67406 10.3333 5.33333C10.3333 6.21739 9.98214 7.06524 9.35702 7.69036C8.7319 8.31548 7.88405 8.66667 7 8.66667ZM21.1667 15.3333H17.2642C17.1237 15.3329 16.9856 15.297 16.8627 15.2289C16.7398 15.1608 16.6361 15.0628 16.5612 14.9439C16.4864 14.825 16.4429 14.6891 16.4346 14.5488C16.4264 14.4086 16.4538 14.2685 16.5142 14.1417C16.8345 13.4732 17.0005 12.7413 17 12C16.9986 11.5348 16.9324 11.072 16.8033 10.625C16.7648 10.4911 16.7605 10.3498 16.7907 10.2138C16.821 10.0778 16.8848 9.95161 16.9764 9.84667C17.068 9.74174 17.1844 9.66143 17.315 9.6131C17.4457 9.56477 17.5863 9.54995 17.7242 9.57C18.9076 9.74702 19.9888 10.3411 20.7729 11.2451C21.5569 12.149 21.9921 13.3034 22 14.5C22 14.721 21.9122 14.933 21.7559 15.0893C21.5996 15.2455 21.3877 15.3333 21.1667 15.3333Z"
                  fill={`${
                    window.location.pathname === "/food/vendor/customers"
                      ? "#FFDD11"
                      : "white"
                  }`}
                />
              </svg>

              <span className="ms-3 ">Customers</span>
            </a>
          </li>
      
          <li>
            <a
              // onClick={() => {
              //   navigate("vendor/reports");
              //   setDropdownproduct(false);
              //   dispatch(openSidebar());
              //   toggleFoodNoHeight();
              
              // }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/food/vendor/reports"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/food/vendor/reports"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2 5.83333V0.383333C10.9761 0.671667 11.6901 1.11583 12.2953 1.70833L15.2566 4.61333C15.8618 5.20583 16.3149 5.90583 16.609 6.66667H11.05C10.5808 6.66667 10.2 6.2925 10.2 5.83333ZM17 8.7375V15.8333C17 18.1308 15.0935 20 12.75 20H4.25C1.90655 20 0 18.1308 0 15.8333V4.16667C0 1.86917 1.90655 0 4.25 0H8.08775C8.2263 0 8.36315 0.0108333 8.5 0.02V5.83333C8.5 7.21167 9.6441 8.33333 11.05 8.33333H16.9796C16.989 8.4675 17 8.60167 17 8.7375ZM5.95 15C5.9449 13.91 4.2551 13.9108 4.25 15V16.6667C4.2551 17.7567 5.9449 17.7558 5.95 16.6667V15ZM9.35 10.8333C9.3449 9.74333 7.6551 9.74417 7.65 10.8333V16.6667C7.6551 17.7567 9.3449 17.7558 9.35 16.6667V10.8333ZM12.75 13.3333C12.7449 12.2433 11.0542 12.2442 11.05 13.3333V16.6667C11.0551 17.7567 12.7458 17.7558 12.75 16.6667V13.3333Z"
                  fill={`${
                    window.location.pathname === "/food/vendor/reports"
                      ? "#FFDD11"
                      : "white"
                  }`}
                />
              </svg>

              <span className="ms-3 ">Reports</span>
            </a>
          </li>

          <li
            className=" flex hover:cursor-pointer"
            onClick={() => {
              localStorage.removeItem("Userdata");
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <a className="text-red-700 font-bold text-center mb-5 w-full">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default FoodSideBar;
