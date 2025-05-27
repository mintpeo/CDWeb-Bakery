import React, { useState } from 'react';
import './leftPage.scss';
import { BaseUrl } from '../service/BaseUrl';

const LeftPage = ({ userInfo, onToggle }) => {
    const API = BaseUrl;
    const [activeTab, setActiveTab] = useState(1);

    const handleClick = (e) => {
        onToggle(e);
        setActiveTab(e);
    };

    return (
        <div className="sidebar">
            <div className="user-header" onClick={() => {
                handleClick(1);
            }}>
                <div className="avatar">
                    {userInfo.avatar ? (
                        <img src={`${API}/images/avatarImgs/${userInfo.avatar.image}`} alt="avatar" />
                    ) : (
                        <div className="avatar-placeholder"></div>
                    )}
                </div>
                <div>
                    <strong>{userInfo.userName}</strong>
                    <p>Sửa Hồ Sơ</p>
                </div>
            </div>
            <ul className="menu">
                <li
                    className={activeTab === 1 ? "active" : ""}
                    onClick={() => {
                        handleClick(1);
                    }}
                >
                    Hồ Sơ
                </li>

                <li
                    className={activeTab === 2 ? "active" : ""}
                    onClick={() => {
                        handleClick(2);
                    }}
                >
                    Đơn mua
                </li>

                <li
                    className={activeTab === 3 ? "active" : ""}
                    onClick={() => {
                        handleClick(3);
                    }}
                >
                    Địa Chỉ
                </li>

                <li
                    className={activeTab === 4 ? "active" : ""}
                    onClick={() => {
                        handleClick(4);
                    }}
                >
                    Ngân hàng
                </li>

                <li
                    className={activeTab === 5 ? "active" : ""}
                    onClick={() => {
                        handleClick(5);
                    }}
                >
                    Đổi Mật Khẩu
                </li>

                <li
                    className={activeTab === 6 ? "active" : ""}
                    onClick={() => {
                        handleClick(6);
                    }}
                >
                    Thông Báo
                </li>

                <li
                    className={activeTab === 7 ? "active" : ""}
                    onClick={() => {
                        handleClick(7);
                    }}
                >
                    Thiết Lập Riêng Tư
                </li>
            </ul>
        </div>
    )
}

export default LeftPage