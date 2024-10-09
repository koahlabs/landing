import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { PHProvider } from "./providers";
import PostHogPageView from "./pageview";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KOAH",
  description: "AI-native advertising",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body
        className={`${inter.className} antialiased font-sans tracking-tighter`}
      >
        <PHProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
          <PostHogPageView />
        </PHProvider>
      </body>
    </html>
  );
}
