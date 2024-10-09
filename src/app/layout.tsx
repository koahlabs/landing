import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { PHProvider } from "./providers";
import PostHogPageView from "./pageview";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MadLad",
  description: "AI-native advertising",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
