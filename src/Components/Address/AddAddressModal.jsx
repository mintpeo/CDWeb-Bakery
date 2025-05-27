import React, { useEffect, useRef, useState } from 'react';
import "./addAddressModal.scss";
import axios from 'axios';

import { BaseUrl } from '../service/BaseUrl'
import AddressSelector from './AddressSelector';

const AddAddressModal = ({ idLogged, isOpen, onClose }) => {
    const API = BaseUrl;
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

    const handleAddressChange = (selectedAddress) => {
        setAddress({ ...address, ...selectedAddress });  // ...selectedAddress sẽ tách ra thành: province: selectedAddress.province,...
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

    useEffect(() => {
        if (!isOpen) {
            setAddress({
                name: '',
                phone: '',
                text: '',
            });
        }
    }, [isOpen]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu bất kỳ trường nào bị rỗng
        if (!address.name || !address.phone || !address.text || !address.phone || !address.district || !address.ward) {
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
            const response = await axios.post(`${API}/address/add?userId=${idLogged}`, data);
            setAddress(response.data);
            onClose();
        } catch (error) {
            console.error("Address cant add: ", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClickOutside}>
            <form className="modal" onSubmit={handleSubmit} ref={modalRef}>
                <div>
                    <h2>Địa chỉ mới</h2>
                    <div className="form-group">
                        <input type="text" name="name" placeholder="Họ và tên" value={address.name} onChange={setName} />
                        <input type="text" name="phone" placeholder="Số điện thoại" value={address.phone} onChange={setPhone} minLength={9} maxLength={10} />
                    </div>
                    <AddressSelector onAddressChange={handleAddressChange} />
                    <textarea name="text" placeholder="Địa chỉ cụ thể" onChange={setText} />
                    {/* <div className="map-area">
                        <button className="add-location">+ Thêm vị trí</button>
                    </div> */}
                    {/* <div className="address-type">
                        <span>Loại địa chỉ:</span>
                        <button>Nhà Riêng</button>
                        <button>Văn Phòng</button>
                    </div> */}
                    {/* <div className="default-checkbox">
                        <input type="checkbox" id="default" name="default" checked={address.default} onChange={setDefault} />
                        <label htmlFor="default">Đặt làm địa chỉ mặc định</label>
                    </div> */}
                    <div className="modal-actions">
                        <button className="cancel" onClick={onClose}>Trở Lại</button>
                        <button type="submit" className="submit">Hoàn thành</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAddressModal;
