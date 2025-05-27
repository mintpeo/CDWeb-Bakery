import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

import { BaseUrl } from '../service/BaseUrl';
import { useAuth } from '../service/AuthProvider';

// Tạo Context
const UserInfoContext = createContext();

// Tạo Provider
export const UserInfoProvider = ({ children }) => {
    const API = BaseUrl;
    const { idLogged } = useAuth();

    const [userInfo, setUserInfo] = useState(null);

    const loadUserInfo = async () => {
        try {
            const response = await axios.get(`${API}/users/info?id=${idLogged}`);
            setUserInfo(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Lỗi User Info:", error);
        }
    };

    useEffect(() => {
        loadUserInfo();
    }, [idLogged]);

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo, loadUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
};

// Custom hook
export const useUserInfo = () => useContext(UserInfoContext);