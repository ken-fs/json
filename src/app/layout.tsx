import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import HydrationFix from "@/components/HydrationFix";
import { I18nProvider } from "@/components/I18nProvider";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
    default: "JSON Tools - Free Online JSON Formatter, Validator & Converter",
    template: "%s | JSON Tools"
  },
  description: "Free online JSON formatter, validator, and converter. Format, minify, validate JSON data. Convert JSON to XML, CSV. Professional developer tools for JSON processing.",
  keywords: [
    "json formatter",
    "json validator",
    "json converter",
    "json minifier",
    "json to xml",
    "json to csv", 
    "online json tools",
    "json beautifier",
    "json parser",
    "format json online",
    "validate json",
    "json viewer",
    "json editor",
    "developer tools"
  ],
  authors: [{ name: "JSON Tools Team" }],
  creator: "JSON Tools",
  publisher: "JSON Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jsontools.io"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "zh-CN": "/?lang=zh",
      "es-ES": "/?lang=es",
      "pt-BR": "/?lang=pt"
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jsontools.io",
    title: "JSON Tools - Free Online JSON Formatter, Validator & Converter",
    description: "Free online JSON formatter, validator, and converter. Format, minify, validate JSON data. Convert JSON to XML, CSV. Professional developer tools for JSON processing.",
    siteName: "JSON Tools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JSON Tools - Professional JSON Processing"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Tools - Free Online JSON Formatter, Validator & Converter",
    description: "Free online JSON formatter, validator, and converter. Format, minify, validate JSON data. Convert JSON to XML, CSV.",
    images: ["/twitter-image.png"],
    creator: "@jsontools"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code"
    }
  }
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-6FX1CYKSLV";
const IS_PROD = process.env.NODE_ENV === "production";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JSON Tools" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <meta name="theme-color" content="#3b82f6" />
        {IS_PROD && GA_ID ? (
          <>
            <Script
              id="gtag-lib"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white`}
        suppressHydrationWarning={true}
      >
        <I18nProvider>
          <HydrationFix>
            <StructuredData />
            {IS_PROD && GA_ID ? <GoogleAnalytics /> : null}
            {children}
          </HydrationFix>
        </I18nProvider>
      </body>
    </html>
  );
}
