import React, { useEffect, useState } from 'react';
import './userPage.scss';
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import LeftPage from './LeftPage';
import InfoPage from './InfoPage';
import PurchasePage from '../Purchase/PurchasePage';
import AddressPage from '../Address/AddressPage';
import BankCardPage from '../BankCard/BankCardPage';
import ChangePassPage from './ChangePassPage';
import NotifiPage from './NotifiPage';
import PriSettingPage from './PriSettingPage';

import { useAuth } from '../service/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../service/BaseUrl';

const UserPage = () => {
    const API = BaseUrl;
    const { idLogged, isLoggedIn } = useAuth();

    const [userInfo, setUserInfo] = useState("");
    const [btnClick, setBtnClick] = useState(1);
    const navigate = useNavigate();

    // load user info
    const loadInfoUser = async () => {
        try {
            const response = await axios.get(`${API}/users/info?id=${idLogged}`);
            setUserInfo(response.data);
        } catch (error) {
            console.error("User not found: ", error);
        }
    };

    useEffect(() => {
        loadInfoUser();
    }, [idLogged]);

    const toggleForm = (e) => {
        setBtnClick(e);
    };

    const Page = () => {
        switch (btnClick) {
            case 1: return <InfoPage idLogged={idLogged} userInfo={userInfo} setUserInfo={setUserInfo} loadInfoUser={loadInfoUser} />;
            case 2: return <PurchasePage />;
            case 3: return <AddressPage idLogged={idLogged} />;
            case 4: return <BankCardPage />
            case 5: return <ChangePassPage idLogged={idLogged} userInfo={userInfo} />;
            case 6: return <NotifiPage />;
            case 7: return <PriSettingPage />;
            default: return;
        }
    };

    return (
        <div>
            {!isLoggedIn ? (navigate("/loginSignupPage")) : (
                <>
                    <Navbar />
                    <div className="info-page">
                        <div className="info-container">
                            <LeftPage userInfo={userInfo} onToggle={toggleForm} />
                            <div className="form-area">
                                {Page()}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default UserPage