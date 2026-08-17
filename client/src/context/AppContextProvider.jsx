import { useEffect, useState } from "react";
import { AppContent } from "./AppContext";
import {toast} from 'react-toastify' 
import axios from 'axios'
export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const getUserData=async ()=>{
    try{
      const {data} = await axios.get(backendUrl+'/api/user/user-data',{withCredentials: true})
      data.status === 'success'? setUserData(data.userData): toast.error(data.message)
    }catch(error){
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }
  useEffect(() => {
    axios
      .get(backendUrl + '/api/auth/is-auth', { withCredentials: true })
      .then(async ({ data }) => {
        if (data.status !== 'success') return;
        const response = await axios.get(backendUrl + '/api/user/user-data', { withCredentials: true });
        setIsLoggedIn(true);
        setUserData(response.data.userData);
      })
      .catch(() => {});
  }, [backendUrl]);
  
  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
