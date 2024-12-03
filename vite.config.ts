import { defineConfig } from "vite";
import { env } from "process";
import react from "@vitejs/plugin-react";

const isDevelopment = env.NODE_ENV === "development";
const target =  isDevelopment ? "http://localhost:3001" : "https://farmbook85-backend.azurewebsites.net"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
			port: 3000,
			proxy: {
				"/api": {
					target: target,
					changeOrigin: true,
				},
			},
		  }
});
