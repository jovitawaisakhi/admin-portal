import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/providers/theme-providers";
import QueryProvider from "@/providers/query-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Admin Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} $ h-full antialiased`}
    >
      <body className="flex flex-col min-h-screen">
        <QueryProvider>
          <ThemeProviders>
            {children}
          </ThemeProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
