import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Expose to network
        port: 5173, // You can change the port if needed
    },
});
