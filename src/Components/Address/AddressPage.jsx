import React, { useEffect, useState } from 'react';
import "./addressPage.scss";

import axios from 'axios';

import AddAddressModal from "./AddAddressModal";
import UpdateAddressModal from './UpdateAddressModal';

import { BaseUrl } from '../service/BaseUrl';
import { useUserInfo } from '../service/UserInfoProvider';

const AddressPage = ({ idLogged }) => {
    const API = BaseUrl;

    const { userInfo, loadUserInfo } = useUserInfo();

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [getAddress, setAddress] = useState("");
    const [addresses, setAddresses] = useState(null);

    // Khi click thiết lập mặc định
    const handleSetDefault = async (id) => {
        try {
            await axios.put(`${API}/users/updateAddressDefault?userId=${idLogged}&addressDefaultId=${id}`);
            await loadUserInfo();
        } catch (error) {
            console.error('Cant update address default: ', error);
        };
    };

    // show list address
    const fetchAPI = async () => {
        try {
            const response = await axios.get(`${API}/address/get?userId=${idLogged}`);
            setAddresses(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Cant load list address: ", error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    // set up dia chi khi dia chi co độ dài = 1 thì set là dia chi mặc định
    useEffect(() => {
        const updateDefaultAddressIfNeeded = async () => {
            if (addresses && addresses.length === 1) {
                const defaultAddressId = addresses[0].id;
                try {
                    await axios.put(`${API}/users/updateAddressDefault?userId=${idLogged}&addressDefaultId=${defaultAddressId}`);
                    await loadUserInfo();
                } catch (error) {
                    console.error("Cant update default address id: ", error);
                }
            }
        };
        updateDefaultAddressIfNeeded();
    }, [addresses]);

    const closeAddModal = () => {
        setOpenAddModal(false);
    };

    const closeUpdateModal = () => {
        setOpenUpdateModal(false);
    };

    const removeAddress = async (id) => {
        try {
            await axios.delete(`${API}/address/remove?userId=${idLogged}&addressId=${id}`);
            fetchAPI();
            alert("Xoá địa chỉ thành công");
        } catch (error) {
            console.error("Cant remove: ", error);
        }
    };

    // btn Update Address
    const btnUpdate = async (addressId) => {
        setAddress(addressId);
    };

    useEffect(() => {
        if (!openAddModal || !openUpdateModal) {
            fetchAPI();
        };
    }, [openAddModal, openUpdateModal]);

    return (
        <div className="address-container">
            <div className="address-header">
                <h2>Địa chỉ của tôi</h2>
                <button className="add-btn" onClick={() => setOpenAddModal(true)}>+ Thêm địa chỉ mới</button>
                <AddAddressModal idLogged={idLogged} isOpen={openAddModal} onClose={closeAddModal} />
            </div>
            {
                !addresses || addresses.length === 0 ? ("Không tìm thấy địa chỉ") : (
                    addresses.map(item => (
                        <div key={item.id} className="address-item">
                            <div className="info">
                                <div className="name">
                                    {item.name} <span className="phone">(+84) {item.phone}</span>
                                </div>
                                <div className="address">
                                    <p>{item.text}, {item.ward}, {item.district}, {item.province}</p>
                                </div>
                                {userInfo.addressDefault === item.id && (
                                    <div className="tags">
                                        <span className="tag default">Mặc định</span>
                                        <span className="tag">Địa chỉ lấy hàng</span>
                                        <span className="tag">Địa chỉ trả hàng</span>
                                    </div>
                                )}
                            </div>
                            <div className="actions">
                                <div className="top-actions">
                                    <button onClick={() => {
                                        btnUpdate(item.id);
                                        setOpenUpdateModal(true);
                                    }}>Cập nhật</button>
                                    <UpdateAddressModal idLogged={idLogged} isOpen={openUpdateModal} onClose={closeUpdateModal} idAddress={getAddress} />
                                    {
                                        userInfo.addressDefault === item.id ? ("") : (
                                            <button className="delete" onClick={() => removeAddress(item.id)}>Xóa</button>
                                        )
                                    }
                                </div>
                                <button type='button' className="set-default-btn" onClick={() => handleSetDefault(item.id)} disabled={userInfo.addressDefault === item.id}>Thiết lập mặc định</button>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
};


export default AddressPage