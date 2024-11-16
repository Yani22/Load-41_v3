import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner'; 
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './App.css';
import Main from './Main/main';
import { appleID, userID } from './Reducers/userReducer';
import { supabase } from './firebase';
import { Base64 } from 'js-base64';
function App() {
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.user?.userID)

  const fetchAllTokens = async (credentials) => {

    try {
        const response = await fetch('/get_tokens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (data.direct_token && data.truckstop_token && data.truckerpath_token) {
          data.dat_user_access_token && localStorage.setItem('token',data?.dat_user_access_token?.dat_user_access_token)
          data.dat_token && localStorage.setItem('dat_token',data.dat_user_access_token?.access_token)
          localStorage.setItem('direct_token',data.direct_token)
          localStorage.setItem('trucks_token',data.truckstop_token)
          localStorage.setItem('trucker_token',data.truckerpath_token)
          localStorage.setItem('direct-api-key',data.direct_api_key)
          localStorage.setItem('credentials',JSON.stringify({...credentials,access_token:data.dat_user_access_token?.access_token}))
        } else {
          console.log('Failed to fetch one or more tokens.');
        }
    } catch (err) {
        console.log('Error fetching tokens.');
    }
};

  React.useEffect(() => {
    getAuth()
  }, []);
  const fetchDatToken = async () => {
    try {
        const response = await fetch('dat_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.parse(localStorage.getItem('datCredentials'))
        });
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('token',data?.dat_user_access_token?.dat_user_access_token)
          localStorage.setItem('dat_token',data?.dat_user_access_token?.access_token)
        } else {
            console.log(data.message || 'Failed to fetch DAT token.');
        }
    } catch (err) {
        console.log('Error fetching DAT token.');
    }
};

const fetchTruckstopToken = async () => {
  try {
      const response = await fetch('/truckstop_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.parse(localStorage.getItem('trucksCredentials'))
      });
      const data = await response.json();
      if (data.access_token) {
          localStorage.setItem('trucks_token',data.access_token)
      } else {
          console.log(data.message || 'Failed to fetch Truckstop token.');
      }
  } catch (err) {
      console.log('Error fetching Truckstop token.');
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;  // No token provided

  const decoded = JSON.parse(atob(token.split('.')[1]));
  const exp = decoded.exp * 1000;  // Convert to milliseconds

  return Date.now() > exp;
};

  const getAuth = async () => {
    if (localStorage.getItem('authentication')) {
      if(isTokenExpired(JSON.parse(localStorage.getItem('authentication'))?.token)){
        dispatch(userID([]));
        localStorage.removeItem('token')
        localStorage.removeItem('dat_token')
        localStorage.removeItem('direct_token')
        localStorage.removeItem('trucks_token')
        localStorage.removeItem('trucker_token')
        localStorage.removeItem('direct-api-key')
        localStorage.removeItem('id')
        localStorage.removeItem('credentials')
        localStorage.removeItem('datCredential')
        localStorage.removeItem('trucksCredential')
        localStorage.removeItem('authentication')
        window.scrollTo(0, 0)
        return <Navigate to='/' />
      }else{
        const user = JSON.parse(localStorage.getItem('authentication'))?.user;
        dispatch(userID(user));
        localStorage.setItem('id', user.id)
        if(user?.role === 'admin'){
          fetchAllTokens(JSON.parse(localStorage.getItem('credentials')));
          setInterval(()=>fetchAllTokens(JSON.parse(localStorage.getItem('credentials'))),300000);
        }else{
          fetchTruckstopToken();
          fetchDatToken();
          setInterval(()=>{
          fetchTruckstopToken();
          fetchDatToken();
          },300000)
        }
        return <Navigate to='/dashboard' /> 
      }
    } else {
      dispatch(userID([]));
      localStorage.removeItem('token')
      localStorage.removeItem('dat_token')
      localStorage.removeItem('direct_token')
      localStorage.removeItem('trucks_token')
      localStorage.removeItem('trucker_token')
      localStorage.removeItem('direct-api-key')
      localStorage.removeItem('id')
      localStorage.removeItem('credentials')
      localStorage.removeItem('datCredential')
      localStorage.removeItem('trucksCredential')
      localStorage.removeItem('authentication')
      window.scrollTo(0, 0)
      return <Navigate to='/' />
    }
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
