import React from 'react'
import './leftPage.scss'

// import our assets
import video from '../../Assets/video.mp4'

// import icons
import { FaArrowLeft } from "react-icons/fa";

import { Link } from 'react-router-dom'

const LeftPage = ({ onToggle, isLogin }) => {
    return (
        <div className="videoDiv">
            <video src={video} muted loop autoPlay></video>

            <div className='btnBack'>
                <Link to={"/"}>
                    <button type='submit' className='btn flex'>
                        <FaArrowLeft className='icon' />
                        <span>Trang chủ</span>
                    </button>
                </Link>
            </div>

            <div className="textDiv">
                <h2 className="title">Hãy làm khách hàng thân thiết của CAKE</h2>
                <p>Để nhận được nhiều ưu đãi nhất!</p>
            </div>

            <div className="footerDiv flex">
                {isLogin ? (
                    <span className="text">Chưa có tài khoản?</span>
                ) : (
                    <span className="text">Đã có tài khoản?</span>
                )}
                <button onClick={onToggle} className="btn">{isLogin ? "Đăng kí" : "Đăng nhập"}</button>
            </div>
        </div>
    )
}

export default React.memo(LeftPage)