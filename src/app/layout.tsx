import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
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
