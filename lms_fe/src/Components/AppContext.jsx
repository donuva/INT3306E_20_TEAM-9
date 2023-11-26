import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const updateSearchValue = (value) => {
    setSearchValue(value);
  };

  return (
    <AppContext.Provider value={{ searchValue, updateSearchValue }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
