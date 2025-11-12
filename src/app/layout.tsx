import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Eagle Investors - Registered Investment Strategies & Active Trade Intelligence",
  description:
    "Discover how our registered investment advisor equips clients with institution-style market tools, curated alerts, and personalized advisory services to help navigate every market cycle.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authContext";
import { AnalyticsProvider } from "@/context/analyticsContext";
import { AnalyticsTracker } from "@/components/common/AnalyticsTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <AnalyticsProvider>
            <AnalyticsTracker />
            {children}
            <Toaster />
          </AnalyticsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
