import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NICO | Neural Information Cache Object",
  description: "The background memory layer for your AI workflow. Sync project context across ChatGPT, Claude, and Gemini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500/20 selection:text-cyan-300`}>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="dca4a1e4-bcad-4c68-8aea-5bbf01e5d8cf"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
