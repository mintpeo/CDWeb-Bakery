import React, { useEffect, useState } from 'react'
import './signup.scss'

// import icons
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { SiCakephp } from "react-icons/si";
import { IoMdMail } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// import Call APIs
import { BaseUrl } from '../service/BaseUrl'
import { useAuth } from '../service/AuthProvider'

const Signup = () => {
    const API = BaseUrl;
    const navigate = useNavigate(); // hook điều hướng
    const { setIsLoggedIn } = useAuth(); // set Login cho App
    const [error, setError] = useState(""); // error
    const [password, setPasswordValue] = useState(""); // pass value
    const [rePassword, setRePasswordValue] = useState(""); // re-pass value
    const [passwordVisible, setPasswordVisible] = useState(false); // set show pass
    const [email, setEmailValue] = useState(""); // email
    const [username, setUserNameValue] = useState(""); // user name value
    const [isValid, setIsValid] = useState(false); // set button pointer:...
    const [isCheckuser, setIsCheckUser] = useState(false);

    // get data
    const setPassword = (e) => {
        setPasswordValue(e.target.value);
    }
    const setEmail = (e) => {
        setEmailValue(e.target.value);
    }
    const setUserName = (e) => {
        setUserNameValue(e.target.value);
    }
    const setRePassword = (e) => {
        setRePasswordValue(e.target.value);
    }

    // show pass
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    // check user name
    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!username) {
                setIsValid(false);
            } else if (username !== null) {
                try {
                    const response = await axios.get(`${API}/users/check?userName=${username}`);
                    const data = response.data;
                    if (data) {
                        setError("Tên tài khoản đã có người sử dụng.");
                    } else {
                        setError("");
                        if (!email) {
                            setIsValid(false);
                        } else setIsCheckUser(true);
                    }
                } catch (error) {
                    console.error("Error checking user:", error);
                }
            }

            if (isCheckuser) {
                if (!password || !rePassword) {
                    setIsValid(false);
                } else {
                    if (password !== rePassword) {
                        setError("Mật khẩu không trùng nhau!");
                        setIsValid(false);
                    } else {
                        setError("");
                        setIsValid(true);
                    }
                }
            }
        }, 100); // Chỉ gọi API sau 100ms không nhập liệu
        return () => clearTimeout(handler);
    }, [username, email, password, rePassword]);

    // check form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("data: " + username + email + password)

        const data = {
            "userName": username,
            "email": email,
            "password": password
        }

        try {
            const response = await axios.post(`${API}/users/create`, data);
            console.log(response);

            if (response.data) {
                // alert("Success");
                alert("Đăng kí thành công");
                setIsLoggedIn(true);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="formSignupDiv">
            <div className="headerDiv">
                {/* <img src={logo} alt="Logo Image" /> */}
                <SiCakephp className='icon' />
                <h3>Tham gia với chúng!</h3>
            </div>

            <form action="" className="form grid" onSubmit={handleSubmit}>
                {/* <span className='showMessage'>Login Status will go here</span> */}
                <div className="inputDiv">
                    <label htmlFor="username">Tài khoản *</label>
                    <div className="input flex">
                        <FaUser className='icon' />
                        <input type="text" id='username' placeholder='Nhập tài khoản *' onChange={setUserName} />
                    </div>
                </div>

                <div className="inputDiv">
                    <label htmlFor="email">Email *</label>
                    <div className="input flex">
                        <IoMdMail className='icon' />
                        <input type="email" id='email' placeholder='Nhập email của bạn *' onChange={setEmail} />
                    </div>
                </div>

                <div className="inputDiv">
                    <label htmlFor="password">Mật khẩu *</label>
                    <div className="input flex">
                        <MdPassword className='icon' />
                        <input type={passwordVisible ? "text" : "password"} value={password} id='password' placeholder='Nhập mật khẩu *' onChange={setPassword} />
                        <span onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                    </div>
                </div>

                <div className="inputDiv">
                    <label htmlFor="password">Nhập lại mật khẩu</label>
                    <div className="input flex">
                        <MdPassword className='icon' />
                        <input type={passwordVisible ? "text" : "password"} id='rePassword' placeholder='Nhập lại mật khẩu *' onChange={setRePassword} required />
                    </div>
                </div>

                {error && <p style={{ marginTop: ".5rem", color: "red" }}>{error}</p>}
                <button type='submit' className='btn flex' disabled={!isValid}>
                    <span>Đăng kí</span>
                    <FaArrowRight className='icon' />
                </button>
            </form>
        </div>
    )
}

export default Signup