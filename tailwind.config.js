module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                "primary-color": "var(--primary-color)",
                "secondary-color": "var(--secondary-color)",
                "primary-color-lightened": "var(--primary-color-lightened)",
                "secondary-color-lightened": "var(--secondary-color-lightened)"
            },
        },
    },
    plugins: [],
}