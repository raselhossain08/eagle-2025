import type {
  User,
  SubscriptionPlan,
  TradingScript,
  EducationContent,
  MarketIndex,
  MentorshipPackage,
  AcademyVideo,
  AcademyCategory,
} from "../types";

// InfinityCategory type for backward compatibility
type InfinityCategory = AcademyCategory;
import { BookOpen } from "lucide-react";

// Mock user data. In a real app, this would come from your auth provider.
// We'll set the user to 'Diamond' to showcase the upgrade prompts.
export const mockUser: User = {
  name: "Alex Johnson",
  email: "alex.j@example.com",
  avatarUrl: "/placeholder.svg?width=40&height=40",
  subscription: "Infinity",
};

// Dynamic subscription plans - loaded from API
export let subscriptionPlans: SubscriptionPlan[] = [];

// Load plans from API
import { getPublicPlans, formatPlanPrice } from '../services/api/plan';

// Initialize subscription plans from API
const initializeSubscriptionPlans = async () => {
  try {
    const apiPlans = await getPublicPlans();
    subscriptionPlans = apiPlans
      .filter(plan => plan.planType === 'subscription' && plan.isActive)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map(plan => ({
        name: (plan.displayName === 'Diamond Plan' ? 'Diamond' : 
               plan.displayName === 'Infinity Plan' ? 'Infinity' : 
               'Diamond') as "Diamond" | "Infinity",
        price: formatPlanPrice(plan, 'monthly'),
        features: plan.features || [],
        isCurrent: mockUser.subscription === plan.displayName,
        isRecommended: plan.isPopular || false,
      }));
  } catch (error) {
    console.error('Failed to load subscription plans:', error);
    // Fallback to basic structure
    subscriptionPlans = [
      {
        name: "Diamond",
        price: "Contact for pricing",
        features: ["Contact us for current features"],
        isCurrent: false,
      },
      {
        name: "Infinity", 
        price: "Contact for pricing",
        features: ["Contact us for current features"],
        isCurrent: false,
        isRecommended: true,
      },
    ];
  }
};

// Initialize on module load
initializeSubscriptionPlans();

export const mentorshipPackages: MentorshipPackage[] = [
  {
    id: "eagle-ultimate",
    name: "Eagle Ultimate",
    description: "Comprehensive 8-hour mentorship program with premium access",
    regularPrice: 2497,
    memberPrice: 1827,
    savings: 1164,
    badge: "Most Comprehensive",
    badgeColor: "orange",
    icon: "👑",
    iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
    borderColor: "border-yellow-500",
    buttonColor:
      "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
    glowClass: "shadow-glow-yellow",
    features: [
      "8 Hours of 1on1 Sessions",
      "1 Year Diamond ($1,164 value)",
      "All Inclusive Package",
      "8 Hours of Trading Tutor OR 8 Hours of Advising",
      "Personalized strategy development",
      "Complete portfolio review",
      "Advanced risk management techniques",
      "Long-term mentorship relationship",
    ],
  },
  {
    id: "investment-advising",
    name: "Investment Advising",
    description:
      "Focus on long-term investment strategies and portfolio building",
    regularPrice: 987,
    memberPrice: 786,
    savings: 201,
    badge: null,
    badgeColor: null,
    icon: "📈",
    iconBg: "bg-gradient-to-br from-brand-green to-green-600",
    borderColor: "border-brand-green",
    buttonColor:
      "bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90",
    glowClass: "shadow-glow-blue",
    features: [
      "3 Hours of 1on1 Sessions",
      "3 Months Diamond",
      "Setup Tax Advantaged Account",
      "Learn How To Invest",
      "Financial Plan Creation",
      "Portfolio optimization strategies",
      "Tax-efficient investing guidance",
      "Retirement planning assistance",
    ],
  },
  {
    id: "trading-tutor",
    name: "Trading Tutor",
    description: "Master active trading strategies and market timing",
    regularPrice: 987,
    memberPrice: 786,
    savings: 201,
    badge: null,
    badgeColor: null,
    icon: "💎",
    iconBg: "bg-gradient-to-br from-brand-primary to-purple-600",
    borderColor: "border-brand-primary",
    buttonColor:
      "bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90",
    glowClass: "shadow-glow-blue",
    features: [
      "3 Hours of 1on1 Sessions",
      "3 Months Diamond",
      "Learn to day trade/swing trade + options trade",
      "Tune your trading strategy",
      "Risk management for active trading",
      "Technical analysis mastery",
      "Entry and exit timing strategies",
      "Psychology of trading",
    ],
  },
];

