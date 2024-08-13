import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotification, readNotification } from "../../api/api";

const NotificationBar = ({
  getNotData,
  setGetNotData,
  getNotificationData,
  setOpenNotification,
}) => {
  const navigate = useNavigate();
  const notificationListRef = useRef(null);
  const [paginatecount, setPaginatecount] = useState(1);
  const [navbardata, setNavbardata] = useState([]);
  const [notficationlength, setntfLengt] = useState(0);
  const [loading,setLoading] = useState(true);

  const getAllNotification = (page) => {
    setLoading(true);
    getNotification(page)
      .then(({ data }) => {
        
        setNavbardata((prev)=> [...prev,...data?.notifications]);
        setntfLengt(data?.totalCount);
        setPaginatecount(page)
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllNotification();
  }, []);

  const handleScrollToBottom = () => {
    console.log('reached bottok')
    if(notficationlength >= navbardata.length) return;
    getAllNotification(paginatecount + 1);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      handleScrollToBottom();
    }
  };

  useEffect(() => {
    const notificationList = notificationListRef.current;
    if (notificationList) {
      notificationList.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (notificationList) {
        notificationList.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="fixed z-50 top-16 right-6 w-80 bg-[#0A0A0B] text-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-4 font-bold text-xl border-b border-gray-700">Notifications</div>
       <ul
        ref={notificationListRef}
        className="list-none overflow-y-scroll max-h-96 scrollbar-hide"
      >
        {navbardata.map((notification, index) => (
         <li
         onClick={() => {
           readNotification(notification._id)
             .then((data) => {
               getNotificationData();
             })
             .catch((err) => {
               console.log(err);
             });
         }}
         key={index}
         className={`border-b border-gray-700 last:border-b-0 p-2 ${
           !notification?.isRead ? "bg-gray-800" : ""
         }`}
       >
         <a className="flex items-center p-4 hover:bg-gray-700 relative">
           {!notification?.isRead && (
             <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-2 w-2 bg-yellow-400 rounded-full"></span>
           )}
           <div>
             <div className="font-medium">{notification?.title}</div>
             <div className="text-sm text-gray-400">
               {notification?.message}
             </div>
           </div>
         </a>
       </li>
       
        ))}
        {loading && <li>
            <img className="mx-auto" src="/loading.gif" width={40} height={40}/>
            </li>}
      </ul>
      {notficationlength === 0 && !loading && (
  <div className="text-gray-400 p-4 text-center">
    There are no pending notifications.
    
  </div>
)}
    </div>
  );
};

export default NotificationBar;
