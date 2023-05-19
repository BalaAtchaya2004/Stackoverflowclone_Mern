import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";

import decode from "jwt-decode";

import menu from '../../assets/menu.svg'
import Avatar from '../Avatar/Avatar';

import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg' 

import './Navbar.css'

function Navbar() {
    
    const [profileDropdown, setProfileDropdown] = useState(false);
    const dispatch = useDispatch();
    var User = useSelector((state) => (state.currentUserReducer));
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        dispatch(setCurrentUser(null));
        setProfileDropdown(!profileDropdown);
    }

    const toggleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
    }

    useEffect(() => {
        const token = User?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                const handleLogOut = () => {
                    dispatch({ type: "LOGOUT" });
                    navigate("/");
                    dispatch(setCurrentUser(null));
                }
                handleLogOut();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    },[dispatch, navigate, User?.token]);

    const handleplan = () => {
        dispatch({ type: 'LOGOUT'});
        window.location.href= 'https://payment-gateway-xi.vercel.app'
        dispatch(setCurrentUser(null))
      }
    const plan = () => {
        dispatch({ type: 'LOGOUT'});
        window.location.href='https://payment-gateway-xi.vercel.app'
        dispatch(setCurrentUser(null))
      }
      const chatbot = () => {
        dispatch({ type: 'LOGOUT'});
        window.location.href='https://chatbot-frontend-lyqv.onrender.com'
        dispatch(setCurrentUser(null))
      }
       const handlechatbot = () => {
        dispatch({ type: 'LOGOUT'});
        window.location.href='https://chatbot-frontend-lyqv.onrender.com'
        dispatch(setCurrentUser(null))
      }
    return (
        <nav className="main-nav">
            <div className="navbar">
                <ul className="menu">
                    <li>
                        <img src={menu} height="25px"/>
                        {/* <MenuOutlinedIcon style={{ height: "40px", fontSize: "30px"}} /> */}
                        <ul className="sub-menu">
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/">Home</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/Questions">Questions</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/Tags">Tags</Link></li>
                            <li><Link style={{ textDecoration: "none", color: "black" }} to="/Users">Users</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/Plan"  onClick={handleplan}>Plans</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/CommunityHome">Community</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/Chatbot"  onClick={handlechatbot}>Chatbot</Link></li>
                        </ul>
                    </li>
                </ul>
                <Link to="/" className="nav-item nav-logo">
                    <img src={logo} alt="logo" height="25"/>
                </Link>
                <Link to="/Chatbot" className="nav-item nav-btn" onClick={chatbot}>Chatbot</Link>
                <Link to="/Plan" className="nav-item nav-btn" onClick={plan}>Plans</Link>
                <Link to="/CommunityHome" className="nav-item nav-btn">Community</Link>
                <form>
                    <input type="text" placeholder="Search..."/>
                    <img className="search-icon" src={search} alt="search" height="18" />
                </form>
                <div className="nav-right">
                    {profileDropdown && (
                        <div className="nav-right-modelbox">
                        <Link
                            to={`/Users/${User?.result?._id}`}
                            style={{ color: "black", textDecoration: "none" }}
                        >
                            <div onClick={() => setProfileDropdown(false)}>
                                    <span>Profile</span>
                                    {/* <AccountCircleOutlinedIcon /> */}
                            </div>
                        </Link>
                        <div onClick={handleLogOut}>
                            <span>Sign Out</span>
                            {/* <LogoutOutlinedIcon /> */}
                        </div>
                        </div>
                    )}
                    {User === null ? (
                        <Link to="/Auth" className="nav-item nav-links">
                            Log in
                        </Link>
                    ) : (
                        <>
                        <Avatar fontSize="14px" backgroundColor="#009dff" px="12px" py="7px" borderRadius="50%">
                            <span onClick={toggleProfileDropdown} style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>
                                { User.result.name.charAt(0).toUpperCase() }
                            </span>
                        </Avatar>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
