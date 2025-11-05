import type { SVGProps } from "react";

interface DiscordIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function DiscordIcon({ className, ...props }: DiscordIconProps) {
  return (
    <img
      src="/eagle-investors-logo.png"
      alt="Eagle Investors"
      className={`w-6 h-6 ${className}`}
      {...props}
    />
  );
}
