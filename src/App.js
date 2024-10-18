import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, createHashRouter, RouterProvider} from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Tv from './Components/Tv/Tv';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import {Offline} from 'react-detect-offline';
import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';
import NotFound from './Components/NotFound/NotFound';

function App() {

  let {userData, setUserData, saveUserData} = useContext(AuthContext);

  let routers = createHashRouter([
    {path:'/', element:<Layout userData={userData} setUserData={setUserData}/>, children: [
      {index:true, element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path:'movies', element: <ProtectedRoute><Movies/></ProtectedRoute>},
      {path:'people', element: <ProtectedRoute><People/></ProtectedRoute>},
      {path:'profile', element: <ProtectedRoute><Profile userData={userData}/></ProtectedRoute>},
      {path:'tv', element: <ProtectedRoute><Tv/></ProtectedRoute>},
      {path:'itemdetails/:media_type/:id', element: <ProtectedRoute><ItemDetails/></ProtectedRoute>},
      {path:'login', element: <Login saveUserData={saveUserData}/>},
      {path:'register', element: <Register/>},
      {path:'*', element: <NotFound/>}
    ]}
  ])
  return<>
    <RouterProvider router={routers}/>
    <div>
        <Offline> <div className='offline'>You are Offline</div></Offline>
      </div>
  </> 
}

export default App;
