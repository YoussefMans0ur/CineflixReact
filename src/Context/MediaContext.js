import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
export let MediaContext = createContext(null);

function MediaContextProvider(props) {
    const [isSearch, setIsSearch] = useState(false);
    const [isSearchSpin, setIsSearchSpin] = useState(false);
    const [isLoadingSpin, setIsLoadingSpin] = useState(false);
    const [type, setType] = useState(null);

    // Movies
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    // Tvs
    const [trendingTv, setTrendingTv] = useState([]);
    // const [airingTodayTv, setAiringTodayTv] = useState([]);
    // const [onTheAirTv, setOnTheAirTv] = useState([]);
    const [popularTv, setPopularTv] = useState([]);
    const [topRatedTv, setTopRatedTv] = useState([]);
    // People
    const [trendingPeople, setTrendingPeople] = useState([]);
    // Search
    const [searchItems, setSearchItems] = useState([]);
    // Similars
    const [similarItems, setSimilarItems] = useState([]);
    /// Details
    const [itemDetails, setItemDetails] = useState({});
    useEffect(()=> {
      // get Movies
      getTrending('movie', setTrendingMovies);
      getMovies('now_playing', setNowPlayingMovies);
      getMovies('popular', setPopularMovies);
      getMovies('top_rated', setTopRatedMovies);
      getMovies('upcoming', setUpcomingMovies);
      // get Tvs
      getTrending('tv', setTrendingTv);
      // getTv('airing_today', setAiringTodayTv);
      // getTv('on_the_air', setOnTheAirTv);
      getTv('popular', setPopularTv);
      getTv('top_rated', setTopRatedTv);
      // get People
      getTrending('person', setTrendingPeople);
    },[])
    const getTrending = async (mediaType, callback) => {
      try {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=64a8258df86d5d100db0c00a0d4778fe`);
        callback(data.results);
      } catch (error) {
        callback([]);
      }
    }
    const getMovies = async (movieList, callback) => {
      try {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieList}?api_key=64a8258df86d5d100db0c00a0d4778fe`);
        callback(data.results);
      } catch (error) {
        callback([]);
      }
    }
    const getTv = async (tvList, callback) => {
      try {
        let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${tvList}?api_key=64a8258df86d5d100db0c00a0d4778fe`);
        callback(data.results);
      } catch (error) {
        callback([]);
      }
    }
    const getItemDetails = async (media_type, id) => {
      let {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=64a8258df86d5d100db0c00a0d4778fe`);
      setItemDetails(data);
    }
    const getSearchItems = async (search, mediaType) => {
      let {data} = await axios.get(`https://api.themoviedb.org/3/search/${mediaType}?query=${search}&api_key=64a8258df86d5d100db0c00a0d4778fe`);
      setSearchItems(data.results);
      setIsSearchSpin(false);
    }
    const getSimilars = async (id, mediaType) => {
      let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=64a8258df86d5d100db0c00a0d4778fe`);
      setSimilarItems(data.results);
    }
    const handleSearchItems = (e, type) => {
      setIsSearchSpin(true);
      setIsSearch(true);
      e.preventDefault();
      getSearchItems(e.target[0].value, type);
    }
    const clearSearch = () => {
      setSearchItems([]);
      setIsSearch(false);
    };
    return <MediaContext.Provider value={{trendingMovies, nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies, trendingTv, popularTv, topRatedTv, trendingPeople, getItemDetails, itemDetails, getSearchItems, searchItems, getSimilars, similarItems, setIsSearch, isSearch, isSearchSpin, setIsSearchSpin, isLoadingSpin, setIsLoadingSpin, handleSearchItems, setType, type, clearSearch}}>
        {props.children}
    </MediaContext.Provider>
}
export default MediaContextProvider;