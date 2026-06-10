import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Caveat is a variable font — no weight needed
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pentas Seni ARUNIKA ADVENTURE FEST — SDIT Mentari Indonesia 03",
  description: "Undangan Digital Pentas Seni ARUNIKA ADVENTURE FEST",
};

import LoadingScreen from "@/components/LoadingScreen";
import MusicPlayer from "@/components/MusicPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LoadingScreen />
        <MusicPlayer />
        {children}
      </body>
    </html>
  );
}

// Force HMR reload
