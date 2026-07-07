import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Shannon Rodriguez — Full-Stack Web Developer",
  description:
    "John Shannon O. Rodriguez is a full-stack developer and Magna Cum Laude candidate building the load-bearing systems cities run on — water billing, HRIS, immunization reporting, inventory, and point-of-sale.",
  keywords: [
    "John Shannon Rodriguez",
    "web developer",
    "full-stack developer",
    "Laravel",
    "React",
    "Supabase",
    "Next.js",
    "Parañaque",
    "Philippines",
    "portfolio",
  ],
  authors: [{ name: "John Shannon O. Rodriguez" }],
  openGraph: {
    title: "John Shannon Rodriguez — Full-Stack Web Developer",
    description:
      "Full-stack developer building civic systems: water billing, HRIS, immunization reporting, inventory & POS.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Shannon Rodriguez — Full-Stack Web Developer",
    description:
      "Full-stack developer building civic systems: water billing, HRIS, immunization reporting, inventory & POS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${instrument.variable} ${hanken.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
