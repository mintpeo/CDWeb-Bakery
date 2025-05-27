import React, { useEffect, useState } from "react";
import './detailPage.scss';
import Navbar from "../Navbar/Navbar";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { useCart } from '../service/CartProvider';
import { useAuth } from '../service/AuthProvider';
import { BaseUrl } from "../service/BaseUrl";

const DetailPage = () => {
    const API = BaseUrl;

    const { id } = useParams(); // lấy id từ URL
    const { addToCart } = useCart();
    const { isLoggedIn, idLogged } = useAuth();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProduct = async () => {

            try {
                const result = await axios.get(`${API}/products/${id}`);
                setProduct(result.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        loadProduct();
    }, [id]);

    if (!product) return <div className="p-6">Vui lòng chờ trong ít phút...</div>;

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            navigate("/LoginSignupPage");
        } else {
            addToCart(idLogged, product.id, quantity)
        }
    };

    return (
        <div>
            <Navbar />
            <div className="product-detail">
                <div className="detail-card">
                    <div className="image-box">
                        <img src={`${API}/images/${product.image}`} alt={product.name} />
                    </div>

                    <div className="info-box">
                        <h2>{product.name}</h2>
                        <p className="price">Giá: {product.price.toLocaleString()}đ</p>
                        {!product.flavor ? ("") : (
                            <p className="desc"><b>Hương vị: </b>{product.flavor}</p>
                        )}
                        {
                            !product.structure ? ("") : (
                                <p className="desc"><b>Cấu trúc bánh:</b>
                                    {
                                        product.structure.split("\r\n").map((line, index) => (
                                            <p className="desc" key={index}>{line}</p>
                                        ))

                                    }
                                </p>
                            )
                        }

                        {
                            !product.decorate ? ("") : (
                                <p className="desc"><b>Trang trí: </b>{product.decorate}</p>
                            )
                        }

                        {
                            !product.preserve ? ("") : (
                                <p className="desc"><b>Bảo quản: </b>{product.preserve}</p>
                            )
                        }
                        <p className="desc"><b>Thông tin:</b>
                            {
                                product.detail.split("\r\n").map((line, index) => (
                                    <p className="desc" key={index}>{line}</p>
                                ))

                            }
                        </p>

                        <p className="desc"><b>Loại bánh: </b>
                            {product.category.name}
                        </p>

                        <div className="qty-box flex">
                            <label>Số lượng:</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                            <button className="add-btn" onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailPage