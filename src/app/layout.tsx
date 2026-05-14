import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SmoothScrolling from "@/components/SmoothScrolling";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-alexandria",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Corpenta - تأسيس الشركات في السعودية",
  description: "نساعد المستثمرين ورواد الأعمال الأجانب على تأسيس شركاتهم في السعودية بشكل قانوني واحترافي، مع دعم كامل من بداية الإجراءات وحتى تشغيل الشركة.",
  keywords: ["تأسيس شركة", "السعودية", "استثمار أجنبي", "Corpenta", "MISA", "رخصة استثمار"],
  authors: [{ name: "Corpenta" }],
  icons: {
    icon: "https://corpenta.com/wp-content/uploads/2025/12/logo-corpenta.png-512.png",
  },
  openGraph: {
    title: "Corpenta - تأسيس الشركات في السعودية",
    description: "أسس شركتك في السعودية بثقة ووضوح",
    url: "https://corpenta.com",
    siteName: "Corpenta",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${alexandria.variable} antialiased bg-background text-foreground`}>
        <SmoothScrolling>
          {children}
          <Toaster />
        </SmoothScrolling>
      </body>
    </html>
  );
}
