import React, { useEffect, useState } from 'react';
import './infoPage.scss';
import axios from 'axios';

import { BaseUrl } from '../service/BaseUrl'
import AvatarModal from './AvatarModal';

const InfoPage = ({ idLogged, userInfo, setUserInfo, loadInfoUser }) => {
    const API = BaseUrl;

    const [showModal, setShowModal] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [userInfoOriginal, setUserInfoOriginal] = useState(null);
    const [hasSetOriginal, setHasSetOriginal] = useState(false);

    const setEmail = (e) => {
        setUserInfo({ ...userInfo, email: e.target.value });
    };

    const setFullName = (e) => {
        setUserInfo({ ...userInfo, fullName: e.target.value.replace(/[^a-zA-Z\sÀ-ỹà-ỹ]/g, "") });
    };

    const setNumberPhone = (e) => {
        setUserInfo({ ...userInfo, numberPhone: e.target.value.replace(/\D/g, "") });
    };

    const setGender = (e) => {
        setUserInfo({ ...userInfo, gender: parseInt(e.target.value) });
    };

    const setDate = (e) => {
        setUserInfo({ ...userInfo, date: e.target.value });
    };

    // reset userInfo khi đóng Modal
    useEffect(() => {
        if (!showModal) { loadInfoUser(); }
    }, [showModal]);

    // set dữ liệu từ userInfo để so sánh sự thay đổi dữ liệu
    useEffect(() => {
        if (userInfo && userInfo.email && !hasSetOriginal) {
            setUserInfoOriginal({
                email: userInfo.email,
                fullName: userInfo.fullName,
                numberPhone: userInfo.numberPhone,
                gender: userInfo.gender,
                date: userInfo.date,
            });
            setHasSetOriginal(true);
        }

    }, [userInfo, hasSetOriginal]);

    // so sánh khi có sự thay đổi
    useEffect(() => {
        if (!userInfo || !userInfoOriginal) return;

        const isDifferent = JSON.stringify({
            email: userInfo.email,
            fullName: userInfo.fullName,
            numberPhone: userInfo.numberPhone,
            gender: userInfo.gender,
            date: userInfo.date,
        }) !== JSON.stringify(userInfoOriginal);

        setIsValid(isDifferent);
        // console.log("is different:", isDifferent);
        // console.log("valid:", isValid);
    }, [userInfo, userInfoOriginal]);

    // console.log("user info: ", userInfo);
    // console.log("user info original: ", userInfoOriginal);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            ...userInfo,
            "email": userInfo.email,
            "fullName": userInfo.fullName,
            "numberPhone": userInfo.numberPhone,
            "gender": userInfo.gender,
            "date": userInfo.date,
            "address": userInfo.address
        };

        try {
            await axios.put(`${API}/users/update?userId=${idLogged}`, data);
            // console.log(response.data);
            loadInfoUser();

            setUserInfoOriginal(null); // logic: sau khi submit thì reset userInfoOriginal về null sau đó set lại dữ liệu
            setHasSetOriginal(false);
            setIsValid(false);

            alert("Cập nhập thành công")
        } catch (error) {
            console.error('Cant update user: ', error);
        }
    };

    return (
        <>
            <div className='info-header'>
                <h2>Hồ Sơ Của Tôi</h2>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <form className="info-form" onSubmit={handleSubmit}>
                <div className="form-left">
                    <div className='flex'>
                        <label className='label-form'>Tên đăng nhập</label>
                        <p className='p-form'>{userInfo.userName}</p>
                    </div>
                    <div className='flex'>
                        <label lassName='label-form'>Tên</label>
                        <input className='p-form' type="text" name="fullName" value={!userInfo.fullName ? ("") : (userInfo.fullName)} onChange={setFullName} />
                    </div>
                    <div className='flex'>
                        <label lassName='label-form'>Email</label>
                        <input className='p-form' type="email" name="email" value={userInfo.email} onChange={setEmail} />
                    </div>
                    <div className='flex'>
                        <label lassName='label-form'>Số điện thoại</label>
                        <input className='p-form' type="text" name="numberPhone" value={!userInfo.numberPhone ? ("") : (userInfo.numberPhone)} onChange={setNumberPhone} minLength={9} maxLength={10} />
                    </div>
                    <div className='flex'>
                        <label lassName='label-form'>Giới tính</label>
                        <div className="gender-options">
                            <label><input type="radio" name="gender" value="1" checked={userInfo.gender === 1} onChange={setGender} /> Nam</label>
                            <label><input type="radio" name="gender" value="0" checked={userInfo.gender === 0} onChange={setGender} /> Nữ</label>
                            <label><input type="radio" name="gender" value="2" checked={userInfo.gender === 2} onChange={setGender} /> Khác</label>
                        </div>
                    </div>
                    <div className='flex'>
                        <label lassName='label-form'>Ngày sinh</label>
                        <input className='p-form' type="date" name="date" value={!userInfo.date ? ("") : (userInfo.date)} onChange={setDate} />
                    </div>
                    <button type="submit" className="submit-button" disabled={!isValid}>Lưu</button>
                </div>

                <div className="form-right">
                    <div className="avatar-preview">
                        {userInfo.avatar ? (
                            <img src={`${API}/images/avatarImgs/${userInfo.avatar.image}`} alt="avatar" />
                        ) : (
                            <div className="avatar-placeholder"></div>
                        )}
                    </div>
                    <label className="upload-button">
                        <button type='button' className='btn-form-right' onClick={() => setShowModal(true)}>Chọn ảnh</button>
                        {showModal && (
                            <AvatarModal
                                idLogged={idLogged}
                                onClose={() => setShowModal(false)}
                            />
                        )}
                    </label>
                </div>
            </form>
        </>
    );
}

export default InfoPage