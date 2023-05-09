import React from 'react';
import { useState, useEffect } from 'react';
import { axiosJWT } from '../../../helper';
import { Link } from 'react-router-dom';
import './searchItem.css';



const SearchItem = ({cont_id}) => {
    const [content, setContent] = useState(null)
    
    useEffect(async () => {
        const res = await axiosJWT(`http://localhost:5000/api/content/content_detail/${cont_id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        setContent(res.data)
    }, [])
    
    console.log("the content is", content)
    return (
        <div className='search_card'>
            {content && 
                <Link className='link' to={{ pathname: '/watch', movie: content[3].vedio_url2 }}>
                    <div className='search_content'>
                        <img src={content[3].image_url1}></img>
                        <div className='search_cont_info'>
                            <p>{content[0].cont_title}</p>
                            <p>{content[0].cont_desc}</p>
                            <p>{content[0].genre}</p>
                            <p>{content[0].age_limit}</p>
                        </div>
                    </div>
                </Link>
            }
        </div>
           
    )
}
export default SearchItem