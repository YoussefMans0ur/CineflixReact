import React, { useContext } from 'react'
import { MediaContext } from '../../Context/MediaContext'

export default function NoResults() {
  let {type} = useContext(MediaContext);
  return (<>
  <div className="row">
    <div className="col-md-4 offset-md-4 text-center my-5 py-5 bg-ino h1 text-warning">
        <i className=" fa-regular fa-face-sad-tear pb-3 mt-3"></i>
        <p className='h4'>Sorry, we couldn't find any match results.</p>
        <button onClick={() => window.location.reload()} className='btn btn-primary rounded-4'>Back To {type === 'movie'? 'Movies': type === 'tv'? 'TvS' : type === 'person'? 'Actors': ''}</button>
    </div>
  </div>
</>)
}
