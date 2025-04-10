module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    important: '#root', // Добавляем приоритет для React root
    theme: {
        extend: {
            fontFamily: {
                'anonymous-pro': ['"Anonymous Pro"', 'monospace'],
            },
        },
    },
    plugins: [],
}