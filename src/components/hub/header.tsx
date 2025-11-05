"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LifeBuoy, LogOut, Settings } from "lucide-react";
import type { User } from "@/lib/types";
import TradingViewTickerTape from "./tradingview-ticker-tape";
import { useAuth } from "@/context/authContext";

export default function Header({ user }: { user: User }) {
  const { logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-6 bg-brand-bg-light/80 backdrop-blur-sm border-b border-brand-border">
      <div className="flex items-center w-full h-full">
        {/* TradingView Ticker Tape - takes up most of the space */}
        <div className="flex-1 h-full flex items-center min-w-0">
          <div className="w-full h-10">
            <TradingViewTickerTape />
          </div>
        </div>

        {/* User controls on the right - replaced avatar with eagle logo */}
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative w-10 h-10 rounded-full p-0"
              >
                <img
                  src="/eagle-profile-logo.png"
                  alt="Eagle Investors Profile"
                  className="w-10 h-10 rounded-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-brand-bg-light border-brand-border text-white"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-gray-400">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-brand-border" />
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="w-4 h-4 mr-2" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-brand-border" />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