export const tradingScripts: TradingScript[] = [
  {
    id: "ts001",
    name: "Momentum Scalper Pro",
    description: "A high-frequency scalping script for volatile markets.",
    access: "Infinity",
  },
  {
    id: "ts002",
    name: "Swing King",
    description: "Identifies long-term swing trading opportunities.",
    access: "Infinity",
  },
  {
    id: "ts003",
    name: "Dividend Hunter",
    description: "Finds high-yield dividend stocks with growth potential.",
    access: "Purchase",
  },
  {
    id: "ts004",
    name: "Crypto Wave Rider",
    description: "Analyzes crypto market waves for optimal entry/exit.",
    access: "Infinity",
  },
];

export const educationLibrary: EducationContent[] = [
  {
    id: "ed001",
    title: "Advanced Chart Patterns",
    type: "Video",
    duration: "45 min",
    thumbnailUrl: "/placeholder.svg?width=400&height=225",
  },
  {
    id: "ed002",
    title: "Options Trading Fundamentals",
    type: "Article",
    thumbnailUrl: "/placeholder.svg?width=400&height=225",
  },
  {
    id: "ed003",
    title: "Risk Management Strategies",
    type: "Webinar",
    duration: "1 hr 15 min",
    thumbnailUrl: "/placeholder.svg?width=400&height=225",
  },
  {
    id: "ed004",
    title: "Algorithmic Trading with Python",
    type: "Video",
    duration: "2 hr 30 min",
    thumbnailUrl: "/placeholder.svg?width=400&height=225",
  },
];

export const marketIndices: MarketIndex[] = [
  { symbol: "DOW", price: "39,112.16", change: "+0.18%", isPositive: true },
  { symbol: "NASDAQ", price: "17,689.36", change: "-0.11%", isPositive: false },
  { symbol: "S&P 500", price: "5,464.62", change: "-0.06%", isPositive: false },
  {
    symbol: "RUSSELL 2K",
    price: "2,022.03",
    change: "+0.43%",
    isPositive: true,
  },
  { symbol: "BTC/USD", price: "61,543.8", change: "+1.25%", isPositive: true },
];

// Updated to admin announcements instead of community posts
export const adminAnnouncements = [
  {
    id: "ann1",
    title: "New Trading Scripts Available for Infinity Members",
    content:
      "We're excited to announce the release of two new professional trading scripts: 'Momentum Scalper Pro' and 'Crypto Wave Rider'. These advanced algorithms are now available for download in your Trading Scripts section.",
    timestamp: "2 days ago",
    priority: "high" as const,
    author: "Eagle Investors Team",
  },
  {
    id: "ann2",
    title: "IMPORTANT: Discord Security Alert - Beware of Imposters",
    content:
      "BEWARE OF ANY IMPOSTERS who attempt to friend request or DM you using copycat accounts! Eagle Investors advisors will NEVER friend request you for any reason. Anyone sending friend requests that look like our accounts is an imposter and should be reported to Discord. Please examine all profiles closely to ensure you are not being scammed. Email us at " +
      (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@eagle-investors.com") +
      " if you need confirmation. We will never solicit you to any other domain other than " +
      (process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://eagle-investors.com/") +
      " and will never DM you about copy trading or depositing money anywhere. Stay Safe!",
    timestamp: "1 day ago",
    priority: "medium" as const,
    author: "Eagle Investors Team",
  },
  {
    id: "ann3",
    title: "Introducing AI Advisor - Revolutionary Investment Intelligence",
    content:
      "We're excited to announce our groundbreaking AI Advisor technology! Diamond members now have access to AI Advisor in our Discord community for real-time market insights. Infinity members get exclusive access to our Enhanced AI Advisor - a revolutionary breakthrough in investment intelligence with advanced algorithms, personalized portfolio analysis, and institutional-grade market research capabilities.",
    timestamp: "3 days ago",
    priority: "high" as const,
    author: "Eagle Investors Team",
  },
  {
    id: "ann4",
    title: "Enhanced AI Advisor Features Now Live",
    content:
      "Infinity members can now access our enhanced AI Advisor with improved market analysis capabilities, real-time sentiment analysis, and personalized portfolio recommendations. Update your preferences in the AI Advisor section.",
    timestamp: "1 week ago",
    priority: "low" as const,
    author: "Eagle Investors Team",
  },
];

export const watchlistItems = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: "190.64",
    change: "+0.33%",
    isPositive: true,
    logoUrl: "/placeholder.svg?width=40&height=40",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: "175.21",
    change: "-0.17%",
    isPositive: false,
    logoUrl: "/placeholder.svg?width=40&height=40",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: "450.23",
    change: "+0.51%",
    isPositive: true,
    logoUrl: "/placeholder.svg?width=40&height=40",
  },
];

