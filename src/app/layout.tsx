import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Silicon Valley Study Trip",
    description: "Voyage d’étude à San Francisco & Silicon Valley — innovation, culture tech, Stanford, Apple, Google, Intel, Golden Gate.",
    metadataBase: new URL("https://example.com"),
    openGraph: {
        title: "Silicon Valley Study Trip",
        description: "Voyage d’étude à San Francisco & Silicon Valley",
        url: "https://example.com",
        siteName: "Silicon Valley Study Trip",
        images: [
            { url: "/og.jpg", width: 1200, height: 630, alt: "San Francisco & Silicon Valley" },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Silicon Valley Study Trip",
        description: "Voyage d’étude à San Francisco & Silicon Valley",
        images: ["/og.jpg"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`${inter.variable}`} suppressHydrationWarning>
        <body className="min-h-dvh bg-bg text-fg antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
        {children}
        </body>
        </html>
    );
}