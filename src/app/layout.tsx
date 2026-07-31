import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DailyFlow — Daily planner & habit tracker",
  description:
    "Plan your week, prep tomorrow, track habits and review your day.",
};

/**
 * Every page is behind Clerk auth, so nothing here can be usefully prerendered
 * at build time. Forcing dynamic rendering also stops the build from
 * evaluating ClerkProvider (which needs a publishable key) during `next build`.
 */
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning is required by next-themes (it sets the
    // `class` on <html> before React hydrates).
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <Providers>
            {children}
            <Toaster richColors position="top-right" />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
