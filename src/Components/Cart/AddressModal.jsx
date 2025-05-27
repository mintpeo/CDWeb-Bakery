import React, { useEffect, useRef, useState } from 'react';
import './addressModal.scss';

import axios from 'axios';
import { useAuth } from '../service/AuthProvider';
import { useUserInfo } from '../service/UserInfoProvider';
import { BaseUrl } from '../service/BaseUrl';

const AddressModal = ({ isOpen, onClose, onSelectAddress }) => {
    const API = BaseUrl;
    const { idLogged } = useAuth();
    const { userInfo } = useUserInfo();
    const [selectedAddressId, setSelectedAddressId] = useState(userInfo.addressDefault);
    const [addresses, setAddresses] = useState(null);

    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // đóng modal
        }
    };

    const loadAddresses = async () => {
        try {
            const response = await axios.get(`${API}/address/get?userId=${idLogged}`);
            setAddresses(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Cant load list address: ", error);
        }
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const handleChange = () => {
        onSelectAddress(selectedAddressId); // gửi id lên cha
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div className='address-modal' onClick={handleClickOutside}>
            <div className="address-modal-container" ref={modalRef}>
                <div className="address-header">
                    <h2>Địa chỉ của tôi</h2>
                </div>
                {
                    !addresses || addresses.length === 0 ? ("Không tìm thấy địa chỉ") : (
                        addresses.map(item => (
                            <div key={item.id} className="address-modal-item" onClick={() => setSelectedAddressId(item.id)}>
                                <div className="info-modal">
                                    <div className="flex">
                                        <div className='name'>{item.name}</div>
                                        <span className="phone">(+84) {item.phone}</span>
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
                                        <label>
                                            <input type="radio" name='address'
                                                value={item.id}
                                                checked={selectedAddressId === item.id}
                                                onChange={() => setSelectedAddressId(item.id)} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
                <div className="modal-actions">
                    <button className="cancel" onClick={onClose}>Trở Lại</button>
                    <button className="submit" onClick={handleChange}>Chọn</button>
                </div>
            </div>
        </div>
    )
}
export default AddressModal