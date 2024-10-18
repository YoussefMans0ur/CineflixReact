import React, { useContext, useEffect } from 'react'
import { MediaContext } from '../../Context/MediaContext';
import MediaItem from '../MediaItem/MediaItem';
import NoResults from '../NoResuts/NoResults';
import Title from '../Title/Title';

export default function People() {
  let {trendingPeople, isSearch, isSearchSpin, searchItems, setType, clearSearch} = useContext(MediaContext);
  useEffect(()=>{
    setType('person');
    clearSearch();
  },[])

  return (<>
    <Title title={'Cineflix - Actors'}/>
    {isSearchSpin?<>
        <div className="row text-center my-5 py-5">
          <div className='col-md-4 offset-md-4 py-5'>
            <i className='h1 fas fa-spinner fa-spin'></i>
          </div>
        </div>
      </>:<>
    <div className="row m-0 py-5">
      {isSearch? searchItems.length == 0 ? <NoResults/> : searchItems.map((person, index)=> <MediaItem key={index} item={person} type={'person'} />):
      trendingPeople.map((person, index)=> <MediaItem key={index} item={person}/>) }
    </div></>}
  </>)
}
