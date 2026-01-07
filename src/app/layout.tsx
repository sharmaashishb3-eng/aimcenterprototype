import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatButton from "@/components/ui/ChatButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#00CED1",
};

export const metadata: Metadata = {
  title: "AIM Center - Learning Today, Leading Tomorrow",
  description: "India's #1 Learning App for exam preparation. Get live classes, mock tests, video courses, and study materials for Banking, SSC, Railway, UPSC, and more.",
  metadataBase: new URL("http://localhost:3000"),
  keywords: "exam preparation, mock tests, live classes, banking exams, SSC, Railway, UPSC, online learning",
  authors: [{ name: "AIM Center" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "AIM Center - Learning Today, Leading Tomorrow",
    description: "India's #1 Learning App for exam preparation",
    type: "website",
    locale: "en_IN",
    images: ["/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIM Center - Learning Today, Leading Tomorrow",
    description: "India's #1 Learning App for exam preparation",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AIM Center",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatButton />
      </body>
    </html>
  );
}
