import { defineConfig } from "vite";
import { env } from "process";
import react from "@vitejs/plugin-react";

const isDevelopment = env.NODE_ENV === "development";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: isDevelopment
		? {
				port: 3000,
				proxy: {
					"/api": {
						target: "http://localhost:3001", // Backend local
						changeOrigin: true,
					},
				},
		  }
		: undefined, // No configura proxy en producción
});
