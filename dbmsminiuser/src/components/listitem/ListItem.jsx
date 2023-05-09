import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import React from 'react'
import { useState, useEffect} from 'react'
import './listitem.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false)
    const [listItem, setListItem] = useState({})
     
    
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmVkNGY4NjNkMzVjNTg1YmNhN2Q3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTk3MDIzNywiZXhwIjoxNjM2NDAyMjM3fQ.gkItgbaZb6MeF_sYrU3Q_NWBBNryOw5nNKAtYJGyEcg'
    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await axios.get('movies/find/' + item, {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                })
                console.log('the list item  is', res.data)
                setListItem(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getItem()
        
    }, [item])
   
    return (
        <Link to={{ pathname: '/watch', movie: listItem.video }}>
        <div className='listItem' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            style={{ left: isHovered && `${index * 225 + index * 2.5}px` }}>
            <img src={listItem.img} alt="" />
                <div className="item-info">
                {isHovered && (
                <>
                    <video src={listItem.video} autoPlay='true' loop></video>
                    <div className="listInfo">
                        <div className="icons">
                            <PlayArrow className='icon' />
                            <Add className='icon' />
                            <ThumbUpAltOutlined className='icon' />
                            <ThumbDownAltOutlined className='icon' />
                        </div>
                        <div className="itemInfoTop">
                            <span>{listItem.duration}</span>
                            <span className={listItem.limit}>18+</span>
                            <span>{listItem.year}</span>
                        </div>
                        <div className="desc">
                            {listItem.desc}
                        </div>
                        <div className="genre">{listItem.genre}</div>
                    </div>
                </>
            )}
                    
              </div>
            
        </div>
    </Link>
      
    )    
}
