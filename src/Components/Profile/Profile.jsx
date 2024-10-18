import React, { useContext, useEffect, useState } from 'react'
import { MediaContext } from '../../Context/MediaContext';
import MediaItem from '../MediaItem/MediaItem';
import { Link } from 'react-router-dom';
import Title from '../Title/Title';

export default function Profile({userData}) {
  let {setType, isLoadingSpin, setIsLoadingSpin} = useContext(MediaContext);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(()=>{
    setType('profile');
    const items = JSON.parse(localStorage.getItem('savedItems')) || [];
    setSavedItems(items);
    if (!userData) {
      setIsLoadingSpin(true);
    } else {
      setIsLoadingSpin(false);
    }
  },[userData, setIsLoadingSpin]);
  
  if(!userData) {
    return (<div className="row text-center my-5 py-5">
              <div className='col-md-4 offset-md-4 py-5'>
                <i className='h1 fas fa-spinner fa-spin'></i>
              </div>
            </div>);
  }
  let { name, email } = userData;
  return (<>
    <Title title={name}/>
      <div className="row">
      {!isLoadingSpin? <>
        <div className="d-flex justify-content-center col-md-4 offset-md-4 my-5 py-5">
          <div>
            <h4>Name: <span className="ps-2 text-muted">{name}</span></h4>
            <h4>Email: <span className="ps-2 text-muted">{email}</span></h4>
          </div>
        </div></>:''}
      {savedItems.length > 0 ? <>
        {savedItems.filter((item) => item.media_type == 'movie').length > 0 ?
          <div className="row m-auto">
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2>Saved <br/> Movies <br/> to Watch Later</h2>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {savedItems.filter((item) => item.media_type == 'movie').map((item, index) => 
              <MediaItem key={index} item={item} type={item.media_type} />
            )}
          </div>:''}
        {savedItems.filter((item) => item.media_type == 'tv').length > 0 ?
          <div className="row m-auto mt-5">
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2>Saved <br/> Tv Series <br/> to Watch Later</h2>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {savedItems.filter((item) => item.media_type == 'tv').map((item, index) => 
                <MediaItem key={index} item={item} type={item.media_type} />
            )}
          </div>:''}
        </>:<div className='row'>
              <div className="col-md-4 offset-md-4 text-center">
                <p className='h4 text-warning'>No Movies are Saved here !</p>
                <Link to={'/'}><button className='btn btn-primary mt-2'>Let's Watch Right Now</button></Link>
              </div>
            </div>}
    </div>
  </>)
}