import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../store/NavContext";

function FoodSideBar() {
  const navigate = useNavigate();

  const {setIsNav,isNav} = useNav()

  const logout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className=" rounded-lg flex bg-black flex-col justify-center items-center px-20 p-8 border shadow-2xl border-slate-300">
              <div>
                <svg
                  width="98"
                  height="98"
                  viewBox="0 0 98 98"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="44"
                    cy="58"
                    r="40"
                    fill="#302B0E"
                    fill-opacity="0.2"
                  />
                  <path
                    d="M44.0206 40.0001C43.7834 40.0025 43.5489 40.0517 43.3307 40.1452C43.1125 40.2386 42.9147 40.3744 42.7488 40.5447C42.5828 40.7149 42.452 40.9165 42.3636 41.1377C42.2753 41.3588 42.2313 41.5952 42.234 41.8335V56.3341C42.2342 56.8151 42.4245 57.2765 42.7632 57.6165C43.1018 57.9566 43.5611 58.1475 44.04 58.1475C44.5188 58.1475 44.9781 57.9566 45.3168 57.6165C45.6554 57.2765 45.8458 56.8151 45.8459 56.3341V41.8335C45.8487 41.5919 45.8034 41.3522 45.7127 41.1285C45.6219 40.9048 45.4876 40.7015 45.3175 40.5307C45.1475 40.3599 44.9451 40.2251 44.7224 40.1339C44.4997 40.0428 44.2611 39.9973 44.0206 40.0001ZM54.5461 43.635C54.4873 43.6333 54.4285 43.6345 54.3699 43.6386C54.0132 43.669 53.6736 43.8053 53.3942 44.0302C53.1149 44.255 52.9084 44.5581 52.8011 44.9012C52.6938 45.2442 52.6906 45.6116 52.7917 45.9565C52.8929 46.3014 53.0939 46.6083 53.3692 46.8381C56.4944 49.5038 58.4716 53.4714 58.4716 57.9268C58.4716 65.9716 52.0402 72.4557 44.0488 72.4557C36.0574 72.4557 29.6118 65.9716 29.6119 57.9268C29.6119 53.4971 31.5639 49.5565 34.6579 46.8912C34.8382 46.7367 34.9863 46.5479 35.094 46.3359C35.2017 46.1238 35.2667 45.8925 35.2853 45.6552C35.304 45.4179 35.2759 45.1794 35.2027 44.953C35.1296 44.7266 35.0127 44.5169 34.8588 44.3358C34.705 44.1548 34.5171 44.0059 34.306 43.8978C34.0948 43.7897 33.8646 43.7243 33.6283 43.7056C33.3921 43.6868 33.1544 43.7151 32.929 43.7886C32.7036 43.8621 32.4948 43.9794 32.3146 44.134C28.4523 47.4612 26 52.4205 26 57.9268C26 67.927 34.1041 76.08 44.0488 76.08C53.9935 76.08 62.0799 67.927 62.0799 57.9268C62.0799 52.3884 59.6034 47.4086 55.7019 44.0809C55.3811 43.8 54.9717 43.6421 54.5461 43.635Z"
                    fill="#FFDD11"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-semibold m-2 text-white">Logout</h1>
              <p className="w-60 text-center text-white text-lg font-semibold">
                Are you sure want to logout?
              </p>
              <div className=" flex justify-around m-5">
                <button
                  className="rounded-lg mr-3 border p-1.5 border-yellow-500 text-yellow-500 w-32 text-center"
                  onClick={onClose}
                >
                  No
                </button>
                <button
                  className="rounded-lg bg-yellow-500 p-1.5 text-white w-32 text-center"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                    onClose();
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-30 w-64 h-screen pt-2 transition-transform  
      ${isNav ? "translate-x-0" : "-translate-x-full"} 
        border-r sm:translate-x-0 bg-black  border-gray-700`}
      aria-label="Sidebar"
    >
      <div
        class="h-full relative  pb-4 overflow-y-auto  bg-black"
        style={{ scrollbarWidth: "none" }}
      >
        <button
          onClick={() => setIsNav(false)}
          className="absolute sm:hidden block right-6 text-white text-2xl mt-3"
        >
          X{" "}
        </button>
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
               
                setIsNav(false);
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
                  window.location.pathname === "/dashboard"
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
                setIsNav(false)
                
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
                navigate("/vehicles");
                setIsNav(false)
                
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/vehicles"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/vehicles"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>




              <span className="ms-3 ">Vehicles</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/categories");
                setIsNav(false)
                
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/categories"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/categories"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>



              <span className="ms-3 ">Categories</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/customers");
               
               setIsNav(false)
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/customers"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/customers"
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
                    window.location.pathname === "/customers"
                      ? "#FFDD11"
                      : "white"
                  }`}
                />
              </svg>

              <span className="ms-3 ">Clients</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/spares");
                setIsNav(false)
               }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/spares"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/spares"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
<svg width="24" height="24" viewBox="0 0 24 24" fill='none' xmlns="http://www.w3.org/2000/svg">
  <path fill={`${
                    window.location.pathname === "/spares"
                      ? "#FFDD11"
                      : "white"
                  }`} d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path  d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              <span className="ms-3 ">Spareparts</span>
            </a>
          </li>
      
          {/* <li>
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
          </li> */}

          <li
            className=" flex hover:cursor-pointer"
            onClick={logout}
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
