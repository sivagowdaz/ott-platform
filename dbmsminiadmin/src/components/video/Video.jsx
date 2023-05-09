import React from 'react';
import { useParams } from 'react-router-dom';
import './video.css'




const Video = () => {
    let {video_url} = useParams()
    console.log("the url is", video_url)
    video_url = 'https://' + video_url
    console.log(video_url)
    return (
        <>
            <video width="100%" height="100%" controls>
                <source src={video_url || '#'} type="video/mp4"/>
            </video>
        </>
    )
}

export default Video