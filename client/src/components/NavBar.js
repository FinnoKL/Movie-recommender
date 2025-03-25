import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav style={{ display: "flex", gap: "15px", padding: "10px", borderBottom: "1px solid #ccc" }}>
            <Link to="/">🏠 Главная</Link>
            <Link to="/recommendations">⭐ Рекомендации</Link>

            {user ? (
                <>
                    {user.role === "admin" ? (
                        <Link to="/admin">⚙️ Админская панель</Link>
                    ) : (
                        <Link to="/profile">👤 Личный профиль</Link>
                    )}
                    <button onClick={() => { localStorage.clear(); window.location.reload(); }}>🚪 Выйти</button>
                </>
            ) : (
                <Link to="/auth/login">👤 Войти</Link>
            )}
        </nav>
    );
};

export default Navbar;
