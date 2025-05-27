import React, { useState, useEffect, useRef } from 'react'
import './main.scss'

//import icons
import { IoMdPricetag } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";

import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

// import Call APIs
import { BaseUrl } from '../service/BaseUrl'
import { useAuth } from '../service/AuthProvider';
import { useCart } from '../service/CartProvider';

import { useLocation, useNavigate } from 'react-router-dom';

const Main = () => {
    const API = BaseUrl;
    const { addToCart } = useCart();
    const { isLoggedIn, idLogged } = useAuth();

    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6); // set mặc định danh sách là 6 sản phẩm

    // const [cart, setCart] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const productSectionRef = useRef(null); // scroll

    // scroll animation
    useEffect(() => {
        Aos.init({ duration: 2000 });
    },);

    // console.log(idLogged)

    // products
    useEffect(() => {
        loadProduct();
    }, [location.search]);

    const loadProduct = async () => {
        try {
            // Lấy query param từ URL
            const params = new URLSearchParams(location.search);
            let url = "";
            let searchName = params.get("name");
            let cateId = params.get("categoryId");
            let price = params.get("maxPrice");

            if (searchName) {
                url = `${API}/products/search?name=${searchName}`;
            } else if (cateId) {
                url = `${API}/products/id?categoryId=${cateId}`;
            } else if (price) {
                url = `${API}/products/price?maxPrice=${price}`;
            }

            console.log(url);
            // console.log(cateId, price);
            const result = await axios.get(url);
            if (result.data === "" || url === "") {
                const url = await axios.get(`${API}/products/all`);
                setProducts(url.data);
            } else setProducts(result.data);

            // productSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // // Bù trừ scroll nếu cần:
            // setTimeout(() => {
            //     window.scrollBy({ top: -120, behavior: 'smooth' });
            // }, 400);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Load Product
    // const loadProduct = async () => {

    //     try {
    //         const result = await axios.get(`${API}/products/all`);
    //         setProducts(result.data);
    //     } catch (error) {
    //         console.error("Error fetching categories:", error);
    //     }
    // };

    // btn Detial
    const btnDetail = (productId) => {
        navigate(`/detail/${productId}`);
    };

    // btn Add To Cart
    const btnCart = (productId) => {
        if (!isLoggedIn) {
            navigate("/LoginSignupPage");
        } else {
            // alert(productId);
            // alert(idLogged);
            if (addToCart(idLogged, productId, 1)) {
                // alert("success");
            };
        }
    };

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 className="title">
                    Bánh kem được yêu thích nhất
                </h3>
            </div>

            <div className="sectionContent grid" ref={productSectionRef}>
                {Array.isArray(products) && products.length > 0 ? (
                    <>
                        {/* slice: canh chỉnh danh sách */}
                        {products.slice(0, visibleCount).map(({ id, name, price, flavor, image }) => {
                            return (
                                <div key={id} className="singleDestination">
                                    <div className="imageDiv">
                                        <img src={`${API}/images/${image}`} alt={name} />
                                    </div>

                                    <div className="cardInfo">
                                        <h4 className="destTitle">{name}</h4>
                                        <span className="continent flex">
                                            {/* <IoMdPricetag className='icon' /> */}
                                            {/* <span className="name">{price.toLocaleString()}</span> */}
                                        </span>

                                        <div className="fees flex">
                                            <div className="grade">
                                                <IoMdPricetag className='icon' />
                                                <span><small>+1</small></span>
                                            </div>

                                            <div className="price">
                                                <h5>{price.toLocaleString()}đ</h5>
                                            </div>
                                        </div>

                                        <div className="desc">
                                            <p>{flavor}</p>
                                        </div>

                                        <div className='more flex'>
                                            <button className="btn" onClick={() => btnDetail(id)}>
                                                CHI TIẾT BÁNH KEM
                                                <LuClipboardCheck className='icon' />
                                            </button>

                                            <button className='btn' onClick={() => btnCart(id)}>
                                                THÊM VÀO GIỎ HÀNG
                                                <LuShoppingCart className='icon' />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>

            <div className="btnAddWrapper">
                {/* Hết sản phẩm thì mất nút */}
                {visibleCount < products.length && (
                    // Thêm 6 sản phẩm mỗi khi ấn
                    <button className='btnAdd' onClick={() => setVisibleCount(prev => prev + 6)}>
                        Hiển thị thêm sản phẩm
                    </button>
                )}
            </div>
        </section>
    )
}

export default Main