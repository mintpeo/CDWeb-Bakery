import { useEffect, useRef, useState } from 'react';
import "./addCreditCardModal.scss";
import axios from 'axios';

import { BaseUrl } from '../service/BaseUrl'
import { useAuth } from '../service/AuthProvider';

const AddCreditCardModal = ({ isOpen, onClose }) => {
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

    // close modal out side
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // đóng modal
        }
    };

    // load bank card type
    useEffect(() => {
        const loadBankCardType = async () => {
            try {
                const response = await axios.get(`${API}/bankTypes/all`);
                setBankCardType(response.data);
            } catch (error) {
                console.log("Load Bank Card Type Error:", error);
            }
        };
        loadBankCardType();
    }, []);

    const setName = (e) => {
        const input = e.target.value.replace(/[^a-zA-Z\sÀ-ỹà-ỹ]/g, "").toUpperCase();
        // const onlyLetters = input.replace(/[^a-zA-Z\sÀ-ỹà-ỹ]/g, ""); // chỉ giữ lại chữ & khoảng trắng
        // const uppercased = onlyLetters.toUpperCase(); // chuyển thành chữ in hoa

        setBankCard({ ...bankCard, cardHolderName: input });
    };

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

    // change card type with card number (bank card)
    useEffect(() => {
        const detectCardType = () => {
            let type = null;

            if (bankCard.cardNumber.startsWith("4")) {
                type = 1; // visa
            } else if (/^5[1-5]/.test(bankCard.cardNumber) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(bankCard.cardNumber)) {
                type = 2; // master
            } else if (bankCard.cardNumber.startsWith("35")) {
                type = 3; // JCB
            } else if (bankCard.cardNumber.startsWith("34") || bankCard.cardNumber.startsWith("37")) {
                type = 4; //Amex
            }

            const found = bankCardType.find(item => item.id === type);
            if (found) setSelected(found);
        };
        detectCardType();
    }, [bankCard.cardNumber]);

    // xac dinh năm hiện tại
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (!isOpen) {
            setBankCard({
                cardNumber: '',
                cardHolderName: '',
                expiryMonth: '',
                expiryYear: '',
            });
        };
    }, [isOpen]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu bất kỳ trường nào bị rỗng
        if (!bankCard.cardHolderName || !bankCard.cardNumber || !bankCard.expiryMonth || !bankCard.expiryYear) {
            alert("Vui lòng nhập đầy đủ thông tin thẻ ngân hàng.");
            return; // Không gửi request nếu thiếu dữ liệu
        }

        const data = {
            cardHolderName: bankCard.cardHolderName,
            cardNumber: bankCard.cardNumber,
            expiryMonth: bankCard.expiryMonth,
            expiryYear: bankCard.expiryYear,
            bankCardType: { id: selected.id },
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
            <form className="modal" onSubmit={handleSubmit} ref={modalRef}>
                <div>
                    <h2>Thẻ ngân hàng mới</h2>
                    <div className="bank-form-group">
                        <p>Số thẻ:</p>
                        <input type="text" name="number" value={bankCard.cardNumber} placeholder='Nhập đầy đủ số thẻ' onChange={setNumber} minLength={16} maxLength={16} />

                        <p>Họ và tên trên thẻ:</p>
                        <input type="text" name="name" value={bankCard.cardHolderName} placeholder='Nhập họ và tên trên thẻ' onChange={setName} minLength={5} />

                        <p>Loại thẻ:</p>
                        <div className="input flex">
                            <select value={selected?.id || ""}>
                                {
                                    bankCardType.map(item => (
                                        <option key={item.id} value={item.id} disabled>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

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
                </div>
            </form>
        </div>
    );
};

export default AddCreditCardModal;
