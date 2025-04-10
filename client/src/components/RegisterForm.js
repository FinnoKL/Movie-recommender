import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Добавляем хук для навигации
import { registerUser } from "../api/api";
import backgroundImage from '../images/backgroundLogin.png';
const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Хук для переходов

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!username || !password) {
            setMessage("Логин и пароль не могут быть пустыми");
            return;
        }

        try {
            const data = await registerUser(username, password);

            console.log("Ответ сервера:", data); //

            setMessage(data.message || data.error);

            if (data.success) {
                setTimeout(() => navigate("/auth/login"), 2000); // Перенаправление на страницу логина
            }
        } catch (error) {
            console.error("Registration failed:", error);
            setMessage("Ошибка при регистрации: " + error.message);
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
        <div className="font-['Anonymous_Pro'] ">
            <h2 className="text-red-700 text-5xl font-middle text-center mb-11">Регистрация</h2>
            
            <form onSubmit={handleRegister} className="space-y-4">
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
                        className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
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
                    Зарегистрироваться
                </button>
            </form>
            
            <div className="mt-4 text-center space-y-2">
                <button
                    onClick={() => navigate("/auth/login")}
                    className="text-black-600 hover:text-black-800 text-sm"
                >
                    Уже есть аккаунт? Войти
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center mx-auto"
                >
                    На главную
                </button>
            </div>
        </div>
    </div>
    );
};

export default RegisterForm;
