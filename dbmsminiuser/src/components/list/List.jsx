import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import React from 'react'
import {Link} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { axiosJWT } from '../../helper'
import ListItem from '../listitem/ListItem'
import './list.scss'

export default function List({ list, index}) {
    const listRef = useRef()
    const [listNumber, setListNumber] = useState(0)
    const [moved, setMoved] = useState(false)
    const [current_content, setCurrentContent] = useState(null)

    // const [isHovered, setIsHovered] = useState(false)
    // const [listItem, setListItem] = useState({})

    useEffect(async() => {
        const res1 = await axiosJWT(`http://localhost:5000/api/content/content_detail/${list.cont_id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        console.log("from the list", res1.data)
        setCurrentContent(res1.data)
    }, [])

    console.log("the data is", list, current_content)
    
    
    
    return (
        <div className='list'>
            {current_content && 
                <Link to={{ pathname: '/watch', movie: current_content[3].vedio_url2}} className='link'>
                    <div className='content_box'>
                        <img className='content_image' src={current_content[3].image_url1} />
                        <p className='content_title'>{list.cont_title}</p>
                    </div>
                </Link>
            }
        </div>
    )
}
