import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Static site: every page is prerendered at build time into dist/client; nothing runs on a server.
export default defineConfig({
	plugins: [tailwindcss(), tanstackStart({ prerender: { enabled: true, crawlLinks: false }, pages: [{ path: "/" }, { path: "/roadmap" }] }), react()],
	resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
