import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";  // Импортируем контекст
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";

function App() {
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth/login" element={<LoginForm />} />
                    <Route path="/auth/register" element={<RegisterForm />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                   
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
