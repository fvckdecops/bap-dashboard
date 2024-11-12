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
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  authors: { url: "https://adjipratama.web.id", name: process.env.NEXT_PUBLIC_APP_NAME },
  keywords: ["Bagas Adji Pratama", "Bagas Adji", "Pratama", "Web Developer", "Web Dev", "Full-stack Developer", "Fullstack", "Developer", "Frontend Developer", "Backend Developer"],
  icons: '/bap.ico'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="m-0 p-0" suppressHydrationWarning>
      <GoogleTagManager 
        gtmId={process.env.NEXT_PUBLIC_GA_ID!}
      />
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
      </body>
    </html>
  );
}
