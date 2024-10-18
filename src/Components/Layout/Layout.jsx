import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { MediaContext } from '../../Context/MediaContext';

export default function Layout({userData, setUserData}) {

  let {isLoadingSpin, setIsLoadingSpin, setType} = useContext(MediaContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Determine if the current path is a public route or a valid path
    const isPublicPage = location.pathname === '/login' || location.pathname === '/register';
    const validPaths = ['/', '/movies', '/people', '/profile', '/tv', '/itemdetails/:media_type/:id']; // List of valid paths
    const isValidPath = validPaths.some(path => {
      return location.pathname === path || location.pathname.startsWith('/itemdetails');
    });

    // Show spinner only for valid protected routes
    if (!isPublicPage && !userData && !isLoggingOut && isValidPath) {
      setIsLoadingSpin(true);
    } else {
      setIsLoadingSpin(false);
    }
  }, [userData, isLoggingOut, location, setIsLoadingSpin]);

  const logOut = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('userToken');
    setType('login');
    setUserData(null);
    setIsLoadingSpin(false);
    navigate('/login');
  }
    if(isLoadingSpin) {
      return (<div className='layout'>
                <div className="container">
                  <div className="row text-center my-5 py-5">
                    <div className='col-md-4 offset-md-4 my-5 py-5'>
                      <i className='h1 my-5 py-5 fas fa-spinner fa-spin'></i>
                    </div>
                  </div>
                </div>
                <Footer/>
              </div>);
    } 
  return <div className='layout'>
          <Navbar logOut={logOut} userData={userData}/>
          <div className="container my-5 py-5">
            <Outlet></Outlet>
          </div>
          <Footer/>
        </div>
}
