import { useContext, useEffect } from 'react';
import MediaItem from '../MediaItem/MediaItem';
import { MediaContext } from '../../Context/MediaContext';
import { Link } from 'react-router-dom';
import Title from '../Title/Title';

export default function Home() {
  let {trendingMovies, trendingTv, trendingPeople, setType} = useContext(MediaContext);
  useEffect(()=>{
    setType('home');
  },[])
  return (<>
    <Title title={'Cineflix - Watch Movies Online, Watch TV Series Online'}/>
    <div className="row m-0 py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
          <div className="brdr w-25 mb-3"></div>
          <h2 className='h4'><Link to='/movies'>Trending <br/> Movies <br/> to Watch Now</Link></h2>
          <h5 className='py-2 text-muted'>Most watched movies by days</h5>
          <div className="brdr w-100 mt-3"></div>
        </div>
      </div>
      {trendingMovies.slice(0,10).map((item, index)=> <MediaItem key={index} item={item} />)}
    </div>
    <div className="row m-0 py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
          <div className="brdr w-25 mb-3"></div>
          <h2 className='h4'><Link to='/tv'>Trending <br/> Tv Series<br/> to Watch Now</Link></h2>
          <h5 className='py-2 text-muted'>Most watched Tv Series by days</h5>
          <div className="brdr w-100 mt-3"></div>
        </div>
      </div>
      {trendingTv.slice(0,10).map((item, index)=> <MediaItem key={index} item={item} />)}
    </div>
    <div className="row m-0 py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
          <div className="brdr w-25 mb-3"></div>
          <h2 className='h4'><Link to='/people'>Trending <br/> People <br/> to Watch Now</Link></h2>
          <h5 className='py-2 text-muted'>Most watched Actors by days</h5>
          <div className="brdr w-100 mt-3"></div>
        </div>
      </div>
      {trendingPeople.filter((person)=> person.profile_path != null).slice(0,10).map((item, index)=> <MediaItem key={index} item={item} />)}
    </div>
  </>)
}
