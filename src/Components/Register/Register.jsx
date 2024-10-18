import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
import Title from '../Title/Title';

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  });
  const getUserData = (e) => {
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  const sendRegisterDataToApi = async () => {
    try {
      let { data } = await axios.post(`https://e-shop-jade-phi.vercel.app/api/v1/auth/signup`, user);
      setIsLoading(false);
      navigate('/login');
      setError('');
    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors[0].msg); 
      } else {
        setError('An unknown error occurred');
      }
    }
  }
  const submitRegisterForm = (e) => {
    setErrorList([]);
    setError([]);
    e.preventDefault();
    setIsLoading(true);
    let validation = validateRegisterForm();
    if(validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    }
    else {
      sendRegisterDataToApi();
    }
  }
  const validateRegisterForm = () => {
    let scheme = Joi.object({
      name:Joi.string().pattern(/^[A-Z]/).min(4).max(10).required(),
      email:Joi.string().email({ tlds: {allow: ['com', 'net']} }).required(),
      password:Joi.string().required(),
      confirmPassword:Joi.string().required()
    });
    return scheme.validate(user, {abortEarly:false});
  }
  return (<>
    <Title title={'Register'}/>
    <div className="row pt-5">
      <div className="col-md-6 offset-md-3">
        {errorList.map((err, index)=> {
          if(err.context.label == 'name') {
            return <div key={index} className='alert alert-danger my-2'>First character in name should be capital</div>
          }
          else {
            return <div key={index} className='alert alert-danger my-2'>{err.message}</div>
          }
        })}
        {error.length > 0 ?<div className='alert alert-danger my-2'>{error}</div>:''}
        <form onSubmit={submitRegisterForm} className='py-2'>
          <label htmlFor="first_name">Name</label>
          <input onChange={getUserData} type="text" className='my-input form-control my-2' name='name' id='name'/>
          <label htmlFor="email">Email</label>
          <input onChange={getUserData} type="email" className='my-input form-control my-2' name='email' id='email'/>
          <label htmlFor="password">Password</label>
          <input onChange={getUserData} type="password" className='my-input form-control my-2' name='password' id='password'/>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input onChange={getUserData} type="password" className='my-input form-control my-2' name='confirmPassword' id='confirmPassword'/>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-info my-2'>
              {isLoading == true? <i className='fas fa-spinner fa-spin'></i>:'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
</>)
}
