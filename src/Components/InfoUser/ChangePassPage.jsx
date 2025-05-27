import React, { useEffect, useState } from 'react';
import './changePassPage.scss';

import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../service/BaseUrl';

const ChangePassPage = ({ idLogged, userInfo }) => {
    const API = BaseUrl;

    const navigate = useNavigate();
    const [oldPass, setOldPassValue] = useState("");
    const [newPass, setNewPassValue] = useState("");
    const [newRePass, setNewRePassValue] = useState("");
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);

    const setOldPass = (e) => {
        setOldPassValue(e.target.value);
    }

    const setNewPass = (e) => {
        setNewPassValue(e.target.value);
    }

    const setNewRePass = (e) => {
        setNewRePassValue(e.target.value);
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            if (!newPass || !newRePass) {
                setIsValid(false);
            } else if (newPass !== newRePass) {
                setError("Mật khẩu không giống nhau");
                setIsValid(false);
            } else {
                setError("");
                setIsValid(true);
            }

        }, 500);
        return () => clearTimeout(handler);
    }, [newPass, newRePass]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${API}/users/updatePass?userId=${idLogged}&oldPass=${oldPass}&newPass=${newPass}`);
            if (response.data) {
                alert("Cập nhập thành công");
                navigate("/");
            } else {
                alert("Sai mật khẩu");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='info-header'>
                <h2>Đổi Mật Khẩu</h2>
            </div>
            <form className="info-form" onSubmit={handleSubmit} >
                <div className="form-left-change">
                    <div className='flex'>
                        <label lassName='label-form'>Mật khẩu cũ</label>
                        <input className='p-form' type="password" name="OldPass" onChange={setOldPass} required />
                    </div>
                    <div className='flex'>
                        <label lassName='label-form'>Mật khẩu mới</label>
                        <input className='p-form' type="password" name="NewPass" onChange={setNewPass} required />
                    </div>
                    <div className='flex'>
                        <label lassName='label-form'>Nhập lại mật khẩu mới</label>
                        <input className='p-form' type="password" name="NewRePass" onChange={setNewRePass} />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit" className="submit-button" disabled={!isValid}>Lưu</button>
                </div>
            </form>
        </>
    );
}

export default ChangePassPage