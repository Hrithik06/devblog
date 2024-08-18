/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                wave: {
                    '0%': {
                        transform: 'translate(-50%, -50%) rotate(0)',
                        top: '-30%',
                    },
                    '50%': {
                        top: '-50%',
                    },
                    '100%': {
                        transform: 'translate(-50%, -50%) rotate(360deg)',
                        top: '-80%',
                    },
                },
            },
            animation: {
                wave: 'wave 3s infinite', // You can customize the duration and timing here
            },
        },
        fontFamily: {
            inter: ['Inter'],
        },
    },
    plugins: [require('@designbycode/tailwindcss-text-shadow')],
};
