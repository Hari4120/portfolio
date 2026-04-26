import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/data/content";
import LenisScroll from "@/components/LenisScroll";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: siteContent.config.title,
  description: siteContent.config.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-50 min-h-screen cursor-none selection:bg-teal-400 selection:text-black`}>
        <div className="noise-overlay" />
        <CustomCursor />
        <LenisScroll>
          <NavBar />
          {children}
        </LenisScroll>
      </body>
    </html>
  );
}
