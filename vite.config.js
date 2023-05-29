import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.PUBLIC_PATH || './',
	plugins: [react()],
	css: {
		modules: {
			generateScopedName: '[name]-[local]-[hash:base64:5]',
		},
		postcss: {
			plugins: [
				autoprefixer({
					overrideBrowserslist: ['Chrome > 31', 'ff > 31', 'ie >= 9', '> 1%'],
					grid: true,
				}),
			]
		}
	},
	server: {
		host: "localhost",
		port: 5178,
		proxy: {
			// '/api': {
			// 	target: "",
			// 	changeOrigin: true,
			// },
		},
	}
})
