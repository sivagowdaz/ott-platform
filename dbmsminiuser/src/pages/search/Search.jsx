import React from 'react';
import { useState, useEffect } from 'react';
import './search.css';
import { axiosJWT } from '../../helper';
import SearchItem from '../../components/featured/searchItem/SearchItem';
import Navbar from '../../components/navbar/Navbar';


const Search = () => {
    const [searchResult, setSearchResult] = useState(null)
    const [search_string, setSearchString] = useState(null)

    
    const handleClick = async(e) => {
        e.preventDefault()
        console.log(search_string)
        let res = await axiosJWT.get('http://localhost:5000/api/content/sort_content/' + search_string, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        console.log("the result is", res.data)
        setSearchResult(res.data)
    }
    return (
        <div className='search_page'>
            <Navbar/>
            <div className='search_container'>
                <div className='search_acce'>
                    <input type='text' placeholder='Search' className='search_box' onChange={(e) => setSearchString(e.target.value)}></input>
                    <button type='submit' className='search_button' onClick={(e) => handleClick(e)}>Search</button>
                </div>
            </div>
            <div className='search_result_container'>
                <div className='movie_result'>
                    {
                        searchResult &&
                        searchResult.movies.map((movie) => <SearchItem cont_id={movie.cont_id} />)
                    }
                </div>
        
                <div className='series_result'>
                    {
                        searchResult &&
                        searchResult.series.map((series) => <SearchItem cont_id={series.cont_id} />)
                    }
                </div>
                <div className='serials_result'>
                    {
                        searchResult &&
                        searchResult.serials.map((serial) => <SearchItem cont_id={serial.cont_id} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Search