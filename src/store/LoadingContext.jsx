import React, { createContext, useState, useContext } from 'react';

// Create the context
const LoadingContext = createContext();

// Create a provider component
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the LoadingContext
export const useLoading = () => {
  return useContext(LoadingContext);
};