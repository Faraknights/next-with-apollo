module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                "primary-color": "#ff8c60",
                "secondary-color": "#ff5858",
                "primary-color-lightened": "#ffc9b2",
                "secondary-color-lightened": "#ffc9c9",

                "light-grey-1": "#f4f4f4",
                "light-grey-2": "#dadada",
                "light-grey-3": "#bbbbbb",
                "dark-grey": "#454545",

                "error": "#e34141",
                "error-container": "#ffadad",
                "success": "#519B53",
                "success-container": "#B8FFBA",
                "warning-container": "#F4BD2A",
                "information-container": "#36A2B1",
            },
        },
        fontSize: {
            "bodySmall": ".75rem",
            "bodyMedium": ".875rem",
            "bodyLarge": "1rem",
            "title-3": "1.25rem",
            "title-2": "1.5rem",
            "title-1": "2rem",
        }
    },
    plugins: [],
}