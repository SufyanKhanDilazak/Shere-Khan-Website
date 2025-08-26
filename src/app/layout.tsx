// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Montserrat, Bebas_Neue, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "./components/Footer";
import { Header } from "./components/Navbar";

// Body text
const fontBody = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

// Headings (poster style)
const fontHeading = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-heading",
});

// Optional mono
const fontMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sherekhankitchen.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Shere Khan Kitchen | Online Ordering in Altrincham, UK",
  description:
    "Order delicious food online from Shere Khan Kitchen in Altrincham, UK. Freshly prepared meals with fast pickup & delivery options.",
  keywords: [
    "Shere Khan Kitchen",
    "Restaurant in Altrincham",
    "UK restaurant",
    "order food online Altrincham",
    "takeaway Altrincham",
    "delivery restaurant UK",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shere Khan Kitchen | Order Online",
    description:
      "Enjoy authentic meals at Shere Khan Kitchen in Altrincham, UK. Order online for pickup or delivery.",
    url: SITE_URL,
    siteName: "Shere Khan Kitchen",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og.jpg" }], // make sure /public/og.jpg exists
  },
  twitter: {
    card: "summary_large_image",
    title: "Shere Khan Kitchen | Order Online",
    description:
      "Enjoy authentic meals at Shere Khan Kitchen in Altrincham, UK. Order online for pickup or delivery.",
    images: ["/og.jpg"], // use the same OG image here
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
  applicationName: "Shere Khan Kitchen", // fixed typo
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
  name: "Shere Khan Kitchen",
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`, // ensure /public/logo.png exists
  address: {
    "@type": "PostalAddress",
    addressLocality: "Altrincham",
    addressRegion: "England",
    addressCountry: "GB",
  },
  servesCuisine: ["Desi", "Pakistani", "Indian"],
  acceptsReservations: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontBody.variable} ${fontHeading.variable} ${fontMono.variable}`}
    >
      <head>
        {/* Performance hints */}
        <link rel="preconnect" href="https://widget.deliverect.com" crossOrigin="" />
        {/* Preloads (only keep if these files exist) */}
        <link rel="preload" as="image" href="/gallery/hero-cover.jpg" />
        <link rel="preload" as="image" href="/logo.png" />
        <link rel="preload" as="video" href="/vid.mp4" type="video/mp4" />
        {/* JSON-LD */}
        <Script id="org-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(orgJsonLd)}
        </Script>
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />

        {/* Deliverect Widget */}
        <Script id="deliverect-config" strategy="afterInteractive">
          {`window.DeliverectWidgetClient = "shere-khan-kitchen";`}
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
