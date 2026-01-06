/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic System Mapping
                primary: {
                    50: 'var(--ds-primary-50)',
                    100: 'var(--ds-primary-100)',
                    200: 'var(--ds-primary-200)',
                    300: 'var(--ds-primary-300)',
                    400: 'var(--ds-primary-400)',
                    500: 'var(--ds-primary-500)',
                    600: 'var(--ds-primary-600)',
                    700: 'var(--ds-primary-700)',
                    900: 'var(--ds-primary-900)',
                },
                surface: {
                    0: 'var(--ds-surface-0)',
                    50: 'var(--ds-surface-50)',
                    100: 'var(--ds-surface-100)',
                    200: 'var(--ds-surface-200)',
                    300: 'var(--ds-surface-300)',
                    800: 'var(--ds-surface-800)',
                    900: 'var(--ds-surface-900)',
                },
                node: {
                    part: 'var(--node-part)',
                    'part-group': 'var(--node-part-group)',
                    component: 'var(--node-component)',
                    subsystem: 'var(--node-subsystem)',
                    'subsystem-code': 'var(--node-subsystem-code)',
                    system: 'var(--node-system)',
                    'system-light': 'var(--node-system-light)',
                },
                // Legacy support (optional, can be deprecated)
                sidebar: {
                    bg: 'var(--ds-surface-0)',
                    text: 'var(--ds-surface-500)',
                    active: '#F9F9F9',
                    activeText: '#5583F7',
                },
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'glow': '0 0 20px rgba(99, 102, 241, 0.5)',
            },
            keyframes: {
                'scale-in-center': {
                    '0%': { transform: 'scale(0)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'draw-edge': {
                    '0%': { strokeDashoffset: '2000', strokeDasharray: '2000', opacity: '0' },
                    '100%': { strokeDashoffset: '0', strokeDasharray: '2000', opacity: '1' },
                }
            },
            animation: {
                'scale-in-center': 'scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                'draw-edge': 'draw-edge 1s ease-out forwards',
            }
        },
    },
    plugins: [],
}
