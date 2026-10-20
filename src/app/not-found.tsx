import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotFoundContent } from "@/components/NotFoundContent";

// Import English messages for the root 404 page
import enMessages from "../../messages/en.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Root-level not-found with the same layout as other pages
export default function RootNotFound() {
  // This route sits outside [locale], so nothing has told next-intl which locale is being
  // rendered. Left unset, its request config falls back to reading `headers()` and the page
  // cannot be exported statically.
  //
  // English, not `routing.defaultLocale`: the messages imported above are the English ones and
  // `<html lang>` below says en. Using the default locale here would label a Vietnamese page
  // that renders English text.
  setRequestLocale("en");

  return (
    <html lang="en" className={inter.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('pulse-theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-grid min-h-screen">
        <NextIntlClientProvider messages={enMessages} locale="en">
          <ThemeProvider>
            <Navbar />
            <main>
              <NotFoundContent />
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
