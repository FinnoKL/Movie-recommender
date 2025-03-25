import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const AdminPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);  // Флаг загрузки
    const [newRecommendation, setNewRecommendation] = useState({
        title: '',
        description: '',
        published: false,
    });
    const [message, setMessage] = useState("");

    // Проверяем пользователя
    useEffect(() => {
        if (!user) {
            console.log("Пользователь не найден, перенаправляем...");
            navigate("/auth/login");
            return;
        }
        if (user.role !== "admin") {
            console.log("Пользователь не админ, перенаправляем...");
            navigate("/profile");
            return;
        }

        // Загружаем рекомендации
        const storedRecommendations = localStorage.getItem("recommendations");
        if (storedRecommendations) {
            console.log("Загружаем рекомендации из localStorage");
            setRecommendations(JSON.parse(storedRecommendations));
            setLoading(false);
        } else {
            fetchRecommendations();
        }
    }, [user, navigate]);

    // Функция получения рекомендаций
    const fetchRecommendations = async () => {
        try {
            console.log("Запрашиваем рекомендации с сервера...");
            const response = await axios.get('http://localhost:3001/admin/recommendations', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setRecommendations(response.data);
            localStorage.setItem("recommendations", JSON.stringify(response.data)); // Сохраняем в localStorage
        } catch (error) {
            console.error("Ошибка при получении рекомендаций:", error);
            setMessage("Ошибка при загрузке рекомендаций.");
        } finally {
            setLoading(false);
        }
    };

    // Функция выхода
    const handleLogout = () => {
        console.log("Выход из аккаунта...");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("recommendations");
        navigate("/auth/login");
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Админская панель</h1>
            <p>Добро пожаловать, {user?.username}!</p>
            <button onClick={handleLogout}>Выйти</button>

            <h2>Добавить новую рекомендацию</h2>
            <input
                type="text"
                placeholder="Заголовок"
                value={newRecommendation.title}
                onChange={(e) => setNewRecommendation({ ...newRecommendation, title: e.target.value })}
            />
            <textarea
                placeholder="Описание"
                value={newRecommendation.description}
                onChange={(e) => setNewRecommendation({ ...newRecommendation, description: e.target.value })}
            />
            <label>
                Опубликовано
                <input
                    type="checkbox"
                    checked={newRecommendation.published}
                    onChange={() => setNewRecommendation({ ...newRecommendation, published: !newRecommendation.published })}
                />
            </label>
            <button onClick={fetchRecommendations}>Обновить список</button>

            {message && <div>{message}</div>}

            <h2>Список рекомендаций</h2>
            {recommendations.length === 0 ? (
                <p>Нет рекомендаций</p>
            ) : (
                <ul>
                    {recommendations.map((rec) => (
                        <li key={rec.id}>
                            <h3>{rec.title}</h3>
                            <p>{rec.description}</p>
                            <p>Опубликовано: {rec.published ? 'Да' : 'Нет'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminPage;
