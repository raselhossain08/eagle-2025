"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPricingInfo } from "@/lib/config/pricing.config";

export function TechnologyPreview() {
  const router = useRouter();
  const [infinityPrice, setInfinityPrice] = useState<number>(127); // Default fallback price
  
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricing = await getPricingInfo('infinity', 'monthly');
        setInfinityPrice(pricing.price);
      } catch (error) {
        console.error('Error loading infinity pricing:', error);
      }
    };
    loadPricing();
  }, []);

  const handleExploreScripts = () => {
    try {
      router.push('/scripts');
    } catch (error) {
      console.error('Error navigating to scripts:', error);
    }
  };

  const handleGetInfinityAccess = async () => {
    try {
      const infinityPricing = await getPricingInfo('infinity', 'monthly');
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
    } catch (error) {
      console.error('Error purchasing Infinity:', error);
    }
  };

  const handleViewAllScripts = () => {
    try {
      router.push('/scripts');
    } catch (error) {
      console.error('Error navigating to all scripts:', error);
    }
  };

  return (
    <div className="bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Technology Preview</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Explore Our Cutting-Edge Scripts
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Unlock the power of automation with our technology preview scripts. Get a glimpse into the future of
            workflow optimization.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  {/* Heroicon name: outline/globe-alt */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Market Analysis</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-300">
                Gain valuable insights into market trends and competitor strategies with our advanced analysis scripts.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {/* Heroicon name: outline/lightning-bolt */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">AI-Powered Insights</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-300">
                Leverage the power of artificial intelligence to uncover hidden patterns and make data-driven decisions.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  {/* Heroicon name: outline/integration */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Premium Integration</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-300">
                Seamlessly integrate our scripts with your existing systems and workflows for maximum efficiency.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  {/* Heroicon name: outline/shield-check */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Secure & Reliable</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-300">
                Our scripts are built with security and reliability in mind, ensuring your data is always protected.
              </dd>
            </div>
          </dl>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 lg:mt-16">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            {/* Standalone Scripts Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <h3 className="text-lg font-semibold">Standalone Scripts</h3>
                <p className="mt-1 text-sm">Perfect for individual tasks and quick solutions.</p>
              </div>
              <div className="px-6 py-4">
                <ul className="list-disc list-inside text-gray-300">
                  <li>Access to individual scripts</li>
                  <li>Limited support</li>
                  <li>One-time purchase</li>
                </ul>
                <div className="mt-4">
                  <button 
                    onClick={handleExploreScripts}
                    className="w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    Explore Scripts
                  </button>
                </div>
              </div>
            </div>

            {/* Infinity Plan Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <h3 className="text-lg font-semibold">Infinity Plan</h3>
                <p className="mt-1 text-sm">Unlock unlimited access to all scripts and premium features.</p>
              </div>
              <div className="px-6 py-4">
                <ul className="list-disc list-inside text-gray-300">
                  <li>Unlimited script access</li>
                  <li>Priority support</li>
                  <li>Regular updates</li>
                </ul>
                <div className="mt-4">
                  <button 
                    onClick={handleGetInfinityAccess}
                    className="w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                  >
                    Get Infinity Access - ${infinityPrice}/month
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            3+ Scripts
          </span>
          <p className="mt-2 text-gray-300">
            Discover a growing library of scripts designed to streamline your workflows.
          </p>
          <button 
            onClick={handleViewAllScripts}
            className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View All Scripts
          </button>
        </div>
      </div>
    </div>
  )
}
