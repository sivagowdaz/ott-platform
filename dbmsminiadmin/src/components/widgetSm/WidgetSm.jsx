import { Visibility } from '@material-ui/icons'
import React from 'react'
import './widgetSm.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosJWT } from '../../helper';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';



export default function WidgetSm() {

    const [newUsers, setNewUsers] = useState([])
    const [newMovies, setNewMovies] = useState([])
    const [newSeries, setNewSeries] = useState([])
    const [newSerials, setSerials] = useState([])

    useEffect(() => {
        console.log('inside the useeffect widget small')
        const getNewUsers = async () => {
            try {
                let access_token = JSON.parse(localStorage.getItem('user')).tokens.access_token
                
                const res = await axiosJWT.get('http://localhost:5000/api/auth/get_all_users', {
                    headers: {
                        authorization: `Bearer ${access_token}`
                    }
                })
                let data = res.data
                setNewUsers(data.slice(data.length-6, data.length).reverse())
            } catch (err) {
                console.log(err)
            }
        }
        const getMovies = async () => {
            let time = new Date().getTime()
            try {
                const res = await axiosJWT.get('http://localhost:5000/api/content/get_contents/?type=movie', {
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
                    }
                })
                console.log("the new movies are", res.data)
                setNewMovies(res.data)
                   
             
            } catch(error) {
                console.log(error.message)
            }
        }
        const getSeries = async () => {
            let time = new Date().getTime()
            try {
                const res = await axiosJWT.get('http://localhost:5000/api/content/get_contents/?type=series', {
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
                    }
                })
                setNewSeries(res.data.slice(0, 5).reverse())


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
        getNewUsers()
        getMovies()
        getSeries()
        getSerials()
    }, [])
    console.log("the new users are", newUsers)
    return (
        <div className='widgetSm'>
            <div className="topsec">
                <div className='widgetItem'>
                    <span className="widgetSmTitle">Newly Added Movies</span>
                    <ul className="widgetSmList">
                        {newMovies && newMovies.map((movie) =>
                            <li className="widgetSmItem">
                                <div className="widgetSmUser_mod">
                                    <span >
                                        <Avatar>M</Avatar>
                                    </span>
                                    <span className="widgetSmUsername">{movie.cont_title}</span>
                                    <span className="widgetSmPosition">{movie.genre}</span>
                                    <span className="widgetSmDuration">{movie.duration}</span>
                                    <span className="widgetSmDuration">{movie.release_time.slice(0, 10)}</span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='widgetItem'>
                    <span className="widgetSmTitle">Newly Added Series</span>
                    <ul className="widgetSmList">
                        {newSeries && newSeries.map((series) =>
                            <li className="widgetSmItem">
                                <div className="widgetSmUser_mod">
                                    <span>
                                        <Avatar>S</Avatar>
                                    </span>
                                    <span className="widgetSmUsername">{series.cont_title}</span>
                                    <span className="widgetSmPosition">{series.genre}</span>
                                    <span className="widgetSmDuration">{series.duration}</span>
                                    <span className="widgetSmDuration">{series.release_time.slice(0, 10)}</span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='widgetItem'>
                    <span className="widgetSmTitle">Newly Added Serials</span>
                    <ul className="widgetSmList">
                        {newSerials && newSerials.map((serial) =>
                            <li className="widgetSmItem">
                                <div className="widgetSmUser_mod">
                                    <span>
                                        <Avatar>S</Avatar>
                                    </span>
                                    <span className="widgetSmUsername">{serial.cont_title}</span>
                                    <span className="widgetSmPosition">{serial.genre}</span>
                                    <span className="widgetSmDuration">{serial.duration}</span>
                                    <span className="widgetSmDuration">{serial.release_time.slice(0, 10)}</span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

            </div>
            <div className='widgetItemUser'>
                <span className="widgetSmTitle">Newly Joined Members</span>
                <ul className="widgetSmList">
                    {newUsers && newUsers.map((user) =>
                        <li className="widgetSmItem">
                            <img src={user.profilePic || 'https://tse3.mm.bing.net/th?id=OIP.3-rUE4SORzLoGxaLp7KvLAHaHa&pid=Api&P=0&w=300&h=300'} alt="" className='widgetSmImage' />
                            <p className="widgetSmUsername">{user.username}</p>
                            <p className="widgetSmPosition">{user.email || 'unknown'}</p>
                           
                            <button className="widgetSmButton">
                                <Link to={`user/${user.email}`} className='link'>
                                    <Visibility className='widgetSmIcon' />
                                    display
                                </Link>
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            
           
           
            
            
        </div>
    )
}

