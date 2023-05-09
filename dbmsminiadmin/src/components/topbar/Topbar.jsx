import { Language, NotificationsNone, Settings } from '@material-ui/icons'
import React from 'react'
import './topbar.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/authcontext/AuthContext';





function Topbar() {
    const { dispatch } = useContext(AuthContext)

    const handleLogout = (e) => {
        dispatch({
            type: 'LOGOUT'
        })
    }
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">
                        SSAdmin
                    </span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="notificationBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="notificationBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <img src="https://tse1.mm.bing.net/th?id=OIP.BjyCN8dMgoKSQInuDvDJnQHaG5&pid=Api&P=0&w=168&h=157" alt="" className='imageAvatar' />
                    <p onClick={(e) => handleLogout(e)}>logout</p>
                </div>
            </div>
        </div>
    )
}

export default Topbar
