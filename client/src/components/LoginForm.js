import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";  // Импортируем контекст
import { loginUser } from "../api/api";  // Импортируем API для логина

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(UserContext);  // Используем login из контекста

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");  // Очищаем сообщение

        if (!username || !password) {
            setMessage("Логин и пароль не могут быть пустыми");
            return;
        }

        try {
            const data = await loginUser(username, password);  // Делаем запрос на сервер для логина

            setMessage(data.message || data.error);  // Устанавливаем сообщение в случае ошибки или успеха

            if (data.success) {
                const userData = { 
                    username: data.user.username, 
                    role: data.user.role, 
                    token: data.token 
                };
                login(userData);  // Сохраняем данные пользователя в контексте и localStorage

                // Перенаправление в зависимости от роли пользователя
                if (data.user.role === "admin") {
                    navigate("/admin");  // Если админ, перенаправляем в админскую панель
                } else {
                    navigate("/profile");  // Если не админ, перенаправляем в профиль
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
            setMessage("Ошибка при входе: " + error.message);  // Показываем ошибку
        }
    };

    return (
        <div>
            <h2>Авторизация</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            <p>
                Нет аккаунта? <button onClick={() => navigate("/auth/register")}>Регистрация</button>
            </p>
            <button onClick={() => navigate("/")}>⬅️ Назад</button>
        </div>
    );
};

export default LoginForm;
