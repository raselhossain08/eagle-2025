export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  subscription: "Diamond" | "Infinity" | "None" | "Basic" | "Script";
};

export type SubscriptionPlan = {
  name: "Diamond" | "Infinity";
  price: string;
  features: string[];
  isCurrent: boolean;
  isRecommended?: boolean;
};

export type MentorshipPackage = {
  id: string;
  name: string;
  description: string;
  regularPrice: number;
  memberPrice: number;
  savings: number;
  badge: string | null;
  badgeColor: string | null;
  icon: string;
  iconBg: string;
  borderColor: string;
  buttonColor: string;
  glowClass: string;
  features: string[];
};

export type TradingScript = {
  id: string;
  name: string;
  description: string;
  access: "Infinity" | "Purchase";
};

export type EducationContent = {
  id: string;
  title: string;
  type: "Video" | "Article" | "Webinar";
  duration?: string;
  thumbnailUrl: string;
};

export type MarketIndex = {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
};

export type AdminAnnouncement = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
  author: string;
};

// Keep the old type for backward compatibility if needed elsewhere
export type CommunityPost = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    username: string;
  };
  content: string;
  timestamp: string;
  tags: string[];
  image?: string;
};

export type AcademyVideo = {
  id: string;
  title: string;
  videoId: string;
  duration?: string;
  thumbnailUrl?: string;
  type?: string;
};

export type AcademyCategory = {
  name: string;
  videos: AcademyVideo[];
  isInfinity?: boolean;
};

export type EducationalScript = {
  id: string;
  title: string;
  description: string;
  tags: { text: string; color: "green" | "blue" | "yellow" | "cyan" }[];
  details: {
    category: string;
    catersTo: string;
    timeframe: string;
    analysisType: string;
  };
  image: string;
  features: string[];
  guideLink: string;
};