const extractVideoId = (url: string): string => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    }
    if (
      urlObj.hostname === "www.youtube.com" ||
      urlObj.hostname === "youtube.com"
    ) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) return videoId;
    }
    // Fallback for URLs like https://www.youtube.com/watch?v=hN7GPNNYID0&t=6s
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    if (videoIdMatch) return videoIdMatch[1];
  } catch (e) {
    console.error("Invalid URL:", url);
  }
  return "";
};

const createVideoList = (
  videos: { title: string; url: string }[]
): AcademyVideo[] => {
  return videos.map(({ title, url }, index) => {
    const videoId = extractVideoId(url);
    return {
      id: `${videoId}-${index}`,
      title,
      url,
      videoId,
      thumbnailUrl: `${process.env.NEXT_PUBLIC_YOUTUBE_THUMBNAIL_BASE_URL || "https://img.youtube.com/vi"}/${videoId}/hqdefault.jpg`,
    };
  });
};

// Updated academyCurriculum with the requested changes
export const academyCurriculum: AcademyCategory[] = [
  {
    id: "start-trading",
    name: "Start Trading",
    description:
      "Begin your trading journey with these essential introductory videos.",
    icon: BookOpen,
    isInfinityExclusive: false,
    videos: createVideoList([
      {
        title: "Broker / Trading Platform Comparison",
        url: "https://www.youtube.com/watch?v=0Yy3-ph0kS0",
      },
      {
        title: "Introduction to the Stock Market",
        url: "https://www.youtube.com/watch?v=cDf0HgMYf_I",
      },
      {
        title: "Investment & Trading Products",
        url: "https://www.youtube.com/watch?v=ypfiThp7WoQ",
      },
      {
        title: "Stocks vs ETF's Comparison",
        url: "https://www.youtube.com/watch?v=LfE-_gIMeLg",
      },
      {
        title: "Long Term Investing Tutorial",
        url: "https://www.youtube.com/watch?v=GoELOuINJAI",
      },
      {
        title: "Best Practices",
        url: "https://www.youtube.com/watch?v=oQJgu7cVYME",
      },
      {
        title: "Day vs Swing Trading Comparison",
        url: "https://www.youtube.com/watch?v=Q7HNDrkxYcM",
      },
    ]),
  },
  {
    id: "fundamental-analysis",
    name: "Fundamental Analysis",
    description: "Understand the core drivers of market and asset value.",
    icon: BookOpen,
    isInfinityExclusive: false,
    videos: createVideoList([
      {
        title: "Developing Market Awarness",
        url: "https://www.youtube.com/watch?v=N1atMOhNzwg",
      },
      {
        title: "Macroeconomics",
        url: "https://www.youtube.com/watch?v=0H7LjVnrsQ8",
      },
      {
        title: "Market & Sector Rotations",
        url: "https://www.youtube.com/watch?v=gWNXdV0Ch10",
      },
      {
        title: "Global Markets & Exchanges",
        url: "https://www.youtube.com/watch?v=4Ft21q9Juv8",
      },
    ]),
  },
  {
    id: "technical-analysis",
    name: "Technical Analysis",
    description: "Master the art of reading charts and identifying patterns.",
    icon: BookOpen,
    isInfinityExclusive: false,
    videos: createVideoList([
      {
        title: "Introduction to Technical Analysis",
        url: "https://www.youtube.com/watch?v=oa7Ig97N_ug",
      },
      {
        title: "Technical Analysis Patterns - Essentials",
        url: "https://www.youtube.com/watch?v=1h3b2XXbVp8",
      },
      {
        title: "ThinkorSwim Tutorial",
        url: "https://www.youtube.com/watch?v=CQOSL3hhkdo",
      },
      {
        title: "Indicators & Scanners",
        url: "https://www.youtube.com/watch?v=pQaWcT3czt8",
      },
      {
        title: "Elliot Wave",
        url: "https://www.youtube.com/watch?v=b9cw7ne7aOQ",
      },
      {
        title: "Elliot Wave Part 2 + Fibonnaci",
        url: "https://www.youtube.com/watch?v=yh7ZdpzkZCA",
      },
    ]),
  },
  {
    id: "account-management",
    name: "Account Management Essentials",
    description: "Learn to manage your portfolio and risk effectively.",
    icon: BookOpen,
    isInfinityExclusive: false,
    videos: createVideoList([
      {
        title: "Setting a Stop Loss",
        url: "https://www.youtube.com/watch?v=I0YugH2wl7s",
      },
      {
        title: "Portfolio Management Introduction",
        url: "https://www.youtube.com/watch?v=SZVtmfW6EF0",
      },
      {
        title: "Dollar Cost Averaging (DCA)",
        url: "https://www.youtube.com/watch?v=7rhCvS3GtN0",
      },
      {
        title: "Diversification, Hedging , Risk Management - Essential",
        url: "https://www.youtube.com/watch?v=WW53e2qm1iA",
      },
      {
        title: "Small Account Tips",
        url: "https://www.youtube.com/watch?v=It3wewPXt-M",
      },
    ]),
  },
  {
    id: "options-trading",
    name: "Options Trading",
    description:
      "Dive into the world of options, from basics to advanced strategies.",
    icon: BookOpen,
    isInfinityExclusive: false,
    videos: createVideoList([
      {
        title: "Single Leg Options (Calls & Puts)",
        url: "https://www.youtube.com/watch?v=8DesS7-s2KE",
      },
      {
        title: "Mutli Leg Options (Spreads)",
        url: "https://www.youtube.com/watch?v=Np0Yh3WPghc",
      },
      {
        title: "Option Sizing - Essential",
        url: "https://www.youtube.com/watch?v=FaLpR_o4Vow",
      },
      {
        title: "Complex Strategies",
        url: "https://www.youtube.com/watch?v=1duu-FTXMIs",
      },
      {
        title: "Options for Hedging",
        url: "https://www.youtube.com/watch?v=XHtwajVMoIY",
      },
    ]),
  },
  {
    id: "day-trading",
    name: "Day Trading Education",
    description: "Strategies and techniques for short-term trading.",
    icon: BookOpen,
    isInfinityExclusive: false,
    videos: createVideoList([
      {
        title: "Day Trading Strategy Tutorial 1",
        url: "https://www.youtube.com/watch?v=JnkdupmZ0Eo",
      },
      {
        title: "Day Trading Strategy Tutorial 2",
        url: "https://www.youtube.com/watch?v=cp6L40JpOMw",
      },
      {
        title: "Option Day Trading Tutorial",
        url: "https://www.youtube.com/watch?v=CB4Z3yMXct0",
      },
    ]),
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    description: "An introduction to the crypto market.",
    icon: BookOpen,
    isInfinityExclusive: false,
    videos: createVideoList([
      {
        title: "Introduction to Crypto",
        url: "https://www.youtube.com/watch?v=W0ptIFGjUis",
      },
      {
        title: "Trading & Investing with Crypto",
        url: "https://www.youtube.com/watch?v=uQtLLY6ctog",
      },
    ]),
  },
];

