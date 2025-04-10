import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../api/api";
import backgroundImage from '../images/backgroundLogin.png'; // Импорт фонового изображения

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!username || !password) {
            setMessage("Логин и пароль не могут быть пустыми");
            return;
        }

        try {
            const data = await loginUser(username, password);

            setMessage(data.message || data.error);

            if (data.token) {
                const userData = { 
                    username: data.username, 
                    role: data.role, 
                    token: data.token 
                };
                login(userData);

    if (data.role === "admin") {
                    navigate("/admin");  // Если админ, перенаправляем в админскую панель

                } else {
                    navigate("/profile");
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
            setMessage("Ошибка при входе: " + error.message);
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="font-['Anonymous_Pro']">
                <h2 className="text-red-700 text-5xl font-middle text-center mb-11">Авторизация</h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">Логин:</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                            placeholder="Введите логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">Пароль:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-black-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black-900"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {message && (
                        <div className="text-red-500 text-sm text-center">
                            {message}
                        </div>
                    )}
                    
                    <button
                        type="submit"
                        className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition duration-200"
                    >
                        Войти
                    </button>
                </form>
                
                <div className="mt-4 text-center space-y-2">
                    <button
                        onClick={() => navigate("/auth/register")}
                        className="text-black-600  text-sm"
                    >
                        Нет аккаунта? Зарегистрируйтесь
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-900 hover:text-gray-800 text-sm flex items-center justify-center mx-auto"
                    >
                        На главную
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;