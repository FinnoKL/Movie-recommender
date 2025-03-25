import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст для пользователя
export const UserContext = createContext();

// Провайдер для контекста
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Проверяем localStorage при загрузке страницы
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        if (token && username && role) {
            setUser({ username, role, token });
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("role", userData.role);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
