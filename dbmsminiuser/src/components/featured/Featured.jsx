import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { axiosJWT } from '../../helper'
import './featured.css'


export default function Featured({ type, setGenre }) {
    const [content, setContent] = useState(false)
   
   
    useState(() => {
        const getContent = async () => {
            try {
                if (!type) {
                    type='movie'
                }
                const res = await axiosJWT.get(`http://localhost:5000/api/content/get_contents/?type=${type}`, {
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
                    }
                })
                let random_content_index = Math.floor(Math.random() * res.data.length);
                let random_content = res.data[random_content_index]

                const res1 = await axiosJWT(`http://localhost:5000/api/content/content_detail/${random_content.cont_id}`, {
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
                    }
                })
                setContent(res1.data)

            } catch (err) {
                console.log(err)
            }
        }
        getContent()
    }, [])
    console.log('the content is ',content)
    
    return (
        <div className='featured'>
            {
                type && (
                    <div className="category">
                        <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
                        <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                            <option>Genre</option>
                            <option>Tragidy</option>
                            <option>Adventure</option>
                            <option>Comedy</option>
                            <option>Action</option>
                            <option>Historical</option>
                            <option>Invation</option>
                            <option>Science</option>
                            <option>Adult</option>
                            <option>Drama</option>
                            <option>Love</option>
                        </select>
                    </div>
                )
            }
            {content && <div className="featured_info_container">
                <img src={content[3].image_url1} alt=''>
                </img>
                <div className="info">
                    <img src={content[3].image_url2} alt="" />
                    <span className='desc'>
                        {content[0].cont_desc}
                    </span>
                    <div className="buttons">
                        <button className="play">
                            <PlayArrow />
                            <span>Play</span>
                        </button>
                        <button className="more">
                            <InfoOutlined />
                            <span>More</span>
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}


