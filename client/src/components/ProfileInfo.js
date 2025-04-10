import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";  // Импортируем контекст


const ProfileInfo = ({ username }) => {
    const { user, logout } = useContext(UserContext);

    return (
        <div>
            <h1>Личный кабинет</h1>
            <p>Добро пожаловать, {username}!</p>
           
             
        </div>
    );
};

export default ProfileInfo;
