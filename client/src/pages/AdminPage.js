import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const AdminPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        published: false,
    });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
            return;
        }
        if (user.role !== "admin") {
            navigate("/profile");
            return;
        }
        fetchRecommendations();
    }, [user, navigate]);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://brutally-knowing-kodiak.cloudpub.ru/admin/recommendations',
                {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                }
            );
            // Убедимся, что у каждой рекомендации есть уникальный id
            const recommendationsWithIds = response.data.map(rec => ({
                ...rec,
                id: rec.id || Math.random().toString(36).substr(2, 9) // Генерация id если нет
            }));
            setRecommendations(recommendationsWithIds);
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            setMessage("Ошибка при загрузке рекомендаций");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const startEditing = (recommendation) => {
        setEditingId(recommendation.id);
        setFormData({
            title: recommendation.title || '',
            description: recommendation.description || '',
            published: recommendation.published || false
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            published: false
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim()) {
            setMessage("Введите заголовок");
            return;
        }

        try {
            if (editingId) {
                await axios.put(
                    `https://brutally-knowing-kodiak.cloudpub.ru/admin/recommendations/${editingId}`,
                    formData,
                    {
                        headers: { 
                            Authorization: `Bearer ${localStorage.getItem("token")}` 
                        }
                    }
                );
                
                setRecommendations(recommendations.map(rec => 
                    rec.id === editingId ? { ...rec, ...formData } : rec
                ));
                setMessage("Рекомендация обновлена!");
            } else {
                const response = await axios.post(
                    'https://brutally-knowing-kodiak.cloudpub.ru/admin/recommendations',
                    formData,
                    {
                        headers: { 
                            Authorization: `Bearer ${localStorage.getItem("token")}` 
                        }
                    }
                );
                
                setRecommendations([...recommendations, {
                    ...response.data,
                    id: response.data.id || Math.random().toString(36).substr(2, 9)
                }]);
                setMessage("Рекомендация добавлена!");
            }
            
            cancelEditing();
        } catch (error) {
            console.error("Ошибка:", error);
            setMessage(`Ошибка при ${editingId ? "обновлении" : "добавлении"} рекомендации`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить эту рекомендацию?")) {
            return;
        }

        try {
            await axios.delete(
                `https://brutally-knowing-kodiak.cloudpub.ru/admin/recommendations/${id}`,
                {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                }
            );
            
            setRecommendations(recommendations.filter(rec => rec.id !== id));
            setMessage("Рекомендация успешно удалена");
        } catch (error) {
            console.error("Ошибка удаления:", error);
            setMessage("Ошибка при удалении рекомендации");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/auth/login");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-['Anonymous_Pro']">
            <div className="max-w-6xl mx-auto">
                {/* Шапка */}
                <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg shadow">
                    <div>
                        <h1 className="text-3xl font-bold text-red-700">Админ-панель</h1>
                        <p className="text-lg">Добро пожаловать, {user?.username}!</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Выйти
                    </button>
                </div>

                {/* Форма */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-red-700 mb-4">
                        {editingId ? "Редактирование рекомендации" : "Новая рекомендация"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full p-2 border rounded"
                                placeholder="Введите заголовок"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                            <textarea
                                name="description"
                                className="w-full p-2 border rounded"
                                placeholder="Введите описание"
                                rows="4"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="published"
                                className="mr-2"
                                checked={formData.published}
                                onChange={handleInputChange}
                                id="published"
                            />
                            <label htmlFor="published">Опубликовать сразу</label>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {editingId ? "Сохранить изменения" : "Добавить"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    Отменить
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Список рекомендаций */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-red-700">Рекомендации</h2>
                        <button 
                            onClick={fetchRecommendations}
                            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Обновить список
                        </button>
                    </div>

                    {message && (
                        <div className={`p-3 mb-4 rounded ${
                            message.includes("успешно") || message.includes("добавлена") || message.includes("обновлена") 
                                ? "bg-green-100 text-green-700" 
                                : "bg-red-100 text-red-700"
                        }`}>
                            {message}
                        </div>
                    )}

                    {recommendations.length === 0 ? (
                        <p className="text-center py-8">Нет рекомендаций</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendations.map((rec) => (
                                <div key={rec.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-xl mb-2">{rec.title}</h3>
                                    <p className="text-gray-600 mb-3">{rec.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className={`px-2 py-1 text-xs rounded ${
                                            rec.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {rec.published ? 'Опубликовано' : 'Черновик'}
                                        </span>
                                        <div className="space-x-2">
                                            <button 
                                                onClick={() => startEditing(rec)}
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                Редактировать
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(rec.id)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;