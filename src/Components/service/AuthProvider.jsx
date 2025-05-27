import React, { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import { BaseUrl } from "./BaseUrl";

// Tạo Context
const AuthContext = createContext();

// Tạo Provider
export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idLogged, setIdLogged] = useState(null);

    const logout = () => {
        setIdLogged(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ idLogged, setIdLogged, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);