import React, { useEffect, useState } from 'react'
import './navbar.scss'
import axios from "axios";

//import icons
import { SiCakephp } from "react-icons/si";
import { IoMdCloseCircle } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import { FaCartShopping } from "react-icons/fa6";
import user from "../../Assets/user.png";

import { Link } from "react-router-dom"

// import Call APIs
import { useAuth } from "../service/AuthProvider";
import { useUserInfo } from '../service/UserInfoProvider';
import { useCart } from '../service/CartProvider';
import { BaseUrl } from '../service/BaseUrl';

const Navbar = () => {
    const API = BaseUrl;
    const { isLoggedIn, logout } = useAuth();
    const { userInfo } = useUserInfo();
    const { cartCount, setCartCount } = useCart();

    const [active, setActive] = useState('navBar');

    // Fuction to toggle navBar
    const showNav = () => {
        setActive('navBar activeNavbar')
    }

    // Fuction to remove navBar
    const removeNavbar = () => {
        setActive('navBar')
    }

    const setLogOut = () => {
        logout();
    }

    // ấn vào menu cart
    const handleOpenCart = () => {
        setCartCount(0);
    };

    return (
        <section className='navBarSection'>
            <header className='header flex'>

                <div className="logoDiv">
                    <a href="#" className="logo flex">
                        <Link to={"/"}>
                            <h1><SiCakephp className="icon" /> Cake</h1>
                        </Link>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <Link to={"/"}>
                                <a className="navLink">Trang chủ</a>
                            </Link>
                        </li>

                        <li className="navItem">
                            <Link to={"/menu"}>
                                <a className="navLink">Menu</a>
                            </Link>
                        </li>

                        <li className="navItem">
                            <Link to={"/about"}>
                                <a className="navLink">Liên hệ</a>
                            </Link>
                        </li>

                        <li className="navItem">
                            <Link to={"/addselector"}>
                                <a className="navLink">Tin tức</a>
                            </Link>
                        </li>

                        <li className="navItem">
                            <Link to={"/cart"} onClick={handleOpenCart}>
                                <a className="navLink">
                                    <FaCartShopping className='iconItem' />
                                    Giỏ hàng
                                    {!isLoggedIn ? setCartCount(0) : (
                                        cartCount === 0 ? "" : (<span className="cart-badge">{cartCount}</span>)
                                    )}
                                </a>
                            </Link>
                        </li>

                        <div className='showsubnav'>
                            {!isLoggedIn ? (
                                <Link to={"/LoginSignupPage"}>
                                    <button className="btn">
                                        <a>ĐĂNG NHẬP</a>
                                    </button>
                                </Link>
                            ) : (
                                <div className="btnUser">
                                    {userInfo.avatar ? (
                                        <img src={`${API}/images/avatarImgs/${userInfo.avatar.image}`} alt="avatar" />
                                    ) : (
                                        <img src={user} />
                                    )}

                                    <ul className="subnav">
                                        <li className='menuItem'>
                                            <Link to={"/user"}><a>Thông tin</a></Link>
                                        </li>
                                        <li className='menuItem'><a>Cart</a></li>
                                        <li className='menuItem'><a onClick={setLogOut}>Đăng xuất</a></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </ul>

                    <div onClick={removeNavbar} className="closeNavbar">
                        <IoMdCloseCircle className="icon" />
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <PiDotsNineBold className='icon' />
                </div>
            </header>
        </section>
    )
}

export default Navbar