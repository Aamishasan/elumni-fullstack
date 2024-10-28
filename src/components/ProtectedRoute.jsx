import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { ACCESS } from '../constants';
import {jwtDecode} from 'jwt-decode';
import api from '../api';

const ProtectedRoute = ({children}) => {
    const [autherized, setAuthorized] = useState(null);


    useEffect(() => {
        auth()
    }, []);

    if (autherized === null) {
        return <div>Loading......</div>
    }


    function auth () {
        const accessToken = localStorage.getItem("access_token");


      if (!accessToken) {
        setAuthorized(false);
        return;
    }

    const {exp} =jwtDecode(accessToken)

    const todayDate= new Date().getTime();
    
    try { if (exp*1000 > todayDate){
      setAuthorized(true);
      return;
    }
    else{
      refreshAuth();
    }}
    catch (error) {
        // console.log(error);
        setAuthorized(false);
        return;
    }

    
  }



  const refreshAuth = () => {
    const refreshToken = localStorage.getItem('refresh_token');


    if (!refreshToken) {
      setAuthorized(false);
      return;
  }

  try {
        const access = api.post('api/token/refresh/', {
            refresh: refreshToken});

            if (access.status==200){
              // check access 
              // console.log(access)
              localStorage.setItem(ACCESS, access.data.access); 
              setAuthorized(true);
            }
  }
  catch (error) {
      // console.log(error);
      localStorage.clear();
      setAuthorized(false);
      return;  
      }




  }




  return (
    <>

       {/* check if access token is expired or not */}
       {/* check if we have access token and autherize*/}
       {/* if expired we will ask for a new access token using refresh token */}
       {/* if refresh is also expired we will divert the user to login page */}
        
       

       { autherized ? children : <Navigate to="/login" />}

    </>
  )
}

export default ProtectedRoute
