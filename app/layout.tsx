import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { Background } from "./components/layout/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Studio - Generate Stunning Images",
  description: "Create beautiful AI-generated images with Stable Diffusion XL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Background />
        <Navigation />

        {/* Main Content */}
        <main className="relative pt-16 sm:pt-20 lg:pt-24 min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
