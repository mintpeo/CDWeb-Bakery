import { useEffect, useRef, useState } from 'react';
import './bankCardPage.scss';

import BankAccountModal from './BankAccountModal';
import AddCreditCardModal from './AddCreditCardModal';

// icons
import { FaEye } from "react-icons/fa";

import axios from 'axios';

import { BaseUrl } from '../service/BaseUrl';
import { useAuth } from '../service/AuthProvider';

const BankCardPage = () => {
    const API = BaseUrl;
    const { idLogged } = useAuth();

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openBankList, setOpenBankList] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [accountCards, setAccountCards] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [tempSelectedBank, setTempSelectedBank] = useState(null);

    // close modal out side
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowPasswordModal(false); // đóng modal
        }
    };

    // load bank card
    const loadBankCard = async () => {
        try {
            const response = await axios.get(`${API}/banks/user?userId=${idLogged}`);
            const filterCard = response.data;

            // tach 2 danh sach (credit and account bank)
            setAccountCards(filterCard.filter(card => card.code !== null));
            setCreditCards(filterCard.filter(card => card.code === null));
        } catch (error) {
            console.log("Load Bank Card Error:", error);
        }
    };

    useEffect(() => {
        loadBankCard();
    }, []);

    // verify password and id
    const handlePasswordSubmit = async () => {
        try {
            const res = await axios.post(`${API}/users/verify`, {
                id: idLogged,
                password: password
            });

            if (res.data) {
                setShowPasswordModal(false);
                setPassword('');
                setError('');

                setSelectedBank(tempSelectedBank);
            } else {
                setError("Mật khẩu không đúng!");
            }
        } catch (err) {
            setError("Có lỗi xảy ra khi xác thực.");
        }
    };

    const formatCardNumber = (input) => {
        return input.replace(/(.{4})/g, '$1 ').trim();
    };

    useEffect(() => {
        if (!showPasswordModal) {
            setPassword('');
        };
    }, [showPasswordModal]);

    useEffect(() => {
        if (!openAddModal || !openBankList) {
            loadBankCard();
        }
    }, [openAddModal, openBankList]);

    const closeAddModal = () => {
        setOpenAddModal(false);
    };

    const closeBankList = () => {
        setOpenBankList(false);
    };

    // remove bank card
    const removeBankCard = async (id) => {
        try {
            const repsone = await axios.delete(`${API}/banks/remove?userId=${idLogged}&bankCardId=${id}`);
            if (repsone.data === true) {
                loadBankCard();
                alert("Xoá thẻ thành công");
            } else alert("Đã xảy ra lỗi, vui lòng vui lại sau.");
        } catch (error) {
            console.error("Cant remove bank card: ", error);
        }
    };

    return (
        <div className="bank-container">
            {
                !selectedBank ? (
                    <>
                        <div className="bank-header">
                            <h2>Tài khoản ngân hàng của tôi</h2>
                            <button className="add-btn" onClick={() => setOpenBankList(true)}>+ Thêm thẻ ngân hàng liên kết</button>
                            <BankAccountModal isOpen={openBankList} onClose={closeBankList} />
                        </div>

                        {
                            !accountCards || accountCards.length === 0 ? (<div className='blank-list'>Bạn chưa liên kết thẻ</div>) : (
                                accountCards.map(item => (
                                    <div key={item.id} className="address-item">
                                        <div className="info flex">
                                            <div className="name">
                                                <img src={`https://api.vietqr.io/img/${item.code}.png`} alt={item.shortName} className="bank-logo" />
                                            </div>
                                            <div className="card">
                                                <p>*{item.cardNumber.slice(-4)}</p>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <div className="top-actions">
                                                <button className="check" onClick={() => { setShowPasswordModal(true); setTempSelectedBank(item) }}
                                                ><FaEye className='icon-check' /> Xem</button>
                                                {showPasswordModal && (
                                                    <div className="modal-pass" onClick={handleClickOutside}>
                                                        <div className="modal-content" ref={modalRef}>
                                                            <h3>Nhập mật khẩu để xem thông tin thẻ</h3>
                                                            <input
                                                                type="password"
                                                                value={password}
                                                                onChange={e => setPassword(e.target.value)}
                                                                placeholder="Mật khẩu của bạn"
                                                            />
                                                            {error && <p className="error">{error}</p>}
                                                            <div className="modal-actions-pass">
                                                                <button className='submit' onClick={() => handlePasswordSubmit()}>Xác nhận</button>
                                                                <button onClick={() => { setShowPasswordModal(false); setError("") }}>Hủy</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }

                        <div className="bank-header">
                            <h2>Thẻ tín dụng/ghi nợ</h2>
                            <button className="add-btn" onClick={() => setOpenAddModal(true)}>+ Thêm thẻ mới</button>
                            <AddCreditCardModal isOpen={openAddModal} onClose={closeAddModal} />
                        </div>

                        {
                            !creditCards || creditCards.length === 0 ? (<div className='blank-list'>Bạn chưa liên kết thẻ</div>) : (
                                creditCards.map(item => (
                                    <div key={item.id} className="address-item">
                                        <div className="info flex">
                                            <div className="name">
                                                <img src={`${API}/images/cardTypes/${item.bankCardType.img}`} alt={item.img} className="bank-logo" />
                                            </div>
                                            <div className="card flex">
                                                <p>*{item.cardNumber.slice(-4)}</p>
                                                <p className="type">Loại thẻ: {item.bankCardType.name}</p>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <div className="top-actions">
                                                <button className="delete" onClick={() => { setShowPasswordModal(true); setTempSelectedBank(item) }}><FaEye className='icon-check' /> Xem</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </>
                ) : (
                    <div className='bank-selected'>
                        <button className='btn' onClick={() => setSelectedBank(null)}>
                            ← Quay lại
                        </button>

                        <div className='bank-card-cover'>
                            <div className="bank-card">
                                <div className="bank-card__header">
                                    {
                                        selectedBank.shortName ? (<img src={`https://api.vietqr.io/img/${selectedBank.code}.png`} alt={selectedBank.shortName} className="bank-card__logo" />) : (
                                            <img src={`${API}/images/cardTypes/${selectedBank.bankCardType.img}`} alt={selectedBank.bankCardType.name} className="bank-card__logo__credit" />
                                        )
                                    }
                                </div>
                                <div className="bank-card__number">{formatCardNumber(selectedBank.cardNumber)}</div>
                                <div className="bank-card__footer">
                                    <div className="bank-card__info">
                                        <label>Card Holder</label>
                                        <div className="bank-card__name">{selectedBank.cardHolderName}</div>
                                    </div>
                                    <div className="bank-card__info">
                                        <label>Expires</label>
                                        <div className="bank-card__expiry">{selectedBank.expiryMonth} / {selectedBank.expiryYear}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <div className="top-actions">
                                <button className="btn" onClick={() => { removeBankCard(selectedBank.id); setSelectedBank(null) }}>Xoá thẻ</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default BankCardPage