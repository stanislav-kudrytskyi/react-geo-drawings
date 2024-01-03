import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4800,
    },
    plugins: [react()],
    // define: {
    //     'process.env': {},
    // },
});
