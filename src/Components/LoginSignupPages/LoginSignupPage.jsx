import React, { useEffect, useState } from 'react'
import './loginSignupPage.scss'

import LeftPage from './LeftPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const LoginSignupPage = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
                navigate("/");
                // alert("Đăng nhập thành công");
            }, 2000);
        };
    }, [loading]);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            {loading && <Loading />}
            <div className="Page flex">
                <div className="container flex">
                    <LeftPage onToggle={toggleForm} isLogin={isLogin} />
                    <div className='formDiv flex'>
                        {isLogin ? <Login setLoading={setLoading} /> : <Signup />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignupPage