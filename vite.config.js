import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.VITE_REPO_NAME || "d4m-dev.github.io";

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`
});