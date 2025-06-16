import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import biome from "vite-plugin-biome";
import { configDefaults } from "vitest/config";

export default defineConfig({
	plugins: [react(), biome({ mode: "check", applyFixes: false })],
	base: "./",
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/setupTests.ts"],
		exclude: [...configDefaults.exclude, "e2e/**"],
	},
});
