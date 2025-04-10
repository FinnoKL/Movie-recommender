import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const [collections, setCollections] = useState({
        watched: [],
        wantToWatch: []
    });

    // Тестовые данные для демонстрации
    useEffect(() => {
        setCollections({
            watched: [],
            wantToWatch: [{
                id: 1,
                title: "Хижина в лесу",
                type: "movie",
                 description: "Этот фильм — гениальная пародия на классические ужастики, где вместо банальных страшилок зрителя ждёт безумный микс черного юмора, кровавого абсурда и неожиданных поворотов. Если ты устал от шаблонных хорроров — тут тебя ждёт настоящий праздник садистской фантазии с отличным саундтреком и запоминающимися моментами. Однозначно must-watch для фанатов жанра!"
            }]
        });
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/auth/login");
    };

    return (
        <div className="font-['Anonymous_Pro'] min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-4xl font-bold text-red-700 mb-2">Личный кабинет</h1>
                <p className="text-xl text-gray-700">Добро пожаловать, <span className="font-bold">{user?.username || 'Гость'}</span>!</p>

                {/* Просмотрено */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-red-700 mb-4 border-b-2 border-red-200 pb-2">
                        Просмотрено
                    </h2>
                    {collections.watched.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {collections.watched.map(item => (
                                <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                    <img src={item.image} alt={item.title} className="w-full h-40 object-cover"/>
                                    <div className="p-3">
                                        <p className="font-bold truncate">{item.title}</p>
                                        <p className="text-sm text-gray-600">{item.type === 'movie' ? 'Фильм' : 'Сериал'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Вы еще ничего не смотрели</p>
                    )}
                </div>

                {/* Посмотрю */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-red-700 mb-4 border-b-2 border-red-200 pb-2">
                        Посмотрю
                    </h2>
                    {collections.wantToWatch.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {collections.wantToWatch.map(item => (
                                <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="md:flex">
                                        <div className="md:flex-shrink-0">
                                     
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-bold text-red-700 mb-2">{item.title}</h3>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                {item.type === 'movie' ? 'Фильм' : 'Сериал'}
                                            </span>
                                            <p className="mt-2 text-gray-600">{item.description}</p>
                                            <div className="mt-4">
                                                <button 
                                                    onClick={() => {/* Логика удаления из списка */}}
                                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Ваш список желаний пуст</p>
                    )}
                </div>

                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleLogout}
                        className="bg-red-700 text-white py-2 px-6 rounded-md hover:bg-red-800 transition duration-200"
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;