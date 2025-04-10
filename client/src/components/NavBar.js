import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav className="flex justify-center items-center space-x-[5vw] mb-[0vw] font-['Anonymous_Pro']"
            style={{
                fontSize: 'max(1.5rem, 3.4vw)',
                whiteSpace: 'nowrap'
            }}>
            <Link to="/" className="text-black-700 hover:text-red-500 no-underline ">Главная</Link>
            {user ? (
                user.role === "admin" ? (
                    <>
                        <Link to="/admin" className="text-black-700 hover:text-red-500 no-underline" >Панель администратора</Link>
                        <Link to="/profile" className="text-black-700 hover:text-red-500 no-underline" >Личный профиль</Link>
                    </>
                ) : (
                    <>
                        <Link to="/recommendations" className="text-red-700 hover:text-black no-underline" >Рекомендации</Link>
                        <Link to="/profile" className="text-black-700 hover:text-red-500 no-underline" >Личный профиль</Link>
                    </>
                )
            ) : (
                <Link to="/auth/login" className="text-black-700 hover:text-red-500 no-underline" >Войти</Link>
            )}
        </nav>
    );
};

export default Navbar;