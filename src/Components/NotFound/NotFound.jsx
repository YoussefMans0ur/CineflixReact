import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Title from '../Title/Title'
import { AuthContext } from '../../Context/AuthContext'

export default function NotFound() {
  let {userData} = useContext(AuthContext);
  return (<>
  <Title title={'CineFlex: Not Found'}/>
  <div className="row">
    <div className='col-md-4 offset-md-4 bg-daner text-center my-5 py-5'>
        <i className="h1 fa-regular fa-face-frown-open py-3"></i>
        <h4 className='h1 pb-1 text-dange'>OOPS! <br /> PAGE NOT FOUND.</h4>
        <p className='text-muted'>You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for.</p>
        <Link to={userData?'/':'/login'}><button className='btn btn-primary rounded-4'>{userData?'Back To Home':'Login'}</button></Link>
    </div>
  </div>
</>)
}
