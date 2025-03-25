const API_URL = "https://movie-recommender-dr2p.onrender.com"; // Замените на ваш URL

export const registerUser = async (username, password) => {
    console.log("Sending request to:", `${API_URL}/auth/register`);
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    console.log("Sending request to:", `${API_URL}/auth/login`);
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Ошибка: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Ошибка при входе:", error);
        throw error;
    }
};