export const infinityCurriculum: InfinityCategory[] = [
  {
    id: "market-structure",
    name: "MARKET STRUCTURE & ENVIRONMENT",
    icon: "📊",
    videos: createVideoList([
      {
        title: "Market Environment Introduction",
        url: "https://youtu.be/7t_3W00F54M",
      },
      {
        title: "Market Environment, High / Low Volatility",
        url: "https://youtu.be/RMiBTuKQous",
      },
      {
        title: "Federal Reserve & Interest Rates",
        url: "https://youtu.be/THXtzokcD20",
      },
      { title: "Assets", url: "https://www.youtube.com/watch?v=t7RNu8KfRdI" },
    ]),
  },
  {
    id: "infinity-technical-analysis",
    name: "TECHNICAL ANALYSIS",
    icon: "📈",
    videos: createVideoList([
      {
        title: "Technical Analysis Part 1",
        url: "https://youtu.be/fJSWOxgBv0Q",
      },
      {
        title: "Technical Analysis Part 2",
        url: "https://youtu.be/IyeheO90dn8",
      },
      { title: "Inter-Market Trading", url: "https://youtu.be/bjkyjVIbxDc" },
      {
        title: "Scanning for Stocks",
        url: "https://www.youtube.com/watch?v=nLwX9b01zq0",
      },
      {
        title: "Scanning for Stocks Deep Dive (Part 2)",
        url: "https://youtu.be/qlTSShuDvJA",
      },
      {
        title: "Open Interest",
        url: "https://www.youtube.com/watch?v=hN7GPNNYID0&t=6s",
      },
    ]),
  },
  {
    id: "trading-psychology",
    name: "TRADING PSYCHOLOGY",
    icon: "🧠",
    videos: createVideoList([
      {
        title: "Trading Psychology Part 1",
        url: "https://youtu.be/wlAgotbO5Jk",
      },
      {
        title: "Trading Psychology Part 2",
        url: "https://youtu.be/vEc0gZ3TwRo",
      },
      {
        title: "Treat Your Trading Like a Business",
        url: "https://www.youtube.com/watch?v=ABr8Dqx2b9g",
      },
    ]),
  },
  {
    id: "trade-planning",
    name: "TRADE PLANNING & STRATEGY",
    icon: "🗂️",
    videos: createVideoList([
      {
        title: "How To Make A Trade Plan",
        url: "https://youtu.be/hM46MqcfyN8",
      },
      { title: "Trade Plan & Journaling", url: "https://youtu.be/c-Mfy1wvrWM" },
      {
        title: "Trading Locations & Systems",
        url: "https://youtu.be/46LznuLzdY4",
      },
    ]),
  },
  {
    id: "fundamental-macro",
    name: "FUNDAMENTAL & MACRO ANALYSIS",
    icon: "🧮",
    videos: createVideoList([
      {
        title: "Fundemental Analysis Part 1",
        url: "https://youtu.be/eKIY6loPJWk",
      },
      {
        title: "Fundamental Analysis Part 2",
        url: "https://youtu.be/z2KkG0XLg3k",
      },
      { title: "Macro Trading", url: "https://youtu.be/xesOFjwj6wY" },
    ]),
  },
  {
    id: "options-foundations",
    name: "OPTIONS EDUCATION – FOUNDATIONS",
    icon: "⚖️",
    videos: createVideoList([
      {
        title: "Introduction to The Greeks",
        url: "https://youtu.be/Bi7TTK3IlPg",
      },
      {
        title: "Option Greeks Advanced (Part 2)",
        url: "https://www.youtube.com/watch?v=52yV8BWRx78",
      },
      { title: "Option Spread Basics", url: "https://youtu.be/IMGNYSDjsx4" },
      {
        title: "Complex Option Strategies Introduction",
        url: "https://www.youtube.com/watch?v=JY0BqcStWiw",
      },
      {
        title: "Complex Option Strategies Deep Dive (Part 2)",
        url: "https://youtu.be/AQt0-NS_3KE",
      },
    ]),
  },
  {
    id: "advanced-options",
    name: "ADVANCED OPTIONS STRATEGIES",
    icon: "🛠️",
    videos: createVideoList([
      {
        title: "Portfolio Longevity, Complex Strategies",
        url: "https://youtu.be/wVGvMuwz7iw",
      },
      {
        title: "Portfolio Longevity, Probability",
        url: "https://youtu.be/5dkt4PF1ANE",
      },
      {
        title: "Alternative Trading Strategies",
        url: "https://youtu.be/7Zb-bOUVt9c",
      },
      {
        title: "Becoming A Volatility Trader",
        url: "https://youtu.be/ZRxIXM5206o",
      },
      { title: "Hedging Introduction", url: "https://youtu.be/lxgqHs-WDpw" },
      {
        title: "Option Swing Portfolio , Beta Weighted Delta",
        url: "https://youtu.be/U8qaKgOjXRI",
      },
    ]),
  },
  {
    id: "volatility-correlation",
    name: "VOLATILITY & CORRELATION CONCEPTS",
    icon: "📊",
    videos: createVideoList([
      { title: "Volatility Concepts", url: "https://youtu.be/rGkjuGRyS0I" },
      {
        title: "Asset Correlation Introduction",
        url: "https://youtu.be/mUqRmQd-P4E",
      },
      {
        title: "Asset Correlation, Uncorrelated Positions",
        url: "https://youtu.be/5W13xZWYBH4",
      },
    ]),
  },
  {
    id: "day-trading-short-term",
    name: "DAY TRADING & SHORT-TERM STRATEGIES",
    icon: "📉",
    videos: createVideoList([
      {
        title: "Day Trading Technical Strategy",
        url: "https://www.youtube.com/watch?v=2B6thqZaiqo",
      },
      {
        title: "Day Trading Options Essentials",
        url: "https://www.youtube.com/watch?v=CB4Z3yMXct0",
      },
      {
        title: "Credit Day Trading Intro",
        url: "https://youtu.be/tdejd5pZ7gs",
      },
      {
        title: "Credit Day Trading Advanced",
        url: "https://youtu.be/XzYbd_Zxw-c",
      },
      {
        title: "Earnings Trading Strategy",
        url: "https://youtu.be/wcfoymu8Ne0",
      },
      {
        title: "Earnings Trading Strategy Part 2 (Live Analysis)",
        url: "https://youtu.be/AfHM1jupHpw",
      },
    ]),
  },
  {
    id: "futures-trading",
    name: "FUTURES TRADING",
    icon: "📈",
    videos: createVideoList([
      {
        title: "Futures Introduction",
        url: "https://www.youtube.com/watch?v=EEsw8pQY5No",
      },
      {
        title: "Futures Deep Dive (Part 2)",
        url: "https://youtu.be/BQGkNS3J_J4",
      },
    ]),
  },
  {
    id: "retirement-income",
    name: "RETIREMENT & LONG-TERM INCOME",
    icon: "💼",
    videos: createVideoList([
      {
        title: "Retirement Income Part 1",
        url: "https://youtu.be/I_wBNcoQsZA",
      },
      {
        title: "Retirement Income Part 2",
        url: "https://youtu.be/dQx_BUNH8oE",
      },
    ]),
  },
  {
    id: "elliot-waves",
    name: "ELLIOT WAVES & FIBONACCI",
    icon: "📉",
    videos: createVideoList([
      {
        title: "Elliot Waves & Fibonnacci",
        url: "https://www.youtube.com/watch?v=yh7ZdpzkZCA",
      },
      {
        title: "Elliot Wave Session",
        url: "https://www.youtube.com/watch?v=b9cw7ne7aOQ",
      },
    ]),
  },
  {
    id: "account-misc",
    name: "ACCOUNT MANAGEMENT / MISC.",
    icon: "🧾",
    videos: createVideoList([
      {
        title: "Small Account Tips",
        url: "https://www.youtube.com/watch?v=It3wewPXt-M",
      },
    ]),
  },
];
