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
  metadataBase: new URL("https://link.yoldosh.uz"),

  title: "Yo'ldosh — O‘zbekiston bo‘ylab hamroh toping",

  description:
    "O‘zbekiston bo‘ylab xavfsiz va qulay safarlar.",

  openGraph: {
    title: "Yo'ldosh — O‘zbekiston bo‘ylab hamroh toping",
    description:
      "O‘zbekiston bo‘ylab xavfsiz va qulay safarlar.",
    url: "https://link.yoldosh.uz",
    siteName: "Yo'ldosh",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "/og-uz-v2.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Yo'ldosh — O‘zbekiston bo‘ylab hamroh toping",
    description:
      "O‘zbekiston bo‘ylab xavfsiz va qulay safarlar.",
    images: ["/og-uz-v2.png"],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
