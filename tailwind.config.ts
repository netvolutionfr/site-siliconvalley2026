import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "media",
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
            },
            boxShadow: {
                "elev-1": "0 1px 2px rgba(0,0,0,0.06)",
                "elev-2": "0 10px 30px rgba(0,0,0,0.12)",
            },
        },
    },
    plugins: [],
};

export default config;