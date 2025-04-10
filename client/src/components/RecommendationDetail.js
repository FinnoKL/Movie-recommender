import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const RecommendationDetail = () => {
  const { id } = useParams();
  const [recommendation, setRecommendation] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/recommendations/${id}`)
      .then(response => {
        setRecommendation(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке информации о рекомендации:", error);
      });
  }, [id]);

  const handleAddToCollection = async (status) => {
    if (!user) {
      alert("Необходимо войти в систему!");
      navigate("/auth/login"); // Перенаправляем на логин
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/api/collection/add", {
        user_id: user.id,
        recommendation_id: id,
        status: status
      });
  
      alert(`Добавлено в "${status === "watched" ? "Просмотрено" : "Посмотрю"}!"`);
      
      // Перенаправляем в профиль после добавления
      navigate("/profile"); 
      
    } catch (error) {
      console.error("Ошибка:", error.response?.data || error.message);
      alert("Ошибка");
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6">
      {recommendation ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{recommendation.title}</h1>
          <p className="text-xl mb-4">{recommendation.description}</p>

          <div className="flex gap-4">
            <button
              onClick={() => handleAddToCollection("watched")}
              className="py-2 px-4 bg-green-500 text-white rounded-lg"
            >
              Просмотрено
            </button>

            <button
              onClick={() => handleAddToCollection("want_to_watch")}
              className="py-2 px-4 bg-yellow-500 text-white rounded-lg"
            >
              Посмотрю
            </button>

            <button
              onClick={handleBack}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Назад
            </button>
          </div>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default RecommendationDetail;