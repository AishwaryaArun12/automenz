import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import MobileNavbar from "./MobileNavbar";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const titles = ["Dashboard", "Service"];
  const links = ["/clinics/dashboard", "/clinics/service"];

  const [active, setActive] = useState(titles[0]);
  useEffect(() => {
    if (location.pathname == "/clinics/service") {
      setActive("Service");
    }
  }, []);
  const logout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-75">
            <div className="rounded-lg flex flex-col w-1/3 mx-auto my-40 bg-gray-300 justify-center items-center px-20 p-8 border shadow-2xl border-slate-300">
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
                    fill="#F5895A"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M44.0206 40.0001C43.7834 40.0025 43.5489 40.0517 43.3307 40.1452C43.1125 40.2386 42.9147 40.3744 42.7488 40.5447C42.5828 40.7149 42.452 40.9165 42.3636 41.1377C42.2753 41.3588 42.2313 41.5952 42.234 41.8335V56.3341C42.2342 56.8151 42.4245 57.2765 42.7632 57.6165C43.1018 57.9566 43.5611 58.1475 44.04 58.1475C44.5188 58.1475 44.9781 57.9566 45.3168 57.6165C45.6554 57.2765 45.8458 56.8151 45.8459 56.3341V41.8335C45.8487 41.5919 45.8034 41.3522 45.7127 41.1285C45.6219 40.9048 45.4876 40.7015 45.3175 40.5307C45.1475 40.3599 44.9451 40.2251 44.7224 40.1339C44.4997 40.0428 44.2611 39.9973 44.0206 40.0001ZM54.5461 43.635C54.4873 43.6333 54.4285 43.6345 54.3699 43.6386C54.0132 43.669 53.6736 43.8053 53.3942 44.0302C53.1149 44.255 52.9084 44.5581 52.8011 44.9012C52.6938 45.2442 52.6906 45.6116 52.7917 45.9565C52.8929 46.3014 53.0939 46.6083 53.3692 46.8381C56.4944 49.5038 58.4716 53.4714 58.4716 57.9268C58.4716 65.9716 52.0402 72.4557 44.0488 72.4557C36.0574 72.4557 29.6118 65.9716 29.6119 57.9268C29.6119 53.4971 31.5639 49.5565 34.6579 46.8912C34.8382 46.7367 34.9863 46.5479 35.094 46.3359C35.2017 46.1238 35.2667 45.8925 35.2853 45.6552C35.304 45.4179 35.2759 45.1794 35.2027 44.953C35.1296 44.7266 35.0127 44.5169 34.8588 44.3358C34.705 44.1548 34.5171 44.0059 34.306 43.8978C34.0948 43.7897 33.8646 43.7243 33.6283 43.7056C33.3921 43.6868 33.1544 43.7151 32.929 43.7886C32.7036 43.8621 32.4948 43.9794 32.3146 44.134C28.4523 47.4612 26 52.4205 26 57.9268C26 67.927 34.1041 76.08 44.0488 76.08C53.9935 76.08 62.0799 67.927 62.0799 57.9268C62.0799 52.3884 59.6034 47.4086 55.7019 44.0809C55.3811 43.8 54.9717 43.6421 54.5461 43.635Z"
                    fill="#F5895A"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-semibold m-2">Logout</h1>
              <p className="w-48 text-center text-lg font-semibold">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-around m-5">
                <button
                  className="rounded-lg mr-3 border p-1.5 border-orange-700 text-orange-600 w-32 text-center"
                  onClick={onClose}
                >
                  No
                </button>
                <button
                  className="rounded-lg bg-orange-700 p-1.5 text-white w-32 text-center"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("encryptedToken");
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
    <>
      <div className="w-full bg-black h-20 flex align-bottom items-end mb-4">
        <div>
          <div className="p-2 px-0 md:px-8">
            {/* logo */}
          </div>
        </div>
        <div className="flex h-2/3 w-full">
          <div className=" mx-auto  hidden md:flex rounded-xl">
          <div
            className={`${
              active == titles[0] ? "bg-white" : "bg-black"
            } w-40 h-full`}
          >
            <button className="bg-black rounded-br-3xl w-40 h-full"></button>
          </div>

            {titles.map((title, i) => {
              return (
                <div
                  key={i}
                  className={`${
                    active == title
                      ? "bg-black"
                      : titles[i + 1] == active || titles[i - 1] == active
                      ? "bg-white"
                      : "bg-black"
                  }`}
                >
                  <button
                    onClick={() => {
                      setActive(title);
                      navigate(links[i]);
                    }}
                    className={`${i == 2 ? "w-48" : "w-40"}     ${
                      active == title
                        ? " rounded-t-3xl rounded-b-none h-full font-bold bg-white"
                        : " font-bold h-full  bg-black text-white"
                    } ${titles[i + 1] == active ? "rounded-br-3xl" : ""}    ${
                      titles[i - 1] == active ? "rounded-bl-3xl" : ""
                    }`}
                  >
                    {title}{" "}
                    <div
                      className="w-10 m-0.5 h-1 mx-auto"
                      style={{
                        backgroundColor:
                          active == title ? "rgba(245, 137, 90, 1)" : "black",
                      }}
                    ></div>
                  </button>
                </div>
              );
            })}
            <div
              className={`${
                active === titles[titles.length - 1] ? "bg-white" : "bg-black"
              } w-10 h-full flex`}
            >
              <button className="bg-black rounded-bl-3xl w-10 h-full"></button>
            </div>
          </div>
          <MobileNavbar
            logout={logout}
            titles={titles}
            setTitle={setActive}
          />
          
          <button
            onClick={logout}
            className="mt-4 md:mt-0 ml-10 mr-3 rounded-full bg-white w-7 h-7 p-1.5"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9914 5.48959e-05C7.8862 0.00109014 7.78223 0.0229324 7.68546 0.0643695C7.58868 0.105807 7.50099 0.166019 7.4274 0.241535C7.35381 0.31705 7.29577 0.406443 7.2566 0.504514C7.21743 0.602585 7.1979 0.707416 7.19913 0.813077V7.24352C7.19919 7.45682 7.28359 7.6614 7.43377 7.81221C7.58396 7.96301 7.78763 8.04769 7.99999 8.04769C8.21235 8.04769 8.41602 7.96301 8.5662 7.81221C8.71639 7.6614 8.80079 7.45682 8.80085 7.24352V0.813077C8.80209 0.705962 8.78201 0.59966 8.74177 0.500454C8.70153 0.401248 8.64195 0.311099 8.56654 0.235352C8.49113 0.159606 8.4014 0.0998015 8.30263 0.0593867C8.20386 0.018972 8.09804 -0.00119692 7.9914 5.48959e-05ZM12.659 1.61198C12.633 1.61123 12.6069 1.61175 12.5809 1.61355C12.4227 1.62704 12.2721 1.6875 12.1482 1.78721C12.0243 1.88691 11.9328 2.02135 11.8852 2.17346C11.8376 2.32558 11.8362 2.48852 11.881 2.64148C11.9259 2.79443 12.015 2.93052 12.1371 3.03244C13.523 4.21455 14.3998 5.974 14.3998 7.94978C14.3998 11.5173 11.5477 14.3928 8.00389 14.3928C4.46004 14.3928 1.60171 11.5173 1.60171 7.94978C1.60172 5.98543 2.46737 4.23793 3.83943 3.05597C3.91936 2.98744 3.98508 2.90373 4.03282 2.80969C4.08056 2.71565 4.10939 2.6131 4.11766 2.50786C4.12594 2.40263 4.11349 2.29684 4.08104 2.19644C4.04859 2.09604 3.99677 2.00304 3.92854 1.92276C3.8603 1.84247 3.77699 1.77647 3.68336 1.72852C3.58973 1.68058 3.48762 1.65157 3.38285 1.64326C3.27808 1.63495 3.17271 1.64748 3.07275 1.68008C2.97279 1.71268 2.8802 1.76471 2.80027 1.83325C1.08751 3.30872 7.52882e-06 5.50797 0 7.94978C-7.1962e-06 12.3845 3.59382 16 8.0039 16C12.414 16 16 12.3845 16 7.94978C16 5.49373 14.9017 3.28543 13.1716 1.80972C13.0293 1.68515 12.8478 1.61511 12.659 1.61198Z"
                fill="#F5895A"
              />
            </svg>
          </button>
        </div>
      </div>
    
     
    </>
  );
};

export default Nav;
