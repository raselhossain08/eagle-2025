import type React from "react";
import Header from "@/components/hub/header";
import { mockUser } from "@/lib/data/script.data";
import Footer from "@/components/hub/footer";
import ScriptSidebar from "@/components/hub/scriptSidebar";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  // In a real app, you'd fetch the user session here.
  const user = mockUser;

  return (
    <div className="min-h-screen bg-brand-bg-dark text-white">
      <ScriptSidebar user={user} />
      <div className="lg:pl-64">
        <Header user={user} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
