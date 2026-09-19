import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bigductcomedy.com",
  ),
  title: "Big Duct Comedy - Original Blue-Collar Comedy",
  description:
    "Original blue-collar comedy with a clearly separated real-world alert desk. Follow the Big Duct crew through service calls, bad decisions and the kind of jobs nobody warned them about.",
  keywords: ["comedy", "blue collar", "HVAC comedy", "service call stories", "Big Duct"],
  authors: [{ name: "Big Duct Comedy" }],
  openGraph: {
    title: "Big Duct Comedy - Original Blue-Collar Comedy",
    description: "Follow the Big Duct crew through service calls, bad decisions and the kind of jobs nobody warned them about.",
    url: "https://bigductcomedy.com",
    siteName: "Big Duct Comedy",
    images: [
      {
        url: "/comic-upstairs-hot.png",
        width: 1200,
        height: 630,
        alt: "Big Duct Comedy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Duct Comedy",
    description: "Original blue-collar comedy. A new story every day.",
    images: ["/comic-upstairs-hot.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
