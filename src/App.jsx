import { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import AppRoutes from "./routes";
import NavBar from './NavBar';
import VertNav from "./VertNav";
import ServerApi from './api/api';
import userContext from './userContext';
import { useLocalStorage } from './hooks';
import {jwtDecode} from "jwt-decode";
import { ToastContainer } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer';

function App() {
  const [currentUser, setCurrentUser] = useLocalStorage(JSON.parse(localStorage.getItem('currUser')),null);
  const [token, setToken] = useState('');
  useEffect(function setupCurrentUser(){
    async function currUserSetup(){
      try{
        if(token){
          const decodeToken = await ServerApi.decodeToken(token)
          setCurrentUser(decodeToken);
        }
      }catch (err){
        console.error("Error decoding token:", err);
      }
    }
    currUserSetup();
  },[token]);

  async function login (email, password) {
    const loginToken = await ServerApi.getToken(email, password);
    setToken(loginToken);
    localStorage.setItem("token", loginToken);
  };

  async function signup (name, password, email, phone, type) {
    const loginToken = await ServerApi.registerUser(name, password, email, phone, type);
    setToken(loginToken);
    localStorage.setItem("token", loginToken);

    // Decode the token to get currentUser information
    const decoded = jwtDecode(loginToken);
    setCurrentUser({
      accountId: decoded.accountId,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
      isProvider: decoded.isProvider
    });
  };

  function logout () { 
    setToken('');
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <userContext.Provider value={currentUser}>
        <div className='App row'>
          <NavBar logout={logout} />
          <div className='row'>
            <div className='col-sm-3'>
              <VertNav />
            </div>
            <div className='col-md-9'>
              <div className='Content'>
                <ToastContainer />
                <AppRoutes login={login} signup={signup} logout={logout}/>
              </div>
            </div>
          </div>
          <div className='row'>
            <Footer/>
          </div>
        </div>
      </userContext.Provider>
    </BrowserRouter>
  )
}

export default App
