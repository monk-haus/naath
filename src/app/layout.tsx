import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL('https://naathmodels.com'),
  title: {
    default: "Naath Model Management",
    template: "%s | Naath Model Management",
  },
  description: "Defining the face of tomorrow. A boutique high-fashion model management agency operating in London, New York, and Paris.",
  keywords: ["Model Management", "Fashion Agency", "Editorial Models", "High Fashion", "Scouting", "Modeling Agency London", "Modeling Agency NYC", "Modeling Agency Paris", "Boutique Agency"],
  authors: [{ name: "Naath Model Management" }],
  creator: "Naath Model Management",
  publisher: "Naath Model Management",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Naath Model Management",
    description: "Defining the face of tomorrow. A boutique high-fashion model management agency.",
    url: "https://naathmodels.com",
    siteName: "Naath Model Management",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Naath Model Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naath Model Management",
    description: "Defining the face of tomorrow.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
      <body className="antialiased bg-alabaster text-charcoal min-h-screen flex flex-col w-full max-w-[100vw]">
        <Header />
        <div className="flex-grow w-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}