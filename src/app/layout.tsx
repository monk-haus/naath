import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL('https://naathmodels.com'),
  title: "Naath Model Management",
  description: "Defining the face of tomorrow. A model management agency.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Naath Model Management",
    description: "Defining the face of tomorrow. A model management agency.",
    url: "https://naathmodels.com",
    siteName: "Naath Model Management",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: '#F9F8F4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-alabaster text-charcoal min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
        <Header />
        <div className="flex-grow w-full">
          {children}
        </div>
      </body>
    </html>
  );
}