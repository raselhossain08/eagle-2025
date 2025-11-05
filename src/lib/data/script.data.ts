import type {
  User,
  SubscriptionPlan,
  TradingScript,
  EducationContent,
  MarketIndex,
  MentorshipPackage,
  AcademyCategory,
} from "../types";

// Mock user data. In a real app, this would come from your auth provider.
// We'll set the user to 'Script' to showcase the script tier features.
export const mockUser: User = {
  name: "Alex Johnson",
  email: "alex.j@example.com",
  avatarUrl: "/placeholder.svg?width=40&height=40",
  subscription: "Script",
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

export const eagleAcademyCategories: AcademyCategory[] = [
  {
    name: "Start Trading",
    videos: [
      {
        id: "v001",
        title: "Broker / Trading Platform Comparison",
        videoId: "0Yy3-ph0kS0",
      },
      {
        id: "v002",
        title: "Introduction to the Stock Market",
        videoId: "cDf0HgMYf_I",
      },
      {
        id: "v003",
        title: "Investment & Trading Products",
        videoId: "ypfiThp7WoQ",
      },
      {
        id: "v004",
        title: "Stocks vs ETF's Comparison",
        videoId: "LfE-_gIMeLg",
      },
      {
        id: "v005",
        title: "Long Term Investing Tutorial",
        videoId: "GoELOuINJAI",
      },
      { id: "v006", title: "Best Practices", videoId: "oQJgu7cVYME" },
      {
        id: "v007",
        title: "Day vs Swing Trading Comparison",
        videoId: "Q7HNDrkxYcM",
      },
    ],
  },
  {
    name: "Fundamental Analysis",
    videos: [
      {
        id: "v008",
        title: "Developing Market Awareness",
        videoId: "N1atMOhNzwg",
      },
      { id: "v009", title: "Macroeconomics", videoId: "0H7LjVnrsQ8" },
      {
        id: "v010",
        title: "Market & Sector Rotations",
        videoId: "gWNXdV0Ch10",
      },
      {
        id: "v011",
        title: "Global Markets & Exchanges",
        videoId: "4Ft21q9Juv8",
      },
    ],
  },
  {
    name: "Technical Analysis",
    videos: [
      {
        id: "v012",
        title: "Introduction to Technical Analysis",
        videoId: "oa7Ig97N_ug",
      },
      {
        id: "v013",
        title: "Technical Analysis Patterns - Essentials",
        videoId: "1h3b2XXbVp8",
      },
      { id: "v014", title: "ThinkorSwim Tutorial", videoId: "CQOSL3hhkdo" },
      { id: "v015", title: "Indicators & Scanners", videoId: "pQaWcT3czt8" },
      { id: "v016", title: "Elliot Wave", videoId: "b9cw7ne7aOQ" },
      {
        id: "v017",
        title: "Elliot Wave Part 2 + Fibonacci",
        videoId: "yh7ZdpzkZCA",
      },
    ],
  },
  {
    name: "Account Management Essentials",
    videos: [
      { id: "v018", title: "Setting a Stop Loss", videoId: "I0YugH2wl7s" },
      {
        id: "v019",
        title: "Portfolio Management Introduction",
        videoId: "SZVtmfW6EF0",
      },
      {
        id: "v020",
        title: "Dollar Cost Averaging (DCA)",
        videoId: "7rhCvS3GtN0",
      },
      {
        id: "v021",
        title: "Diversification, Hedging, Risk Management - Essential",
        videoId: "WW53e2qm1iA",
      },
      { id: "v022", title: "Small Account Tips", videoId: "It3wewPXt-M" },
    ],
  },
  {
    name: "Options Trading",
    videos: [
      {
        id: "v023",
        title: "Single Leg Options (Calls & Puts)",
        videoId: "8DesS7-s2KE",
      },
      {
        id: "v024",
        title: "Multi Leg Options (Spreads)",
        videoId: "Np0Yh3WPghc",
      },
      {
        id: "v025",
        title: "Option Sizing - Essential",
        videoId: "FaLpR_o4Vow",
      },
      { id: "v026", title: "Complex Strategies", videoId: "1duu-FTXMIs" },
      { id: "v027", title: "Options for Hedging", videoId: "XHtwajVMoIY" },
    ],
  },
  {
    name: "Day Trading Education",
    videos: [
      {
        id: "v028",
        title: "Day Trading Strategy Tutorial 1",
        videoId: "JnkdupmZ0Eo",
      },
      {
        id: "v029",
        title: "Day Trading Strategy Tutorial 2",
        videoId: "cp6L40JpOMw",
      },
      {
        id: "v030",
        title: "Option Day Trading Tutorial",
        videoId: "CB4Z3yMXct0",
      },
    ],
  },
  {
    name: "Cryptocurrency",
    videos: [
      { id: "v031", title: "Introduction to Crypto", videoId: "W0ptIFGjUis" },
      {
        id: "v032",
        title: "Trading & Investing with Crypto",
        videoId: "uQtLLY6ctog",
      },
    ],
  },
];

// Educational scripts type - using generic interface
interface EducationalScript {
  id: string;
  title: string;
  description: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  features: string[];
  tags?: Array<{ text: string; color: string; }>;
  details?: any;
  image?: string;
  guideLink?: string;
}

export const educationalScripts: EducationalScript[] = [
  {
    id: "eagle-algo",
    title: "Eagle Algo - Custom Contrarian",
    description:
      "Advanced Trading Algorithm with custom Eagle Advisor curated momentum indicators.",
    tags: [
      { text: "Real-Time", color: "green" },
      { text: "All Assets/Tickers", color: "blue" },
      { text: "All timeframes", color: "yellow" },
    ],
    details: {
      category: "Stocks",
      catersTo: "Everyone",
      timeframe: "All timeframes",
      analysisType: "Custom algorithms",
    },
    image: "/eagle-algo-tsla-ibit-chart.png", // Updated to use the new TSLA/IBIT chart
    features: [
      "Contrarian signals",
      "Momentum indicators",
      "Volatility analysis",
      "Market structure",
    ],
    guideLink: "/hub/scripts/contrarian-momentum/guide",
  },
  {
    id: "swing-king",
    title: "Swing King",
    description:
      "Swing Trading System with Take Profit and Stop Loss Levels identifying optimal trades, best used on 1hour chart.",
    tags: [
      { text: "Active Alerts", color: "green" },
      { text: "Most Tickers", color: "blue" },
      { text: "30min, 1hr", color: "yellow" },
    ],
    details: {
      category: "Swing Trading",
      catersTo: "Most Traders",
      timeframe: "30min, 1hr",
      analysisType: "Advanced algorithms",
    },
    image: "/swing-king-meta-chart.png", // Updated to use the new META chart
    features: [
      "Trend identification",
      "Support/resistance levels",
      "Volume analysis",
      "Risk/Reward Profile",
    ],
    guideLink: "/hub/scripts/swing-king/guide",
  },
  {
    id: "momentum-scalper",
    title: "Momentum Scalper",
    description:
      "High-Frequency scalping algorithm suited for lowertime frames with real time buy/sell signals and a take profit level.",
    tags: [
      { text: "Live Signals", color: "green" },
      { text: "Short Term", color: "blue" },
      { text: "1m, 3m, 5m", color: "yellow" },
    ],
    details: {
      category: "Day Trading",
      catersTo: "Scalpers",
      timeframe: "1m, 3m, 5m",
      analysisType: "Quick Trades",
    },
    image: "/script-example-hood.png",
    features: [
      "Real-time signals",
      "Price Target Generation",
      "Quick Moves",
      "Multi-timeframe analysis",
    ],
    guideLink: "/hub/scripts/momentum-scalper/guide",
  },
];
