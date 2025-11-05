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
  id?: string;
  name: string;
  videos: AcademyVideo[];
  isInfinity?: boolean;
  isInfinityExclusive?: boolean;
  description?: string;
  icon?: string | any; // Allow both string and React component
};
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "superadmin"; // adjust as needed
  subscription: "None" | "Basic" | "Diamond" | "Infinity" | "Script"; // Add subscription field
  contracts?: Array<{
    productType: string;
    status: string;
    subscriptionEndDate: string;
    subscriptionStartDate: string;
    _id: string;
  }>; // Add contracts field
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface ContractData {
  name: string;
  email: string;
  signature: string;
  productType: string;
  pdfPath: string;
  subscriptionType: "monthly" | "annual";
  amount: string;
  isDiamondContract: boolean;
  contractDate: string;
  productName: string;
}
