import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khaidar Sinaan As-Shidqii | Aspiring Software Engineer",
  description:
    "Portfolio of Khaidar Sinaan As-Shidqii, a Software Engineering student at SMK N 1 Wonosobo building web projects with React, Next.js, Tailwind CSS and Laravel.",
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
