"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Gem,
  InfinityIcon,
  Bot,
  BookOpen,
  Lock,
  Users,
  UserCheck,
  User as UserIcon,
  CreditCard,
} from "lucide-react";
import type { User } from "@/lib/types";
import { DiscordIcon } from "@/components/icons/discord-icon";

const navigation = [
  { name: "Hub", href: "/hub/basic", icon: LayoutDashboard },
  {
    name: "Profile",
    href: "/hub/basic/profile",
    icon: UserIcon,
  },
  {
    name: "Private Sessions",
    href: "/hub/basic/private-sessions",
    icon: UserCheck,
  },
  {
    name: "AI Advisor",
    href: "/hub/basic/ai-advisor",
    icon: Bot,
    tier: "Infinity",
  },
  {
    name: "Trading Scripts",
    href: "/hub/basic/scripts",
    icon: InfinityIcon,
    tier: "Infinity",
  },
  {
    name: "Education Library",
    href: "/hub/basic/education",
    icon: BookOpen,
    tier: "Infinity",
  },
  { name: "Community", href: "/hub/basic/community", icon: Users },
  { name: "Billing & Invoices", href: "/hub/basic/billing", icon: CreditCard },
  { name: "Subscription", href: "/hub/basic/subscription", icon: Gem },
  {
    name: "Join Discord",
    href: "https://discord.gg/eagleinvestors",
    icon: DiscordIcon,
    external: true,
  },
];

export default function BasicSidebar({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-brand-border lg:bg-brand-bg-light">
      <div className="flex items-center h-16 px-6 shrink-0">
        <Link
          href="/hub/basic"
          className="flex items-center gap-3 text-white font-semibold"
        >
          <img
            src="/eagle-investors-logo.png"
            alt="Eagle Investors Logo"
            className="w-8 h-8"
          />
          <span className="text-lg">Eagle Investors</span>
        </Link>
      </div>
      <nav className="flex flex-col flex-1 px-4 mt-6">
        <ul role="list" className="flex flex-col flex-1 gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                // ✅ Use case-insensitive matching for exact product names
                const userSub = (user.subscription || "").toLowerCase();
                const hasAccess =
                  !item.tier ||
                  item.tier.toLowerCase() === userSub ||
                  userSub.includes(item.tier.toLowerCase());
                // Allow higher tier members to access lower tier content
                const canAccess =
                  !item.tier ||
                  userSub.includes("diamond") ||
                  userSub.includes("infinity");

                return (
                  <li key={item.name}>
                    <Link
                      href={canAccess ? item.href : "#"}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                        pathname === item.href
                          ? "bg-brand-bg-dark text-white"
                          : item.external
                          ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                          : "text-gray-400 hover:text-white hover:bg-brand-bg-dark/50",
                        !canAccess && "cursor-not-allowed opacity-50"
                      )}
                      aria-disabled={!canAccess}
                      tabIndex={!canAccess ? -1 : undefined}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                      {!hasAccess && (
                        <Lock className="w-4 h-4 ml-auto text-amber-400" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
