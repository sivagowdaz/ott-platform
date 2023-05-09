import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './user.css';
import { useParams } from 'react-router-dom';
import { axiosJWT } from '../../helper';
import {PermIdentity, CalendarToday, PhoneAndroid, MailOutline, LocationSearching, CloudUpload } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';

const User = () => {
    console.log('inside the user component')
    const { email } = useParams()
    const [profile, setProfile] = useState()
    const [updating, setUpdating] = useState(false)
    const [reload,setReload] = useState(false)
    
    const [currentUser, setCurrentUser] = useState(null)


    const  handleChange = (e) => {
        e.preventDefault()
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }


    const handleClick = async (e) => {
        setUpdating(true)
        e.preventDefault()
        let newProfile = { ...profile, user_email: email }
        console.log(newProfile)
        console.log('beeeellow setupdating')
        let res = await axiosJWT.put('http://localhost:5000/api/auth/update_user', newProfile, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
        setUpdating(false)
        setReload(!reload)
    }

    useEffect(() => {
        console.log("inside the useeffect component")
        const getCurrentUser = async () => {
            let res = await axiosJWT.get('http://localhost:5000/api/auth/get_single_user/' + email, {
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
                }
            })
            setCurrentUser(res.data)
        }
        getCurrentUser()
    }, [reload])
    
    console.log('CURRENT USER', currentUser);
    return (
        <div className='user'>
            {currentUser &&
                <div>
                    <div className="userHead">
                        <h2>Edit User</h2>
                        <Link to='/createuser'>
                            <button className="userCreateButton">Create</button>
                        </Link>
                    </div>
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img
                                    src={currentUser && currentUser[1].image_url || '#'}
                                    alt=""
                                    className="userShowImg"
                                />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">{currentUser[0].username}</span>
                                    <span className="userShowUserTitle">Software Engineer</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Account Details</span>
                                <div className="userShowInfo">
                                    <PermIdentity className="userShowIcon" />
                                    <span className="userShowInfoTitle">{currentUser[0].username}</span>
                                </div>
                                <div className="userShowInfo">
                                    <CalendarToday className="userShowIcon" />
                                    <span className="userShowInfoTitle">10.12.1999</span>
                                </div>
                                <span className="userShowTitle">Contact Details</span>
                                <div className="userShowInfo">
                                    <PhoneAndroid className="userShowIcon" />
                                    <span className="userShowInfoTitle">+1 123 456 67</span>
                                </div>
                                <div className="userShowInfo">
                                    <MailOutline className="userShowIcon" />
                                    <span className="userShowInfoTitle">{currentUser[0].email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <LocationSearching className="userShowIcon" />
                                    <span className="userShowInfoTitle">New York | USA</span>
                                </div>
                            </div>
                        </div>


                        <div className="userUpdate">
                            <span className="userUpdateTitle">Edit</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>First name</label>
                                        <input type="text"
                                            placeholder={currentUser[1].first_name || "first name"}
                                            className='userUpdateInput'
                                            name="first_name"
                                            onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Middle name</label>
                                        <input type="text"
                                            placeholder={currentUser[1].middle_name || "middle name"}
                                            className='userUpdateInput'
                                            name="middle_name"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Last name</label>
                                        <input type="text"
                                            placeholder={currentUser[1].lastname || "last name"}
                                            className='userUpdateInput'
                                            name="last_name"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Phone</label>
                                        <input type="text"
                                            placeholder='+1 123 456 67'
                                            className='userUpdateInput'
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>About</label>
                                        <input type="text"
                                            placeholder={currentUser[1].about || 'about'}
                                            className='userUpdateInput'
                                            name="about"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Image url</label>
                                        <input type="text"
                                            placeholder={currentUser[1].image_url || 'image url'}
                                            className='userUpdateInput'
                                            name="image_url"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                </div>
                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img src={currentUser[1].image_url || '#'} alt="" className="userUpdateImage" />
                                        <label htmlFor="file"><CloudUpload className='userUpdateIcon' /></label>
                                        <input type="file" id='file' style={{ display: 'none' }} />
                                    </div>
                                    {updating ? <Spinner color='blue' text='updating' />
                                        :
                                        <button className="UserUpdateButton" onClick={(e) => handleClick(e)}>Update</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}

        </div>
    
        

    )
}

export default User