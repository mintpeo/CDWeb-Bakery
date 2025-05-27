import React, { useEffect, useMemo, useState } from 'react';
import './cartPage.scss';
import axios from 'axios';

// import icons
import { RiDeleteBin2Line } from "react-icons/ri";

// import pages
import Navbar from '../Navbar/Navbar';
import ConfirmationModal from './ConfirmationModal';

// import Call APIs
import { BaseUrl } from '../service/BaseUrl'
import { useAuth } from '../service/AuthProvider'
import { useCart } from '../service/CartProvider';
import { useUserInfo } from '../service/UserInfoProvider';

import { useNavigate } from 'react-router-dom';

import Footer from '../Footer/Footer';

const CartPage = () => {
    const API = BaseUrl;
    const { idLogged, isLoggedIn } = useAuth();
    const { setCheckoutItems } = useCart();
    const { userInfo } = useUserInfo();

    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const navigate = useNavigate();

    // Load Product
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const result = await axios.get(`${API}/products/all`);
                setProducts(result.data);
            } catch (error) {
                console.error("Error Load Products:", error);
            }
        };
        loadProduct();
    }, [])

    // random san pham, useMemo de random 1 lan
    const randomProducts = useMemo(() => {
        return [...products].sort(() => Math.random() - 0.5);
    }, [products]);

    // btn Detial
    const btnDetail = (productId) => {
        navigate(`/detail/${productId}`);
    };

    // load cart
    useEffect(() => {
        const loadCart = async () => {
            try {
                const response = await axios.get(`${API}/cart/userGet?userId=${idLogged}`);
                setCartItems(response.data.items);
            } catch (error) {
                console.error("Load không thành công, ", error);
            }
        };
        loadCart();
    }, []);

    // xu li gio hang
    const handleChange = async (delta, id, quantity) => {
        const newQuantity = quantity + delta;
        if (newQuantity < 1) {
            setIsModalOpen(true);
            setItemToDelete(id); // Lưu id sản phẩm cần xoá
            return;
        }

        try {
            const response = await axios.put(`${API}/cart/update?userId=${idLogged}&productId=${id}&quantity=${newQuantity}`);
            setCartItems(Array.isArray(response.data.items) ? response.data.items : []);
        } catch (error) {
            console.error("Cập nhật thất bại", error);
            setCartItems([]); // Đảm bảo luôn là mảng
        }
    };

    // xoa san pham
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API}/cart/remove?userId=${idLogged}&productId=${id}`);
            setCartItems(Array.isArray(response.data.items) ? response.data.items : []);
            setIsModalOpen(false); // Đóng modal sau khi xoá
        } catch (error) {
            console.error("Xoá thất bại", error);
            setCartItems([]);
            setIsModalOpen(false); // Đóng modal nếu có lỗi
        }
    }

    // dua cac san pham đã chọn vào selectedItems
    const toggleSelectItem = (productId) => {
        if (selectedItems.includes(productId)) {
            setSelectedItems(selectedItems.filter(id => id !== productId));
        } else {
            setSelectedItems([...selectedItems, productId]);
        }
    };

    // gui danh sach vao trang CheckOut
    const handleCheckout = () => {
        if (!userInfo.addressDefault) {
            alert("Vui lòng thêm địa chỉ giao hàng");
        } else {
            const selectedProducts = cartItems.filter(item => selectedItems.includes(item.product.id));
            setCheckoutItems(selectedProducts);
            navigate("/checkout");
        }
    };

    // const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const total = cartItems
        .filter(item => selectedItems.includes(item.product.id))
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div>
            <Navbar />
            <div className="cart-container">
                <h2>GIỎ HÀNG</h2>
                {cartItems.length === 0 || !isLoggedIn ? (
                    <p>Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div className="cart-item" key={item.product.id}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.product.id)}
                                    onChange={() => toggleSelectItem(item.product.id)}
                                />
                                <img src={`${API}/images/${item.product.image}`} alt={item.product.name} />
                                <div className="item-details">
                                    <h4>{item.product.name}</h4>
                                    <p>Giá: {item.product.price.toLocaleString()}đ</p>
                                    <div className="quantity-control">
                                        <button onClick={() => handleChange(-1, item.product.id, item.quantity)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleChange(+1, item.product.id, item.quantity)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-btn" onClick={() => handleDelete(item.product.id)}><RiDeleteBin2Line className='iconItem' /> Xóa</button>
                            </div>
                        ))}
                        <ConfirmationModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onConfirm={() => handleDelete(itemToDelete)}
                        />
                    </div>
                )}
                <div className="cart-summary">
                    <h3>Tổng: {!isLoggedIn ? ("0") : (total.toLocaleString())}đ</h3>
                    {selectedItems.length > 0 && (
                        <button onClick={handleCheckout}>Thanh toán ({selectedItems.length})</button>
                    )}
                </div>
            </div>

            <div>
                <section class="recommend-section">
                    <h2 class="recommend-title">Có thể bạn cũng thích</h2>
                    <div class="recommend-list">
                        {
                            randomProducts.slice(0, 6).map(item => (
                                <div className="product-card" onClick={() => btnDetail(item.id)}>
                                    <img className='product-image' src={`${API}/images/${item.image}`} alt={item.name} />
                                    <p className="product-name">{item.name}</p>
                                    <p className="product-price">{item.price.toLocaleString()}đ</p>
                                </div>
                            ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default CartPage