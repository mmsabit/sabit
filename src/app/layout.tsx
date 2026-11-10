import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabit-portfolio-hazel.vercel.app"),
  title: "M M Sabit | Full-Stack Web Developer",
  description:
    "M M Sabit is a Full-Stack Web Developer and Frontend Engineer specializing in React.js, Next.js, TypeScript, and modern web applications.",
  keywords: [
    "M M Sabit",
    "Full-Stack Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Designer",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "MySQL",
  ],
  authors: [{ name: "M M Sabit" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "M M Sabit | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer crafting responsive, modern, and user-focused digital experiences with React, Next.js, and scalable web technologies.",
    url: "https://sabit-portfolio-hazel.vercel.app/",
    siteName: "M M Sabit",
    images: [
      {
        url: "/img/profile.jpg",
        width: 800,
        height: 800,
        alt: "M M Sabit",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M M Sabit | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer crafting responsive, modern, and user-focused digital experiences with React, Next.js, and scalable web technologies.",
    images: ["/img/profile.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} scroll-smooth`}>
      <head>
        {/* Font Awesome 5 */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-screen bg-white font-roboto text-secondary antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
