import('tailwindcss').Config;

const colors = require('tailwindcss/colors');
module.exports = {
    content: ['./src/**/*.{html,js,ts,scss}'],
    darkMode: 'class',
    theme: {
        extend: {
            display: ['group-hover'],
            fontFamily: {
                nice: ['Montserrat', 'sans-serif'],
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0%)' },
                    '50%': { transform: 'translateX(240%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
            colors: {
                primary: {
                    "100": 'var(--color-primary-100)',
                    "200": 'var(--color-primary-200)',
                    "300": 'var(--color-primary-300)',
                    "400": 'var(--color-primary-400)',
                    "500": 'var(--color-primary-500)',
                    "600": 'var(--color-primary-600)',
                    "700": 'var(--color-primary-700)',
                    "800": 'var(--color-primary-800)',
                    "900": 'var(--color-primary-900)',
                },
                accept: {
                    color: colors.emerald[500],
                    hover: colors.emerald[600],
                },
                warn: {
                    color: colors.red[500],
                    hover: colors.red[600],
                },
                light: colors.slate[100],
                dark: "#13191f",
                card: {
                    dark: "#1b222c",
                    darkShade: colors.gray[800],
                    light: colors.white,
                    lightShade: colors.gray[50],
                },
       
                //  CUSTOM COLOR SETS
                brown: {
                    50: '#fdf8f6',
                    100: '#f2e8e5',
                    200: '#eaddd7',
                    300: '#e6dbd1',
                    400: '#dccaba',
                    500: '#bb9c7f',
                    600: '#9f7b5a',
                    700: '#7c5129',
                    800: '#603813',
                    900: '#371f0a',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

/* INPORTANT INSTALLS FOR NEW PROJECT */
/* npm install -D @tailwindcss/typography */
/* npm install -D @tailwindcss/forms */
