import React, { createContext, useContext, useState } from 'react';

// Create the context
export const NavContext = createContext();

// Create a provider component
export const NavProvider = ({ children }) => {
  const [isNav, setIsNav] = useState(false);
  const [ notification, setNotification] = useState();
  const [notificationData,setNotificationData] = useState();
  const [notificationCount,setNotificationCount] = useState();

  return (
    <NavContext.Provider value={{ isNav, setIsNav, notification, setNotification,notificationData,setNotificationData,notificationCount,setNotificationCount}}>
      {children}
    </NavContext.Provider>
  );
};

// Custom hook to use the LoadingContext
export const useNav = () => {
  return useContext(NavContext);
};