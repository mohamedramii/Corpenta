import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
