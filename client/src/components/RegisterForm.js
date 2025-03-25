import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Добавляем хук для навигации
import { registerUser } from "../api/api";

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
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>
                Уже есть аккаунт? <button onClick={() => navigate("/auth/login")}>Войти</button>
            </p>
            <button onClick={() => navigate("/")}>⬅️ Назад</button>
        </div>
    );
};

export default RegisterForm;
