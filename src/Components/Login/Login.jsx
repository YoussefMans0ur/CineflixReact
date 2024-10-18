import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
import Title from '../Title/Title';

export default function Login({saveUserData}) {
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    email:'',
    password:''
  });
  const getUserData = (e) => {
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  const sendLoginDataToApi = async () => {
    try {
      let { data } = await axios.post(`https://e-shop-jade-phi.vercel.app/api/v1/auth/login`, user);
      setIsLoading(false);
      localStorage.setItem('userToken', data.token);
      saveUserData();
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  }
  const submitLoginForm = (e) => {
    setErrorList([]);
    setError([]);
    e.preventDefault();
    setIsLoading(true);
    let validation = validateLoginForm();
    if(validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    }
    else {
      sendLoginDataToApi();
    }
  }
  const validateLoginForm = () => {
    let scheme = Joi.object({
      email:Joi.string().email({ tlds: {allow: ['com', 'net']} }).required(),
      password:Joi.string().required()
    });
    return scheme.validate(user, {abortEarly:false});
  }
  return (<>
    <Title title={'Login'}/>
    <div className="row pt-5">
      <div className="col-md-6 offset-md-3">
        {errorList.map((err, index)=> <div key={index} className='alert alert-danger my-2'>{err.message}</div> )}
        {error.length > 0 ?<div className='alert alert-danger my-2'>{error}</div>:''}
        <form onSubmit={submitLoginForm} className='py-2'>
          <label htmlFor="email">Email</label>
          <input onChange={getUserData} type="email" className='my-input form-control my-2' name='email' id='email'/>
          <label htmlFor="password">Password</label>
          <input onChange={getUserData} type="password" className='my-input form-control my-2' name='password' id='password'/>
          <div className='d-flex justify-content-center'>
          <button className='btn btn-info my-2'>
            {isLoading == true? <i className='fas fa-spinner fa-spin'></i>:'Login'}
          </button>
          </div>
        </form>
      </div>
    </div>
</>)
}
