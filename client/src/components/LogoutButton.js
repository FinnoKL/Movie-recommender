import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login");
    };

    return <button onClick={handleLogout}>Выйти</button>;
};

export default LogoutButton;
