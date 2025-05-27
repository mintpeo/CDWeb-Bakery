import React, { useEffect, useState } from "react";
import "./login.scss";

// import icons
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { SiCakephp } from "react-icons/si";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// import Call APIs
import { BaseUrl } from "../service/BaseUrl";
import { useAuth } from "../service/AuthProvider";

const Login = ({ setLoading }) => {
  const APInp = BaseUrl;
  const { setIsLoggedIn, setIdLogged } = useAuth(); // login

  // get data username and password
  const [password, setPasswordValue] = useState("");
  const [username, setUserNameValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // show pass

  const navigate = useNavigate(); // hook điều hướng

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // get data username
  const setUserName = (e) => {
    setUserNameValue(e.target.value);
  };

  // get data password
  const setPassword = (e) => {
    setPasswordValue(e.target.value);
  };

  // submit form
  const handleSubmit = async (e) => {
    // prevent default
    e.preventDefault();

    // api call
    // console.log("this is our data " + username + "   " + password)

    // create an object
    const data = {
      userName: username,
      password: password,
    };

    try {
      const response = await axios.post(`${APInp}/users/login`, data);

      if (!response.data) {
        // fail
        alert("Sai tên tài khoản hoặc sai mật khẩu");
      } else if (response.data.status === 1) {
        // alert("Success");
        setIdLogged(response.data.id);
        setIsLoggedIn(true);
        await setLoading(true);

        // setTimeout(() => {
        //     setLoading(false);
        //     // navigate('/');
        // }, 5000);
      } else if (response.data.status === 2) {
        // alert("ADMIN");
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="formDiv">
      <div className="headerDiv">
        <SiCakephp className="icon" />
        <h3>CHÀO MỪNG ĐẾN VỚI CAKE</h3>
      </div>

      <form action="" className="form grid" onSubmit={handleSubmit}>
        <span className="showMessage">Quý khách đăng nhập tại đây</span>
        <div className="inputDiv">
          <label htmlFor="username">Tài khoản</label>
          <div className="input flex">
            <FaUser className="icon" />
            <input
              type="text"
              id="username"
              placeholder="Nhập tài khoản"
              onChange={setUserName}
            />
          </div>
        </div>

        <div className="inputDiv">
          <label htmlFor="password">Mật khẩu</label>
          <div className="input flex">
            <MdPassword className="icon" />
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              id="password"
              placeholder="Nhập mật khẩu"
              onChange={setPassword}
            />
            <span onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="btn flex">
          <span>Đăng nhập</span>
          <FaArrowRight className="icon" />
        </button>

        <span className="forgotPassword">
          Quên mật khẩu? <a href="">Ấn vào đây</a>
        </span>
      </form>
    </div>
  );
};

export default Login;
