import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './updateAddressModal.scss';

import AddressSelector from './AddressSelector';
import { BaseUrl } from '../service/BaseUrl'

const UpdateAddressModal = ({ idLogged, isOpen, onClose, idAddress }) => {
    const API = BaseUrl;
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        name: '',
        phone: '',
        text: '',
    });

    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // đóng modal
        }
    };

    const setName = (e) => {
        setAddress({ ...address, name: e.target.value.replace(/[^a-zA-Z\sÀ-ỹà-ỹ]/g, "") });
    };

    const setPhone = (e) => {
        setAddress({ ...address, phone: e.target.value.replace(/\D/g, "") });
    };

    const setText = (e) => {
        setAddress({ ...address, text: e.target.value });
    };

    const handleAddressChange = (selectedAddress) => {
        setAddress({ ...address, ...selectedAddress });
    };

    const loadAddressById = async () => {
        try {
            const response = await axios.get(`${API}/address/id?addressId=${idAddress}&userId=${idLogged}`);
            setAddress(response.data);
        } catch (error) {
            console.error("Address cant load: ", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setAddress(null); // clear trước
            setLoading(true);

            setTimeout(() => {
                loadAddressById();
                setLoading(false);
            }, 500);
        }

        if (onClose) {
            loadAddressById();
        }
    }, [isOpen, idAddress, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu bất kỳ trường nào bị rỗng
        if (!address.name || !address.phone || !address.text) {
            alert("Vui lòng nhập đầy đủ thông tin địa chỉ.");
            return; // Không gửi request nếu thiếu dữ liệu
        }

        const data = {
            name: address.name,
            phone: address.phone,
            text: address.text,
            province: address.province,
            district: address.district,
            ward: address.ward,
        };

        try {
            const response = await axios.put(`${API}/address/update?userId=${idLogged}&addressId=${idAddress}`, data);
            setAddress(response.data);
            onClose();
        } catch (error) {
            console.error("Address cant update: ", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-update" onClick={handleClickOutside}>
            <form className="modal" onSubmit={handleSubmit} ref={modalRef}>
                <div>
                    <h2>Cập nhập địa chỉ</h2>
                    {
                        loading ? (<h2>Loading...</h2>) : (
                            <>
                                <div className="form-group">
                                    <input type="text" name="name" placeholder="Họ và tên" value={address.name} onChange={setName} />
                                    <input type="text" name="phone" placeholder="Số điện thoại" value={address.phone} onChange={setPhone} minLength={9} maxLength={10} />
                                </div>
                                <AddressSelector onAddressChange={handleAddressChange} defaultValue={{
                                    province: address.province,
                                    district: address.district,
                                    ward: address.ward,
                                }} />

                                <textarea name="text" value={address.text} placeholder="Địa chỉ cụ thể" onChange={setText} />
                                {/* <div className="map-area">
                                    <button className="add-location">+ Thêm vị trí</button>
                                </div> */}
                                <div className="modal-actions">
                                    <button className="cancel" onClick={onClose}>Trở Lại</button>
                                    <button type="submit" className="submit">Hoàn thành</button>
                                </div>
                            </>
                        )
                    }
                </div>
            </form>
        </div>
    );
};

export default UpdateAddressModal;
