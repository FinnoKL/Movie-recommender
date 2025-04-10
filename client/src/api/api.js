<<<<<<< HEAD
const API_URL = "https://brutally-knowing-kodiak.cloudpub.ru";
=======
const API_URL = "https://movie-recommender-dr2p.onrender.com";  // Убедитесь, что это правильный URL для вашего сервера
>>>>>>> 73c897f7010bcf20f80cbc035e8e2e3bb7ab289b

export const registerUser = async (username, password) => {
    try {
        console.log("Sending request to:", `${API_URL}/auth/register`);
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Ошибка регистрации:", errorData);
            throw new Error(errorData.message || `Ошибка: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        console.log("Sending request to:", `${API_URL}/auth/login`);
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Ошибка на сервере:", errorData);
            throw new Error(errorData.message || `Ошибка: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Ошибка при входе:", error);
        throw error;
    }
};
