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
  title: {
    default: "Table Chef",
    template: "%s | Table Chef",
  },

  description:
    "Table Chef Mauritius — seafood, pasta and Mauritian cuisine in a refined dining atmosphere.",

  applicationName: "Table Chef",

  openGraph: {
    title: "Table Chef",
    description:
      "Seafood, pasta and Mauritian cuisine in a refined dining atmosphere.",
    url: "https://table-chef.vercel.app",
    siteName: "Table Chef",
    type: "website",
    locale: "en_MU",
  },

  twitter: {
    card: "summary_large_image",
    title: "Table Chef",
    description:
      "Seafood, pasta and Mauritian cuisine in a refined dining atmosphere.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}