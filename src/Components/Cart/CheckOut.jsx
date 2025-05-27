import React, { useEffect, useState } from 'react';
import './checkOut.scss';
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

import { BaseUrl } from '../service/BaseUrl';
import { useAuth } from '../service/AuthProvider'
import { useUserInfo } from '../service/UserInfoProvider';
import { useCart } from '../service/CartProvider';
import AddressModal from './AddressModal';

const CheckOut = () => {
    const API = BaseUrl;
    const { idLogged, isLoggedIn } = useAuth();
    const { userInfo, loadUserInfo } = useUserInfo();
    const { checkoutItems } = useCart();

    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [address, setAddress] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);

    const [couponCode, setCouponCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [couponList, setCouponList] = useState(null);
    const [isValid, setIsValid] = useState(true);

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const [shipping, setShipping] = useState(null);
    const [shippingMethod, setShippingMethod] = useState(null);
    const [shippingFee, setShippingFee] = useState(0); // mặc định tiết kiệm

    const [accountCards, setAccountCards] = useState([]);
    const [creditCards, setCreditCards] = useState([]);

    // load address
    useEffect(() => {
        const loadAddress = async () => {
            if (!selectedAddressId) {
                try {
                    const response = await axios.get(`${API}/address/id?addressId=${userInfo.addressDefault}&userId=${idLogged}`);
                    setAddress(response.data);
                } catch (error) {
                    console.error("Address not found: ", error);
                }
            } else {
                try {
                    const response = await axios.get(`${API}/address/id?addressId=${selectedAddressId}&userId=${idLogged}`);
                    setAddress(response.data);
                } catch (error) {
                    console.error("Address Selected Id not found: ", error);
                }
            }
        };
        loadAddress();
    }, [selectedAddressId]);

    const closeModal = () => {
        setShowAddressModal(false);
    };

    // load coupon list
    const loadCoupon = async () => {
        try {
            const response = await axios.get(`${API}/discount/all`); // lay ra ma giam gia
            setCouponList(response.data);
        } catch (error) {
            console.error("Load Coupon error:", error);
        }
    };

    // load shipping
    const loadShipping = async () => {
        try {
            const response = await axios.get(`${API}/shipping/all`);
            const list = response.data;
            setShipping(list);

            // Chọn mặc định cái đầu tiên
            if (list.length > 0) {
                setShippingMethod(list[0].id);
                setShippingFee(list[0].fee);
            }
        } catch (error) {
            console.error("Load Shipping error:", error);
        }
    };

    useEffect(() => {
        loadUserInfo();
        loadCoupon();
        loadShipping();
        loadBankCard();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await loadInfoUser();   // chạy xong mới tiếp tục
    //         await loadAddress();    // chạy xong mới tiếp tục
    //         await loadCart();       // cuối cùng
    //     };
    //     fetchData();
    // }, []);

    // ap ma giam gia
    const handleApplyCoupon = () => {
        try {
            const validCoupons = {};
            couponList.forEach(item => {
                validCoupons[item.name.toUpperCase()] = item.valid;
            });

            if (validCoupons[couponCode.toUpperCase()]) {
                const value = validCoupons[couponCode.toUpperCase()];
                const discount = typeof value === "number" && value < 1
                    ? total * value // nhỏ hơn 1 là tính theo % (10%)
                    : value; // 50.000

                setDiscountAmount(discount);
                setIsValid(false);
            } else {
                alert("Mã giảm giá không hợp lệ");
                setDiscountAmount(0);
            }
        } catch (err) {
            console.error(err);
            alert("Đã xảy ra lỗi khi áp mã giảm giá");
        }
    };

    // chon phuong thuc giao hang
    const handleShippingChange = (item) => {
        setShippingMethod(item.id);
        setShippingFee(item.fee);
    };

    // xac dinh ngay thang
    const now = new Date();
    const day = now.getDate();            // VD: 13
    const month = now.getMonth() + 1;     // VD: 5 (vì tháng 5)

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

    // tong tien
    const totalProduct = checkoutItems.reduce((sum, item) => (sum + item.quantity * item.product.price), 0);
    const total = totalProduct + shippingFee - discountAmount;

    const handleSelectCard = (id) => {
        setSelectedCardId(id);
    };

    return (
        <div>
            {
                !isLoggedIn ? (navigate("/cart")) : (
                    <div>
                        <Navbar />
                        <div className="payment-container">
                            <h2>Thanh Toán</h2>
                            {
                                !address || address.length === 0 ? (<div className='form-group'><p>Không tìm thấy địa chỉ! Vui lòng cập nhập địa chỉ</p></div>) : (
                                    <>
                                        <div key={address.id} className="address-item flex">
                                            <div className="info">
                                                <div className="flex">
                                                    <div className='name'>{address.name}</div>
                                                    <span className="phone">(+84) {address.phone}</span>
                                                </div>
                                                <div className="address">
                                                    <p>{address.text}, {address.ward}, {address.district}, {address.province}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setShowAddressModal(true)}>Chọn địa chỉ</button>
                                            <AddressModal isOpen={showAddressModal} onClose={closeModal}
                                                onSelectAddress={(id) => {
                                                    setSelectedAddressId(id);  // nhận id từ modal
                                                }} />
                                        </div>
                                    </>
                                )
                            }
                            <div className="cart-items">
                                <h3>Sản phẩm trong giỏ hàng</h3>
                                {checkoutItems.map(item => (
                                    <div className="item" key={item.id}>
                                        <img src={`${API}/images/${item.product.image}`} alt={item.product.name} />
                                        <div className="details">
                                            <div className="name">{item.product.name}</div>
                                            <div className="quantity">Số lượng: <strong>{item.quantity}</strong></div>
                                        </div>
                                        <div className="price">{item.product.price.toLocaleString()}đ</div>
                                    </div>
                                ))}

                                <label>Phương thức vẩn chuyển</label>
                                <div className="form-group">
                                    <div className="shipping-options">
                                        {shipping && shipping.length > 0 ? (
                                            shipping.map(item =>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        value={item.id}
                                                        checked={shippingMethod === item.id}
                                                        onChange={() => handleShippingChange(item)}
                                                    />
                                                    {item.name}
                                                    <p>Nhận hàng từ <strong>{day} Tháng {month} - {day + item.days} Tháng {month}</strong></p>
                                                    <p>{item.fee.toLocaleString()}đ</p>
                                                </label>
                                            )
                                        ) : (
                                            <p>Đang tải hoặc không có phương thức giao hàng</p>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Mã giảm giá</label>
                                    <div className="coupon-section">
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Nhập mã giảm giá"
                                            disabled={!isValid}
                                        />
                                        {discountAmount === 0 ? (
                                            <button type="button" onClick={handleApplyCoupon}>Áp dụng</button>
                                        ) : (
                                            <button className='btn' onClick={() => { setDiscountAmount(0); setIsValid(true) }}>Sửa</button>
                                        )}
                                    </div>
                                </div>


                                <div className="totalProduct">
                                    <span>Tổng tiền hàng:</span>
                                    <strong>{totalProduct.toLocaleString()}đ</strong>
                                </div>

                                <div className="totalProduct">
                                    <span>Phí vận chuyển:</span>
                                    <strong>{shippingFee.toLocaleString()}đ</strong>
                                </div>

                                <div className="totalProduct">
                                    <span>Đã giảm giá:</span>
                                    {discountAmount > 0 ? (<strong>{discountAmount.toLocaleString()}đ</strong>) : (<strong>0đ</strong>)}
                                </div>

                                <div className="total">
                                    <span>Tổng cộng:</span>
                                    <strong>{total.toLocaleString()}đ</strong>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Phương thức thanh toán</label>
                                <div className="payment-methods">
                                    {["COD", "Thẻ nội địa", "Thẻ ghi nợ"].map((method) => (
                                        <label key={method}>
                                            <input
                                                type="radio"
                                                value={method}
                                                checked={paymentMethod === method}
                                                onChange={(e) => { setPaymentMethod(e.target.value); setSelectedCardId(null) }}
                                            />
                                            {method}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {(paymentMethod === "Thẻ nội địa") && (
                                <>
                                    <div className="form-group">
                                        <label>Chọn thẻ thanh toán:</label>
                                        <div className='form-group-bank-card'>
                                            {accountCards.map((card) => (
                                                <div key={card.id} className="saved-card">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            checked={selectedCardId === card.id}
                                                            onChange={() => handleSelectCard(card.id)}
                                                        />
                                                        <div className='text flex'>
                                                            <span className='name'>{card.shortName}</span>
                                                            <span className='number'>*{card.cardNumber.slice(-4)}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {(paymentMethod === "Thẻ ghi nợ") && (
                                <>
                                    <div className="form-group">
                                        <label>Chọn thẻ thanh toán:</label>
                                        <div className='form-group-bank-card'>
                                            {creditCards.map((card) => (
                                                <div key={card.id} className="saved-card">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            checked={selectedCardId === card.id}
                                                            onChange={() => handleSelectCard(card.id)}
                                                        />
                                                        <div className='text flex'>
                                                            <span className='name'>{card.bankCardType.name}</span>
                                                            <span className='number'>*{card.cardNumber.slice(-4)}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            <button className="submit-button">Xác nhận Thanh Toán</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CheckOut;