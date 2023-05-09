import React from 'react'
import { useState, useEffect } from 'react';
import './movie.css'
import { CastRounded, CloudUpload } from '@material-ui/icons'
import { Link, useLocation, useParams } from 'react-router-dom'
import { axiosJWT } from '../../helper';
import Video from '../../components/video/Video';
import { Redirect } from 'react-router-dom'
import { ClipLoader } from "react-spinners"
import { css } from "@emotion/react";
import { getMovies, createMovie, deleteMovie } from '../../context/moviecontext/apiCalls';
import Spinner from '../../components/spinner/Spinner';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
  font-weight: 20px;
`;

export default function Content() {
    console.log("inside the content component")
    // const location = useLocation()
    // const movie = location.movie
    const {cont_id} = useParams()
    
    const [currentContent, setCurrentContent] = useState()
    
    const [content, setContent] = useState({})
    const [crew, setCrew] = useState({})
    const [cast, setCast] = useState({})
    const [mediaFiles, setMediaFiles] = useState({})

    const [uploading, setUploading] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(async () => {
        let res = await axiosJWT.get("http://localhost:5000/api/content/content_detail/" + cont_id, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        console.log("the data is", res.data)
        setCurrentContent(res.data)
        setContent(res.data[0])
        setCast(res.data[1])
        setCrew(res.data[2])
        setMediaFiles(res.data[3])
    }, [reload])

    
    const handleContentChange = (e) => {
        e.preventDefault()
        setContent({...content, [e.target.name]:e.target.value})
    }

    const handleCastChange = (e) => {
        e.preventDefault()
        setCast({ ...cast, [e.target.name]: e.target.value })
    }
    
    const handleCrewChange = (e) => {
        e.preventDefault()
        setCrew({ ...crew, [e.target.name]: e.target.value })
    }

    const handleMediaFilesChange = (e) => {
        e.preventDefault()
        setMediaFiles({ ...mediaFiles, [e.target.name]: e.target.value })
    }

    const contentUpdate = async (e) => {
        setUploading(true)
        e.preventDefault()
        let content_data = {
            cat_id: content.cat_id,
            cont_title: content.cont_title,
            cont_desc: content.cont_desc,
            genre: content.genre,
            duration: content.duration,
            age_limit: content.age_limit,
            ratting: content.ratting,
            release_time: content.release_time
        }
        let res = await axiosJWT.put('http://localhost:5000/api/content/update_content/' + cont_id, content_data, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        }
        )

        let cast_data = {
            charectore1: cast.charectore1,
            charectore2: cast.charectore2,
            charectore3: cast.charectore3,
            charectore4: cast.charectore4,
            charectore5: cast.charectore5
        }
        let resc = await axiosJWT.put('http://localhost:5000/api/content/update_cast/' + cont_id, cast_data,{
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        console.log(resc.data)
        

        let crew_data = {
            director: crew.director,
            producer: crew.producer,
            music_dir: crew.music_dir,
            DOP: crew.dop,
            camera_man: crew.camera_man
        }
        let rescr = await axiosJWT.put('http://localhost:5000/api/content/update_crew/' + cont_id, crew_data, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        console.log(rescr.data)


        let media_files_data = {
            image_url1: mediaFiles.image_url1,
            image_url2: mediaFiles.image_url2,
            vedio_url2: mediaFiles.vedio_url2,
        }
        let resmd = await axiosJWT.put('http://localhost:5000/api/content/update_mediafiles/' + cont_id, media_files_data, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        setUploading(false)
        setReload(!reload)
    }

    console.log("the video url is", mediaFiles.vedio_url2)
    
    return (
        <div className='product'>
            <div className="data_container">
                <h2 className='form_title'>Content Detail</h2>
                <div className='form_container'>
                    <div className='input_box_container'>
                        <label>title</label>
                        <input type='text' onChange={(e) => handleContentChange(e)} value={content.cont_title || ""} name='cont_title' />
                    </div>
                    <div className='input_box_container'>
                        <label>description</label>
                        <input type='text' onChange={(e) => handleContentChange(e)} value={content.cont_desc || ""} name='cont_desc' />
                    </div>
                    <div className='input_box_container'>
                        <label>category id</label>
                        <input type='text' onChange={(e) => handleContentChange(e)} value={content.cat_id || ""} name='cat_id' />
                    </div>
                    <div className='input_box_container'>
                        <label>duration</label>
                        <input type='time' onChange={(e) => handleContentChange(e)} value={content.duration || ""} name='duration' />
                    </div>
                    <div className='input_box_container'>
                        <label>genre</label>
                        <input type='text' onChange={(e) => handleContentChange(e)} value={content.genre || ""} name='genre' />
                    </div>
                    <div className='input_box_container'>
                        <label>ratting</label>
                        <input type='text' onChange={(e) => handleContentChange(e)} value={content.ratting || ""} name='ratting' />
                    </div>
                    <div className='input_box_container'>
                        <label>release time</label>
                        <input type='date' onChange={(e) => handleContentChange(e)} value={content.release_time || ""} name='release_time' />
                    </div>
                    <div className='input_box_container'>
                        <label>age limit</label>
                        <input type='number' onChange={(e) => handleContentChange(e)} value={content.age_limit || ""} name='age_limit' />
                    </div>
                </div>
            </div>
            <div className="data_container">
                <h2 className='form_title'>Casting Detail</h2>
                <div className='form_container'>
                    <div className='input_box_container'>
                        <label>character1</label>
                        <input type='text' name='charectore1' onChange={(e) => handleCastChange(e)} value={cast.charectore1 || ""} />
                    </div>
                    <div className='input_box_container'>
                        <label>character2</label>
                        <input type='text' name='charectore2' onChange={(e) => handleCastChange(e)} value={cast.charectore2 || ""} />
                    </div>
                    <div className='input_box_container'>
                        <label>character3</label>
                        <input type='text' name='charectore3' onChange={(e) => handleCastChange(e)} value={cast.charectore3 || ""} />
                    </div>
                    <div className='input_box_container'>
                        <label>character4</label>
                        <input type='text' name='charectore4' onChange={(e) => handleCastChange(e)} value={cast.charectore4 || ""} />
                    </div>
                    <div className='input_box_container'>
                        <label>character5</label>
                        <input type='text' name='charectore5' onChange={(e) => handleCastChange(e)} value={cast.charectore5 || ""} />
                    </div>
                </div>
            </div>
            <div className='data_container'>
                <h2 className='form_title'>Crew Detail</h2>
                <div className='form_container'>
                    <div className='input_box_container'>
                        <label>director</label>
                        <input type='text' name='director' onChange={(e) => handleCrewChange(e)} value={crew.director || ""} />
                    </div>
                    <div className='input_box_container'>
                        <label>producer</label>
                        <input type='text' name='producer' onChange={(e) => handleCrewChange(e)} value={crew.producer || ""} />
                    </div>
                    <div className='input_box_container'>
                        <label>music director</label>
                        <input type='text' name='music_dir' onChange={(e) => handleCrewChange(e)} value={crew.music_dir || ""} />
                    </div>
                    <div className='input_box_container'>
                        <label>DOP</label>
                        <input type='text' name='dop' onChange={(e) => handleCrewChange(e)} value={crew.dop || ""} />
                    </div>
                    <div className='input_box_container'>
                        <label>camera man</label>
                        <input type='text' name='camera_man' onChange={(e) => handleCrewChange(e)} value={crew.camera_man || ""} />
                    </div>   
                </div>
            </div>
            <div className='data_container'>
                <h2 className='form_title'>Media Files Detail</h2>
                <div className="form_container">
                    <div className='input_box_container'>
                        <img src={mediaFiles.image_url1 || '#'} alt='image' />
                        <label>image url1</label>
                        <input type='text' name='image_url1' onChange={(e) => handleMediaFilesChange(e)} value={mediaFiles.image_url1 || ""} />
                    </div>  
                    <div className='input_box_container'>
                        <img src={mediaFiles.image_url2 || '#'} alt='image'/>
                        <label>image url2</label>
                        <input type='text' name='image_url2' onChange={(e) => handleMediaFilesChange(e)} value={mediaFiles.image_url2 || ""} />
                    </div>  
                    <div className='input_box_container'>
                        {mediaFiles.vedio_url2 && 
                            <video  width='295px' controls>
                                <source src={mediaFiles.vedio_url2} />
                            </video>}
                        <label>vedio url</label>
                        <input type='text' name='vedio_url2' onChange={(e) => handleMediaFilesChange(e)} value={mediaFiles.vedio_url2 || ""} />
                    </div>
                </div>
            </div>
            {uploading ? <Spinner color='blue' text='uploading..'/>
                :
                <button type='submit' className='content_create_button' onClick={(e) => contentUpdate(e)}>update</button>
            }
            
            
            
        </div>
    )
}
