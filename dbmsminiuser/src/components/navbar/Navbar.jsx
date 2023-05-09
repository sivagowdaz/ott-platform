import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import React from 'react'
import {useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../../authcontext/AuthActions';
import { AuthContext } from '../../authcontext/AuthContext'
import './navbar.scss';


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { dispatch } = useContext(AuthContext)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => window.onscroll = null
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <div className={isScrolled?'navbar scrolled':'navbar'}>
            <div className="container">
                <div className="left">
                    <p className='website_title'>Movies Today</p>
                    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="netflix-logo" /> */}
                    <Link to='/' className='link'>
                        <span>Homepage</span>
                    </Link>
                    <Link to='/movies' className='link'>
                        <span>Movies</span>
                    </Link>
                    <Link to='/series' className='link'>
                        <span>Series</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Link to='/search' className='link'>
                        <Search className='icon' />
                    </Link>
                    <span>KID</span>
                    <Notifications className='icon' />
                    <img src="https://tse1.mm.bing.net/th?id=OIP.CAEe_CkDUJA2c4z3IAv0YwHaDt&pid=Api&P=0&w=323&h=162" alt="" />
                    <div className="profile">
                        <ArrowDropDown className='icon' />
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={(e) => (handleClick(e))}>Logout</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar
