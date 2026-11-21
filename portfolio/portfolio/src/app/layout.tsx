import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Khaidar Sinaan As-Shidqii | Full-Stack Web Developer",
  description:
    "Freelance full-stack web developer building online stores, POS systems, admin dashboards and websites with Next.js, React, Laravel and MySQL.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    title: "Khaidar Sinaan As-Shidqii | Full-Stack Web Developer",
    description:
      "Freelance full-stack web developer building online stores, POS systems, admin dashboards and websites.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Khaidar Sinaan As-Shidqii, Full-Stack Web Developer" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
