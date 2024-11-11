import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header";
import { cn } from "@/components/Helpers";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleTagManager } from '@next/third-parties/google'

const DosisFonts = Dosis({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="m-0 p-0" suppressHydrationWarning>
      <body className={cn(
        DosisFonts.className,
        "w-screen h-screen pb-4"
      )}>
        <header className="w-screen mb-4">
          <Header />
        </header>
        <div>{children}</div>
        <Toaster />
        <SpeedInsights />
        <GoogleTagManager 
          gtmId={process.env.NEXT_PUBLIC_GA_ID!}
          gtmScriptUrl={"https://www.googletagmanager.com/ns.html?id="+ process.env.NEXT_PUBLIC_GA_ID}
        />
      </body>
    </html>
  );
}
