import { LineStyle, Timeline, AddCircleOutline, HomeIcon, ListIcon, Home, List } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sedebarMenu">
                    <h3 className = 'sidebarTitle'>Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to='/' className='link'>
                            <li className="sidebarListItem active">
                                <Home className='sidebarIcon' />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sedebarMenu">
                    <h3 className = 'sidebarTitle'>Users</h3>
                    <ul className="sidebarList">
                        <Link to='/createuser' className='link'>
                            <li className="sidebarListItem active">
                                <AddCircleOutline className='sidebarIcon' />
                                Add User
                            </li>
                        </Link>
                        <Link to='/userlist' className='link'>
                            <li className="sidebarListItem">
                                <List className='sidebarIcon' />
                                Users List
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sedebarMenu">
                    <h3 className='sidebarTitle'>Movies</h3>
                    <ul className="sidebarList">
                        <Link to='/createcontent' className='link'>
                            <li className="sidebarListItem active">
                                <AddCircleOutline className='sidebarIcon' />
                                Add Movie
                            </li>
                        </Link>
                        <Link to='/movielist' className='link'>
                            <li className="sidebarListItem">
                                <List className='sidebarIcon' />
                                Movie List
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sedebarMenu">
                    <h3 className='sidebarTitle'>Series</h3>
                    <ul className="sidebarList">
                        <Link to='/createcontent' className='link'>
                            <li className="sidebarListItem active">
                                <AddCircleOutline className='sidebarIcon' />
                                Add Series
                            </li>
                        </Link>
                        <Link to='/serieslist' className='link'>
                            <li className="sidebarListItem">
                                <List className='sidebarIcon' />
                                Series List
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sedebarMenu">
                    <h3 className='sidebarTitle'>Serial</h3>
                    <ul className="sidebarList">
                        <Link to='/createcontent' className='link'>
                            <li className="sidebarListItem active">
                                <AddCircleOutline className='sidebarIcon' />
                                Add Serial
                            </li>
                        </Link>
                        <Link to='/seriallist' className='link'>
                            <li className="sidebarListItem">
                                <List className='sidebarIcon' />
                                Serial List
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
