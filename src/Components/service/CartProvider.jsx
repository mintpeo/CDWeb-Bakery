import { React, createContext, useContext, useState } from 'react'
import axios from "axios";

import { BaseUrl } from './BaseUrl';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const API = BaseUrl;
    // const { idLogged } = useAuth();

    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [checkoutItems, setCheckoutItems] = useState([]);

    // const fetchCart = async () => {
    //     try {
    //         const response = await axios.get(`${API}/cart/userGet?userId=${idLogged}`);
    //         setCart(Array.isArray(response.data.items) ? response.data.items : []);
    //         console.log("!", response.data);
    //     } catch (error) {
    //         console.error("Lỗi khi lấy giỏ hàng:", error);
    //         setCart([]); // Đảm bảo luôn là mảng
    //     }
    // };

    const addToCart = async (idLogged, productId, quantity) => {
        await axios.post(`${API}/cart/add?userId=${idLogged}&productId=${productId}&quantity=${quantity}`);
        setCart(prev => (Array.isArray(prev) ? [...prev, { productId, quantity }] : [{ productId, quantity }]));

        // count cart
        setCartCount(cartCount + 1);
    };

    // console.log("provider", cart);

    // useEffect(() => {
    //     fetchCart();
    // }, []);

    return (
        <CartContext.Provider value={{ addToCart, cartCount, setCartCount, checkoutItems, setCheckoutItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);