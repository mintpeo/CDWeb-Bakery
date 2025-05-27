import React, { useEffect } from 'react'
import './footer.scss'

import img from '../../Assets/imageFooter.jpg'

//import icons
import { SiCakephp } from "react-icons/si";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { SlSocialGoogle } from "react-icons/sl";

import Aos from 'aos'
import 'aos/dist/aos.css'

const Footer = () => {
    //scroll animation
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <section className="footer">
            <div className="videoDiv">
                {/* autoplay */}
                <img src={img} ></img>
            </div>

            <div className="secContent container">
                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="#" className="logo flex">
                                <SiCakephp className="icon" /> Cake
                            </a>
                        </div>

                        <div className="footerParagraph">
                            Công ty TNHH Cake
                        </div>

                        <div className="footerParagraph">
                            2A Ba Gia, Phường 7, quận Tân Bình, Thành phố Hồ Chí Minh
                        </div>

                        <div className="footerParagraph">
                            Số điện thoại: 028.8888.3388
                        </div>

                        <div className="footerSocials flex">
                            <LuFacebook className='icon' />
                            <FaInstagram className='icon' />
                            <SlSocialGoogle className='icon' />
                        </div>
                    </div>

                    <div className="footerLinks grid">
                        {/* Group One */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                CHÍNH SÁCH
                            </span>
                            <li className="footerList flex">
                                {/* <FaAngleRight className='icon' /> */}
                                CHÍNH SÁCH GIAO HÀNG
                            </li>

                            <li className="footerList flex">
                                {/* <FaAngleRight className='icon' /> */}
                                CHÍNH SÁCH TRẢ HÀNG - HOÀN TIỀN
                            </li>
                        </div>

                        {/* Group Two */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                THANH TOÁN
                            </span>

                            <li className="footerList flex">
                                PHƯƠNG THỨC THANH TOÁN
                            </li>

                            <li className="footerList flex">
                                ĐIỀU KHOẢN & ĐIỀU KIỆN THANH TOÁN
                            </li>
                        </div>

                        {/* Group Three */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                THÔNG TIN
                            </span>

                            <li className="footerList flex">
                                BẢO VỆ THÔNG TIN NGƯỜI DÙNG
                            </li>

                            <li className="footerList flex">
                                THÔNG TIN LIÊN HỆ
                            </li>
                        </div>
                    </div>

                    <div className="footerDiv flex">
                        <small>TIỆM BÁNH KEM CHẤT LƯỢNG NHẤT VIỆT NAM</small>
                        <small>@2025 CAKE</small>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer