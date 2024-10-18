import React, { useContext, useEffect, useState } from 'react'
import { MediaContext } from '../../Context/MediaContext';
import MediaItem from '../MediaItem/MediaItem';
import NoResults from '../NoResuts/NoResults';
import Title from '../Title/Title';

export default function Tv() {
  let {trendingTv, popularTv, topRatedTv, isSearch, isSearchSpin, searchItems, setType, clearSearch} = useContext(MediaContext);
  const [activeTab, setActiveTab] = useState('Trending');
  useEffect(()=>{
    setType('tv');
    clearSearch();
  },[activeTab])
  const renderTvs = () => {
    switch (activeTab) {
      case 'Trending':
        return trendingTv.map((tv, index) => <MediaItem key={index} item={tv} type={'tv'} />);
      case 'Popular':
        return popularTv.map((tv, index) => <MediaItem key={index} item={tv} type={'tv'} />);
      case 'TopRated':
        return topRatedTv.map((tv, index) => <MediaItem key={index} item={tv} type={'tv'} />);
      default:
        return null;
    }
  };
  
  return (<>
    <Title title={'Cineflix - Tv Series'}/>
    {isSearchSpin?<>
        <div className="row text-center my-5 py-5">
          <div className='col-md-4 offset-md-4 py-5'>
            <i className='h1 fas fa-spinner fa-spin'></i>
          </div>
        </div>
      </>:<>
      {!isSearch?<ul className="navs-tabs nav justify-content-center mb-md-5 mb-4 mt-5 mt-md-0 col-md-4 d-flex m-auto rounded-4 ">
        <li className="nav-item cursor-pointer">
          <a className={`nav-link ${activeTab === 'Trending' ? 'active' : ''}`} onClick={() => setActiveTab('Trending')} aria-current="page" >Trending</a>
        </li>
        <li className="nav-item cursor-pointer">
          <a className={`nav-link ${activeTab === 'Popular' ? 'active' : ''}`} onClick={() => setActiveTab('Popular')} >Popular</a>
        </li>
        <li className="nav-item cursor-pointer">
          <a className={`nav-link ${activeTab === 'TopRated' ? 'active' : ''}`} onClick={() => setActiveTab('TopRated')} >Top Rated</a>
        </li>
      </ul>:''}
      <div className={`row m-0 ${isSearch? 'pt-5' : ''}`}>
      {isSearch? searchItems.length == 0 ? <NoResults/> : searchItems.map((tv, index)=> <MediaItem key={index} item={tv} type={'tv'} />): renderTvs()}
      </div></>}
  </>)
}
