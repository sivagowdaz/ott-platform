import React from 'react'
import './home.css';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured'
import { axiosJWT } from '../../helper';
import List from '../../components/list/List';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
// import axios from 'axios'

const Home = ({ type }) => {
    const [movies, setMovies] = useState(null)
    const [series, setSeries] = useState(null)
    const [serials, setSerials] = useState(null)
    const [genre, setGenre] = useState(null)
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmVkNGY4NjNkMzVjNTg1YmNhN2Q3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTk3MDIzNywiZXhwIjoxNjM2NDAyMjM3fQ.gkItgbaZb6MeF_sYrU3Q_NWBBNryOw5nNKAtYJGyEcg'

    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await axiosJWT.get('http://localhost:5000/api/content/get_contents/?type=movie', {
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
                    }
                })
                console.log("the new movies are", res.data)
                setMovies(res.data)


            } catch (error) {
                console.log(error.message)
            }
        }
        const getSeries = async () => {
            try {
                const res = await axiosJWT.get('http://localhost:5000/api/content/get_contents/?type=series', {
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
                    }
                })
                setSeries(res.data.slice(0, 5).reverse())


            } catch (error) {
                console.log(error.message)
            }
        }
        const getSerials = async () => {
            try {
                const res = await axiosJWT.get('http://localhost:5000/api/content/get_contents/?type=serial', {
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
                    }
                })
                console.log("serials are", res.data)
                setSerials(res.data)


            } catch (error) {
                console.log(error.message)
            }
        }
        getMovies()
        getSeries()
        getSerials()
    }, [type, genre])
    console.log("the type is", type)
    return (
        <div className='home'>
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            <div>
                <p className='list_title'>Recent Movies</p>
                <div className='movies_list'>
                        {movies && movies.map((movie) => <List list={movie} index={1} />)}
                </div>
                <p className='list_title'>Recent Series</p>
                <div className='seires_list'>
                    
                        {series && series.map((series) => <List list={series} index={1} />)}
                </div>
                <p className='list_title'>Recent Serials</p>
                <div className='serials_list'>
                        {serials && serials.map((serials) => <List list={serials} index={1} />)}
                </div>

            </div>
        </div>
    )
}

export default Home
