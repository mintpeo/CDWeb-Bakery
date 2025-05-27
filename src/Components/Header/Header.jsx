import React, { useState, useEffect, useRef } from 'react'
import './header.scss'

import img from '../../Assets/imageHeader.jpg'

//import icons
import { FaSearch } from "react-icons/fa";

import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'

// import Call APIs
import { BaseUrl } from '../service/BaseUrl'
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const API = BaseUrl;

    const [searchList, setSearchList] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearchValue] = useState("");
    const navigateSearch = useNavigate();

    const [category, setCategoryValue] = useState(0);
    const navigateCate = useNavigate();

    const [price, setPrice] = useState(0);
    const navigatePrice = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // close div.show-search
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const setSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const setCategory = (e) => {
        setCategoryValue(Number(e.target.value));
    };

    // range -> price
    const handleChange = (e) => {
        const value = e.target.value;
        // e.target.value = 2500
        // (2500 / 5000) * 100 = 50%
        const percent = Math.round(value / 10000) * 10000;
        setPrice(percent);
    }

    //scroll animation
    useEffect(() => {
        Aos.init({ duration: 2000 });
        loadCate(); // data category
    }, []);

    // Load Category
    const loadCate = async () => {
        try {
            const result = await axios.get(`${API}/cate/all`);
            setCategories(result.data);
        } catch (error) {
            console.error("Categories:", error);
        }
    };

    // search
    const loadSearchList = async () => {
        try {
            const response = await axios.get(`${API}/products/search?name=${search}`);
            setSearchList(response.data);
        } catch (error) {
            console.log("Load Search List Error:", error);
        };
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            loadSearchList();
            navigateSearch(`?name=${search}`);
        }, 1000);
        return () => clearTimeout(handler);
    }, [search]);

    // btn Detial
    const btnDetail = (productId) => {
        navigate(`/detail/${productId}`);
    };

    // cate
    useEffect(() => {
        navigateCate(`?categoryId=${category}`);
    }, [category]);

    // price
    useEffect(() => {
        const handler = setTimeout(() => {
            // console.log(price)
            navigatePrice(`?maxPrice=${price}`);
        }, 1000);
        return () => clearTimeout(handler);
    }, [price]);

    return (
        <section className="home">
            <div className="overlay"></div>
            <img src={img}></img>

            <div className="homeContent container">
                <div className="textDiv">
                    <span data-aos="fade-up" className="smallText">
                        Bánh kem bạn thích
                    </span>

                    <h1 data-aos="fade-up" className="homeTitle">
                        Tất cả đều có tại đây!
                    </h1>
                </div>

                <div data-aos="fade-up" className="cardDiv grid">
                    {/* cake */}
                    <div className="destinationInput">
                        <label htmlFor="food">Tìm theo tên bánh kem:</label>
                        <div className="input flex">
                            <input type="text" placeholder='Nhập tên tại đây...' value={search} onChange={setSearch} onFocus={() => setShowDropdown(true)} />
                            <FaSearch className='icon' style={{ cursor: 'auto' }} />
                        </div>
                        {showDropdown && searchList.length > 0 && (
                            <div className='show-search' ref={dropdownRef}>
                                <div>
                                    {!searchList || searchList.length === 0 ? (
                                        <div>Không tìm thấy kết quả</div>
                                    ) : (
                                        searchList.map(item => (
                                            <div className='item' key={item.id} onClick={() => btnDetail(item.id)}>{item.name}</div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* category */}
                    <div className="dateInput">
                        <label htmlFor="date">Tìm theo loại bánh kem:</label>
                        <div className="input flex">
                            <select
                                value={category}
                                onChange={setCategory}
                            >
                                <option value="" >
                                    Tất cả các loại bánh kem
                                </option>
                                {
                                    categories.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* price */}
                    <div className="priceInput">
                        <div className="label_total flex">
                            <label htmlFor="price">Tìm theo giá:</label>
                            {!price ? (<h3 className="total">1.000.000 đ</h3>) : (
                                <h3 className="total">{price.toLocaleString()}đ</h3>
                            )}
                        </div>
                        <div className="input flex">
                            <input type="range" max={1000000} min={0} value={price} onChange={handleChange} />
                        </div>
                    </div>

                    {/* serach
                    <div className="searchOptions flex">
                        <FaFilter className='icon' />
                        <span>MORE FILTERS</span>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default Product