import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let AuthContext = createContext(null);

function AuthContextProvider(props) {
    const [userData, setUserData] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem('userToken') != null) {
          saveUserData();
        }
      },[])
      const saveUserData = () => {
        getLoggedUserData();
      }
      const getLoggedUserData = async () => {
        try {
          let token = localStorage.getItem('userToken');
          let {data} = await axios.get(`https://e-shop-jade-phi.vercel.app/api/v1/users/getMe`, 
            {headers: {Authorization: `Bearer ${token}`}});
          setUserData(data.data);
        } catch (error) {
          console.error("Error on get Logged User Data:", error);
        }
      }
    return <AuthContext.Provider value={{userData, setUserData, saveUserData}}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContextProvider;