import React, { useEffect, useRef, useState } from 'react';
import './bankAccountModal.scss';
import axios from 'axios';

import { BaseUrl } from '../service/BaseUrl'
import { useAuth } from '../service/AuthProvider';

const BankAccountModal = ({ isOpen, onClose }) => {
    const API = BaseUrl;
    const { idLogged } = useAuth();

    const [bankCardType, setBankCardType] = useState([]);
    const [selected, setSelected] = useState(null);
    const [bankCard, setBankCard] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryMonth: '',
        expiryYear: '',
    });
    const [bankList, setBankList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBank, setSelectedBank] = useState(null);

    // load list bank
    useEffect(() => {
        const loadBank = async () => {
            try {
                const response = await axios.get("https://api.vietqr.io/v2/banks");
                setBankList(response.data.data);
            } catch (error) {
                console.log("Load Bank Error:", error);
            }
        };
        loadBank();
    }, []);

    // search name bank
    const filteredBanks = bankList.filter(bank =>
        bank.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // close modal out side
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // đóng modal
        }
    };

    // set null thi mo modal
    useEffect(() => {
        if (!isOpen) {
            setSelectedBank(null);
            setSearchTerm('');
            setBankCard({
                cardNumber: '',
                cardHolderName: '',
                expiryMonth: '',
                expiryYear: '',
            });
        };
    }, [isOpen]);

    const setName = (e) => {
        const input = e.target.value.replace(/[^a-zA-Z\sÀ-ỹà-ỹ]/g, "").toUpperCase();
        setBankCard({ ...bankCard, cardHolderName: input });
    };

    // xac dinh năm hiện tại
    const currentYear = new Date().getFullYear();

    const setNumber = (e) => {
        const input = e.target.value.replace(/\D/g, "");

        setBankCard({ ...bankCard, cardNumber: input });
    };

    const setMonth = (e) => {
        setBankCard({ ...bankCard, expiryMonth: e.target.value });
    };

    const setYear = (e) => {
        setBankCard({ ...bankCard, expiryYear: e.target.value });
    };

    // form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu bất kỳ trường nào bị rỗng
        if (!bankCard.cardHolderName || !bankCard.cardNumber || !bankCard.expiryMonth || !bankCard.expiryYear) {
            alert("Vui lòng nhập đầy đủ thông tin thẻ ngân hàng.");
            return; // Không gửi request nếu thiếu dữ liệu
        }

        const data = {
            cardHolderName: bankCard.cardHolderName,
            cardNumber: selectedBank.bin + bankCard.cardNumber,
            expiryMonth: bankCard.expiryMonth,
            expiryYear: bankCard.expiryYear,
            bankCardType: { id: 5 },
            code: selectedBank.code,
            shortName: selectedBank.shortName,
        };

        try {
            await axios.post(`${API}/banks/add?userId=${idLogged}`, data);
            onClose();
        } catch (error) {
            console.error("Bank Card cant add: ", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClickOutside}>
            <div className="modal" ref={modalRef}>
                {!selectedBank ? (
                    // Màn hình chọn ngân hàng
                    <>
                        <h3 className="bank-modal-title">Thêm Ngân hàng liên kết</h3>
                        <input
                            type="text"
                            placeholder="Tìm kiếm ngân hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bank-search"
                        />
                        <div className="bank-list">
                            {
                                filteredBanks.map((item) => (
                                    <div className="bank-item" key={item.id} onClick={() => setSelectedBank(item)}>
                                        <img src={item.logo} alt={item.shortName} className="bank-logo" />
                                        <span className="bank-name">{item.shortName}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    // Màn hình sau khi chọn ngân hàng
                    <div className="bank-detail">
                        <div className="back-button">
                            <button className='btn' onClick={() => setSelectedBank(null)}>
                                ← Quay lại
                            </button>
                        </div>
                        <div className='bank-form'>
                            <img src={selectedBank.logo} alt={selectedBank.shortName} className="bank-logo-large" />
                            <p className='bank-form-name'>{selectedBank.name}</p>
                            <form className="modal-bank-list" onSubmit={handleSubmit}>
                                <div className="bank-form-group">
                                    <p>Số thẻ:</p>
                                    <div className='flex'>
                                        <input
                                            type="text"
                                            className="bin-box"
                                            value={selectedBank.bin}
                                            disabled
                                        />
                                        <input className='bin-number' type="text" name="number" placeholder='Nhập số còn lại...' value={bankCard.cardNumber} onChange={setNumber} minLength={10} maxLength={10} />
                                    </div>

                                    <p>Họ và tên trên thẻ:</p>
                                    <input type="text" name="name" value={bankCard.cardHolderName} placeholder='Nhập họ và tên trên thẻ' onChange={setName} minLength={5} />

                                    <p>Ngày hết hạn:</p>
                                    <div className='flex'>
                                        <select name="month" onChange={setMonth}>
                                            <option value="" >Tháng</option>
                                            {[...Array(12)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <select name="year" onChange={setYear}>
                                            <option value="" >Năm</option>
                                            {[...Array(11)].map((_, i) => {
                                                const year = currentYear + i;
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button className="cancel" onClick={onClose}>Trở Lại</button>
                                    <button type="submit" className="submit">Hoàn thành</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BankAccountModal;
