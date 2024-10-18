import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MediaContext } from '../../Context/MediaContext';
import MediaItem from '../MediaItem/MediaItem';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SaveButton from '../SaveButton/SaveButton';


export default function ItemDetails() {
  let {media_type, id} = useParams();
  let {getItemDetails, itemDetails, getSimilars, similarItems, setType} = useContext(MediaContext);
  const [showFullBiography, setShowFullBiography] = useState(false);
  useEffect(()=>{
    setType('itemdetails');
    getItemDetails(media_type, id);
    if (media_type != 'person') {
      getSimilars(id, media_type);
    }
  },[media_type, id]);
  const handleReadMore = () => {
    setShowFullBiography(!showFullBiography);
  }
  return (<>
    <HelmetProvider>
        <Helmet>
          <title>{itemDetails.title? itemDetails.title: itemDetails.name}</title>
        </Helmet>
    </HelmetProvider>
    <div className="row m-0">
        <div className="col-md-4">
            {itemDetails.poster_path?<img src={`https://image.tmdb.org/t/p/w500/${itemDetails.poster_path}`} className='w-100' alt="" />
            :<img src={`https://image.tmdb.org/t/p/w500/${itemDetails.profile_path}`} className='w-100' alt=""/>}
        </div>
        <div className="col-md-8 ps-4">
            <h2 className='mt-4 mt-md-0'>{itemDetails.title} {itemDetails.name}</h2>
            {media_type == 'person'? <div className='pt-4'>
              {itemDetails.place_of_birth && <h5>Place of Birth: <span className='ps-2'>{itemDetails.place_of_birth}</span></h5>}
              {itemDetails.birthday && <h5  className='pt-2'>Birthday: <span className='ps-2'>{itemDetails.birthday}</span></h5>}
              {itemDetails.deathday && <h5  className='pt-2'>Deathday: <span className='ps-2'>{itemDetails.deathday}</span></h5>}
              {itemDetails.biography && itemDetails.biography?( itemDetails.biography.split(" ").length < 150 ? <p className='text-muted pt-3'>{itemDetails.biography}</p> : <p className='text-muted pt-3'>{showFullBiography? itemDetails.biography : itemDetails.biography.split(" ").slice(0,150).join(" ")}<span className='cursor-pointer text-info' onClick={handleReadMore}>{showFullBiography? ' read less': ' read more'}</span></p>): ''}
              </div>:''}
            <h4 className='text-muted fw-light'>{itemDetails.tagline}</h4>
            <div>
                <ul className='list-unstyled d-flex pt-2'>
                    {itemDetails.genres?itemDetails.genres.map((genre,index)=> <li className='p-1 m-2 vote rounded-2' key={index}>{genre.name}</li>):''}
                </ul>
            </div>
            <div>
                {itemDetails.vote_average && <h5 className='py-3 ps-1'>Vote : <span className='ms-2 fw-light'>{itemDetails.vote_average?.toFixed(1)}</span></h5>}
                {itemDetails.vote_count && <h5 className='py-3 ps-1'>Vote count : <span className='ms-2 fw-light'>{itemDetails.vote_count}</span></h5>}
                {media_type != 'person'&&itemDetails.popularity && <h5 className='py-3 ps-1'>Popularity : <span className='ms-2 fw-light'>{itemDetails.popularity}</span></h5>}
                {itemDetails.release_date && <h5 className='py-3 ps-1'>Release date : <span className='ms-2 fw-light'>{itemDetails.release_date}</span></h5>}
                {itemDetails.first_air_date && <h5 className='py-3 ps-1'>Release date : <span className='ms-2 fw-light'>{itemDetails.first_air_date}</span></h5>}
                {itemDetails.overview && <p className='h4 pt-3 fw-normal text-muted'>{itemDetails.overview}</p>}
            </div>
            {media_type != 'person' && <div className='d-flex align-items-center justify-content-btween pe-3'>
              <Link to={itemDetails.homepage}>
                <button className='btn btn-success px-3 py-2 mt-3 me-3'> {media_type == 'movie'? 'Watch Movie': 'Watch Tv'}  <i className="fa-solid fa-arrow-right ms-2"></i></button>
              </Link>
              <SaveButton itemDetails={itemDetails} media_type={media_type} saveType={'button'}/>
              </div> }
        </div>
        {media_type != 'person'? 
          <div className='row mx-0 mt-5 pt-5'>
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2>Similar <br/>{media_type == 'movie'? 'Movies': 'Tvs'}  <br/> to Watch Now</h2>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {similarItems.map((similar, index) => <MediaItem key={index} item={similar} type={media_type}/>)}
          </div> : ''}
    </div>
  </>)
}
