import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khaidar Sinaan As-Shidqii | Full-Stack Web Developer",
  description:
    "Freelance full-stack web developer building online stores, POS systems, admin dashboards and websites with Next.js, React, Laravel and MySQL.",
  icons: { icon: "/favicon.ico" },
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
