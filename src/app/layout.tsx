// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "./components/Footer";
import { Header } from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Shere Khan Restaurant | Online Ordering in Altrincham, UK",
  description:
    "Order delicious food online from Shere Khan Restaurant in Altrincham, UK. Freshly prepared meals with fast pickup & delivery options.",
  keywords: [
    "Shere Khan Restaurant",
    "Restaurant in Altrincham",
    "UK restaurant",
    "order food online Altrincham",
    "takeaway Altrincham",
    "delivery restaurant UK",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shere Khan Restaurant | Order Online",
    description:
      "Enjoy authentic meals at Shere Khan Restaurant in Altrincham, UK. Order online for pickup or delivery.",
    url: SITE_URL,
    siteName: "Shere Khan Restaurant",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shere Khan Restaurant | Order Online",
    description:
      "Enjoy authentic meals at Shere Khan Restaurant in Altrincham, UK. Order online for pickup or delivery.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  applicationName: "Shere Khan Restaurant",
  category: "Food & Drink",
};

export const viewport: Viewport = {
  themeColor: "#F15A24",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Shere Khan Restaurant",
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Altrincham",
    addressRegion: "England",
    addressCountry: "GB",
  },
  servesCuisine: ["Desi", "Pakistani", "Indian"],
  acceptsReservations: "True",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance hints (safe to keep even if the widget is not on the first paint) */}
        <link rel="preconnect" href="https://widget.deliverect.com" crossOrigin="" />
        {/* If you have these assets, keep them to improve LCP; remove if unused */}
        <link rel="preload" as="image" href="/gallery/hero-cover.jpg" />
        <link rel="preload" as="image" href="/og.jpg" />
        <link rel="preload" as="video" href="/vid.mp4" type="video/mp4" />
        {/* JSON-LD for richer search appearance */}
        <Script id="org-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(orgJsonLd)}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header/>
        {children}
        <Footer/>

        {/* ✅ Deliverect Widget (config first, then script) */}
        <Script id="deliverect-config" strategy="afterInteractive">
          {`window.DeliverectWidgetClient = "shere-khan-restaurants";`}
        </Script>
        <Script
          id="deliverect-widget"
          src="https://widget.deliverect.com/widget.v1.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
