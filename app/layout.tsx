import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Sarphare Khekdewala - Fresh Seafood in Mumbai",
  description: "Fresh mud crabs and fish delivered across Mumbai, Thane, and Navi Mumbai. Order online now!",
  keywords: "mud crab, fresh fish, seafood, Mumbai, Thane, Navi Mumbai, online seafood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
