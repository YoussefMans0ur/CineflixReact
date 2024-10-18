import React from 'react'
import {Link} from 'react-router-dom';
import SaveButton from '../SaveButton/SaveButton';

export default function MediaItem({item, type}) {
  return (<>
    {item.profile_path || item.poster_path?
        <div className="item col-md-2 my-md-2 my-3 text-center">
            <div className="cursor-pointer position-relative">
                <Link to={`/itemdetails/${item.media_type?item.media_type:type}/${item.id}`}>
                {item.poster_path?<>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='w-100' alt=""/>
                </>:<>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} className='w-100' alt=""/>
                </>}
                </Link>
                <h3 className='h6 my-2'>{item.title} {item.name}</h3>
                {(item.media_type || type) != 'person' ?<SaveButton itemDetails={item} media_type={item.media_type? item.media_type: type} saveType={'icon'}/>: ''}
                {item.vote_average?<div className='vote p-2 text-white position-absolute top-0 end-0'>{item.vote_average?.toFixed(1)}</div>:''}
            </div>
        </div>:''}
</>)
}