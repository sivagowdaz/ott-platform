import { ArrowBackOutlined } from '@material-ui/icons'
import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import './watch.scss'

export default function Watch() {
    const location = useLocation()
    console.log(location, location.movie)
    return (
        <div className='watch'>
            <Link to='/' className='link'>
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video
                autoPlay = {true}
                progress
                controls
                src = {location.movie}
            />
        </div>
    )
}
