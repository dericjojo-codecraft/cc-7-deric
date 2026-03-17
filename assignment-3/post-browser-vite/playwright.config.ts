import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: "http://localhost:5173", // vite's default port
    },
    webServer: {
        command: "npm run dev",
        url: "http://localhost:5173",
        reuseExistingServer: true,
    }
});
