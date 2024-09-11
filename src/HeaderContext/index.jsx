/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";


  const HeaderContext = createContext();
  export const HeaderProvider = ({ children }) => { 
    const [filterByAmount, setFilterbyamount] = useState("asc"); 
    const [filterByTokenName, setFilterByTokenName] = useState(""); 
    const [callTheFunction, setCallTheFunction] = useState(false); 

    return (
      <HeaderContext.Provider value={{ filterByAmount,filterByTokenName ,setFilterbyamount,setFilterByTokenName,callTheFunction, setCallTheFunction }}>{children}</HeaderContext.Provider>
    );
  };

  // eslint-disable-next-line react-refresh/only-export-components
  export const useHeaderData = () => useContext(HeaderContext);