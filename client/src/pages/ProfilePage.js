import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout(); // Очищаем данные в контексте и localStorage
        navigate("/auth/login"); // Перенаправляем на страницу авторизации
    };

    if (!user) {
        return <div>Загрузка...</div>; // Если нет данных о пользователе, показываем сообщение
    }

    return (
        <div>
            <h1>Личный кабинет</h1>
            <p>Добро пожаловать, {user.username}!</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default ProfilePage;
