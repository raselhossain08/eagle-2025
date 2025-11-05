"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code,
  TrendingUp,
  Target,
  Clock,
  Activity,
  BarChart3,
  Brain,
  ArrowLeft,
  Download,
  Play,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getPricingInfo, formatPriceWithPeriod } from "@/lib/config/pricing.config";

const TRADING_SCRIPTS = [
  {
    id: 'eagle-algo-contrarian',
    name: 'Eagle Algo Contrarian',
    price: 47,
    category: 'Momentum',
    description: 'Advanced momentum indicators with contrarian signals for market reversals',
    features: [
      'Advanced momentum analysis',
      'Contrarian signal detection',
      'Multi-timeframe compatibility',
      'Risk management built-in'
    ],
    image: '/script-example-btc.png',
    rating: 4.8,
    downloads: '2.3k+'
  },
  {
    id: 'swing-king',
    name: 'Swing King',
    price: 47,
    category: 'Swing Trading',
    description: 'Optimal swing trading setups with precise entry and exit points',
    features: [
      'Swing pattern recognition',
      'Entry/exit optimization',
      'Support/resistance levels',
      'Trend confirmation signals'
    ],
    image: '/swing-king-meta-chart.png',
    rating: 4.9,
    downloads: '1.8k+'
  },
  {
    id: 'momentum-scalper',
    name: 'Momentum Scalper',
    price: 47,
    category: 'Scalping',
    description: 'High-frequency scalping signals for quick profit opportunities',
    features: [
      'High-frequency signals',
      'Quick profit targeting',
      'Low latency execution',
      'Real-time market scanning'
    ],
    image: '/script-example-hood.png',
    rating: 4.7,
    downloads: '3.1k+'
  },

];


const CATEGORIES = ['All', 'Momentum', 'Swing Trading', 'Scalping', 'Trend Following', 'Options', 'Cryptocurrency'];

export default function ScriptsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  // Get actual Infinity pricing
  const infinityPricing = getPricingInfo('infinity', 'monthly');

  // const filteredScripts = selectedCategory === 'All' 
  //   ? TRADING_SCRIPTS 
  //   : TRADING_SCRIPTS.filter(script => script.category === selectedCategory);

  const handlePurchaseScript = (script: any) => {
    try {
      const cartItem = {
        id: script.id,
        name: 'Quantitative Trading Script',
        price: script.price,
        originalPrice: script.price,
        description: script.description,
        type: "script-purchase"
      };
      
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      router.push('/checkout');
    } catch (error) {
      console.error('Error purchasing script:', error);
    }
  };

  return (
    <div className="min-h-screen bg-eagle-background">
      <Header />

      {/* Header Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              onClick={() => router.back()}
              variant="ghost"
              className="mr-4 text-eagle-foreground hover:bg-eagle-secondary/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-eagle-foreground mb-2">
                Trading Scripts Library
              </h1>
              <p className="text-xl text-eagle-muted-foreground">
                Professional algorithmic trading scripts for every strategy
              </p>
            </div>
          </div>
        </div>
      </section>

         {/* Scripts Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRADING_SCRIPTS .map((script) => (
              <Card 
                key={script.id}
                className="bg-eagle-card border-eagle-border hover:border-eagle-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-eagle-primary/10 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={script.image}
                    alt={`${script.name} Preview`}
                    className="w-full h-48 object-cover"
                  />
                  <Badge 
                    className="absolute top-2 right-2 bg-eagle-primary/20 text-eagle-primary border-eagle-primary/30"
                  >
                    {script.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-eagle-card-foreground mb-1">
                        {script.name}
                      </CardTitle>
     
                    </div>
    
                  </div>
                  <CardDescription className="text-eagle-muted-foreground">
                    {script.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-eagle-card-foreground mb-2">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {script.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-eagle-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-eagle-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Button
                      onClick={() => handlePurchaseScript(script)}
                      className="w-full bg-gradient-to-r from-eagle-primary to-eagle-primary/80 hover:from-eagle-primary/90 hover:to-eagle-primary/70 text-eagle-primary-foreground font-semibold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Buy Scripts Package- ${script.price}/month
                    </Button>

                  </div>

                  {selectedScript === script.id && (
                    <div className="mt-4 p-3 bg-eagle-secondary/50 rounded-lg border border-eagle-border">
                      <p className="text-sm text-eagle-muted-foreground mb-2">
                        🎥 Demo video and live performance metrics would be displayed here.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-eagle-muted-foreground">Win Rate:</span>
                          <span className="text-green-400 ml-1 font-semibold">73%</span>
                        </div>
                        <div>
                          <span className="text-eagle-muted-foreground">Avg Return:</span>
                          <span className="text-eagle-primary ml-1 font-semibold">+2.4%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {TRADING_SCRIPTS .length === 0 && (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-eagle-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl text-eagle-muted-foreground mb-2">No scripts found</h3>
              <p className="text-eagle-muted-foreground/70">
                No scripts match your selected category. Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-eagle-secondary/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-eagle-foreground mb-4">
            Need All Scripts?
          </h2>
          <p className="text-xl text-eagle-muted-foreground mb-8 max-w-2xl mx-auto">
            Get unlimited access to all trading scripts with our Infinity package
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                const cartItem = {
                  id: 'upgrade-infinity',
                  name: 'Infinity Package',
                  price: infinityPricing.price,
                  originalPrice: infinityPricing.originalPrice,
                  type: 'subscription-infinity',
                  description: 'Complete access to all trading tools and scripts',
                };
                localStorage.setItem('cart', JSON.stringify([cartItem]));
                router.push('/checkout');
              }}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-eagle-primary-foreground font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] w-auto"
            >
              <div className="flex flex-col items-center">
                <span>Get Infinity Access - {formatPriceWithPeriod(infinityPricing.price)}</span>
                <span className="text-xs opacity-75 line-through">
                  {formatPriceWithPeriod(infinityPricing.originalPrice)} • Save {infinityPricing.discount}
                </span>
              </div>
            </Button>
            <Link href="/technology">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 border-eagle-border text-eagle-muted-foreground hover:bg-eagle-secondary/20"
              >
                Back to Technology
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
