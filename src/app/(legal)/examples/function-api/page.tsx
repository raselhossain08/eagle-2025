"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { executeFunction } from "@/lib/services/api/functions";
import { useAuth } from "@/context/authContext";

export default function FunctionApiExample() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const callExampleFunction = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await executeFunction({
        functionName: "getMarketData",
        params: { symbols: ["AAPL", "MSFT", "GOOGL"] },
      });
      
      setResult(response.result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Function API Example</CardTitle>
        </CardHeader>
        <CardContent>
          {!isAuthenticated ? (
            <div className="p-4 bg-yellow-900/30 border border-yellow-600 rounded text-white mb-4">
              <p>Please log in to use this feature.</p>
              <Button 
                onClick={() => router.push("/login")}
                className="mt-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 p-4 bg-slate-700/50 rounded">
                <h3 className="text-white font-medium mb-2">Current User</h3>
                <p className="text-gray-300">
                  Subscription: {user?.subscription || "None"}
                </p>
              </div>
              
              <Button 
                onClick={callExampleFunction} 
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
              >
                {loading ? "Loading..." : "Call Market Data Function"}
              </Button>
            </>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-600 rounded text-white">
              <h3 className="font-medium mb-1">Error</h3>
              <p>{error}</p>
            </div>
          )}
          
          {result && (
            <div className="mt-4 p-4 bg-slate-700 rounded text-white">
              <h3 className="font-medium mb-2">Result</h3>
              <pre className="whitespace-pre-wrap overflow-auto bg-slate-800 p-3 rounded text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
