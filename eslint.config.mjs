import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import path from "node:path";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    settings: {
      next: {
        rootDir: [
          path.join(import.meta.dirname, "apps/website/"),
          path.join(import.meta.dirname, "apps/demos/"),
        ],
      },
      react: {
        version: "19.2",
      },
    },
  },
  globalIgnores(["**/.next/**", "**/node_modules/**", "**/dist/**", "**/next-env.d.ts"]),
]);
