// HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img1 from '../images/titleArtist.svg'; // Импорт картинки

const HomePage = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Получаем опубликованные рекомендации с сервера
        axios.get('http://localhost:3001/api/recommendations')
            .then(response => {
                setRecommendations(response.data);  // Сохраняем данные в состояние
            })
            .catch(error => {
                console.error("Ошибка при загрузке рекомендаций:", error);
            });
    }, []);

    return (
        
        <div className="container mx-auto p-4">
           <h1
                className="text-6xl font-bold bg-clip-text text-transparent bg-cover"
                style={{
                    backgroundImage: `url(${img1})`,
                    //Anonymous Pro
                    backgroundSize: 'cover', // Картинка будет адаптироваться
                    backgroundPosition: 'center', // Центрирование картинки
                    fontSize: '12vw', // Размер шрифта для "КИНО", чтобы оно занимало весь экран
                    lineHeight: '0.8', // Уменьшаем интервал между строками
                    fontFamily: '"Roboto", sans-serif',
                    textAlign: 'left', // Текст выравнивается по левому краю
                    padding: '20px', // Немного отступа вокруг текста
                    width: '100%' // Занимает всю ширину
                }}>
                <span style={{
                    fontSize: '30vw', // Сделаем "КИНО" максимально большим
                    display: 'block', // Перенос на новую строку
                    fontWeight: 'bold', // Сделаем слово "КИНО" жирным
                    paddingLeft: '2.0vw', // Отступ слева
                    fontFamily: '"Russo One", sans-serif',

                }}>
                    КИНО
                </span>
                <span style={{
                    fontSize: '15vw', // Меньше размер для "НЕДЕЛЯ"
                    fontWeight: 'normal', // Тонкий шрифт для "НЕДЕЛЯ"
                    display: 'block', // Перенос на новую строку
                    letterSpacing: '2px', // Немного увеличим расстояние между буквами
                    paddingLeft: '3vw', // Отступ слева
                    marginTop: '10px',
                    paddingBottom: '3vw',
                }}>
                    НЕДЕЛЯ
                </span>
            </h1> 

            <h2 className="text-black-700  no-underline" style={{
                fontFamily: '"Anonymous Pro", monospace',
                fontSize: 'max(1.5rem, 6.4vw)',
                whiteSpace: 'nowrap',
                paddingBottom: '5vw'
            }}>Рекомендации</h2>

          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
                {recommendations.map((rec) => (
                    // HomePage.js
                    <Link
                        key={rec.id}
                        to={`/api/recommendations/${rec.id}`}  // Добавлен /api
                        className="p-4 border rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        <h2 className="text-xl font-semibold mb-2">{rec.title}</h2>
                        <p className="text-gray-700">{rec.description.substring(0, 100)}...</p>
                        <p className="text-yellow-500 font-bold mt-2">Рейтинг: {rec.rating}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
