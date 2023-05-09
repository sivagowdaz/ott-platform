import React from 'react';
import { useState, useEffect } from 'react';
import Spinner from '../../components/spinner/Spinner';
import { axiosJWT } from '../../helper';
import "./createContent.css";


const CreateContent = () => {
    const [content, setContent] = useState({})
    const [cast, setCast] = useState({})
    const [crew, setCrew] = useState({})
    const [mediaFiles, setMediaFiles] = useState({})
    const [creating, setCreating] = useState(false)
    
    const handleContentChange = (e) => {
        e.preventDefault()
        setContent({...content, [e.target.name]:e.target.value})
    }

    const handleCastChange = (e) => {
        e.preventDefault()
        setCast({...cast, [e.target.name]:e.target.value})
    }

    const handleCrewChange = (e) => {
        e.preventDefault()
        setCrew({...crew, [e.target.name]:e.target.value})
    }

    const hadleMediaFileChange = (e) => {
        e.preventDefault()
        setMediaFiles({...mediaFiles, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        setCreating(true)
        e.preventDefault()
        let res = await axiosJWT.post('http://localhost:5000/api/content/create', content, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        console.log(res)
        let cont_id = res.data.cont_id
        
        let resc = await axiosJWT.post('http://localhost:5000/api/content/add_cast/' + cont_id, cast, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
       

        let rescr = await axiosJWT.post('http://localhost:5000/api/content/add_crew/' + cont_id, crew, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })

        let resme = await axiosJWT.post('http://localhost:5000/api/content/add_mediafiles/' + cont_id, mediaFiles, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        setCreating(false)

    }

    return (
        <div className='create_content'>
            <div className='data_container'>
                <h2 className='form_title'>Content</h2>
                <div className='form_container'>
                    <input type='text' placeholder='category id' name='cat_id' onChange={(e) => handleContentChange(e)} />
                    <input type='text' placeholder='content title' name='cont_title' onChange={(e) => handleContentChange(e)} />
                    <input type='text' placeholder='content desc' name='cont_desc' onChange={(e) => handleContentChange(e)} />
                    <input type='text' placeholder='genre' name='genre' onChange={(e) => handleContentChange(e)} />
                    <input type='time' placeholder='duration' name='duration' onChange={(e) => handleContentChange(e)} />
                    <input type='number' placeholder='age limit' name='age_limit' onChange={(e) => handleContentChange(e)} />
                    <input type='text' placeholder='ratting' name='ratting' onChange={(e) => handleContentChange(e)} />
                    <input type='date' placeholder='release time' name='release_time' onChange={(e) => handleContentChange(e)} />
                </div>
            </div>
            <div className='data_container'>
                <h2 className='form_title'>Cast</h2>
                <div className='form_container'>
                    <input type='text' placeholder='character 1' name='char1' onChange={(e) => handleCastChange(e)} />
                    <input type='text' placeholder='character 2' name='char2' onChange={(e) => handleCastChange(e)} />
                    <input type='text' placeholder='character 3' name='char3' onChange={(e) => handleCastChange(e)} />
                    <input type='text' placeholder='character 4' name='char4' onChange={(e) => handleCastChange(e)} />
                    <input type='text' placeholder='character 5' name='char5' onChange={(e) => handleCastChange(e)} />
                </div>
            </div>
            <div className='data_container'>
                <h2 className='form_title'>Crew</h2>
                <div className='form_container'>
                    <input type='text' placeholder='director' name='director' onChange={(e) => handleCrewChange(e)} />
                    <input type='text' placeholder='producer' name='producer' onChange={(e) => handleCrewChange(e)} />
                    <input type='text' placeholder='music director' name='music_dir' onChange={(e) => handleCrewChange(e)} />
                    <input type='text' placeholder='DOP' name='DOP' onChange={(e) => handleCrewChange(e)} />
                    <input type='text' placeholder='camera man' name='camera_man' onChange={(e) => handleCrewChange(e)} />
                </div>
            </div>
            <div className='data_container'>
                <h2 className='form_title'>Media Files</h2>
                <div className='form_container'>
                    <input type='text' placeholder='image url 1' name='image_url1' onChange={(e) => hadleMediaFileChange(e)} />
                    <input type='text' placeholder='image url 2' name='image_url2' onChange={(e) => hadleMediaFileChange(e)} />
                    <input type='text' placeholder='vedio url' name='vedio_url2' onChange={(e) => hadleMediaFileChange(e)} />
                </div> 
            </div>
            <div className='button_container'> 
                {!creating ? <button className='content_create_button' onClick={(e) => handleSubmit(e)}>Create</button>
                    :
                    <Spinner color='blue' text='creating...' />
                }
                
            </div>
        </div>
    )
}

export default CreateContent;