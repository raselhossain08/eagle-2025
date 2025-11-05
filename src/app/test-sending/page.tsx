"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { contractSending } from "@/lib/services/contract-sending";

export default function ContractSendingTestPage() {
  const [testData, setTestData] = useState({
    contractId: "",
    recipientName: "",
    recipientEmail: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    if (!testData.contractId || !testData.recipientName || !testData.recipientEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const sendOptions = {
        contractId: testData.contractId,
        recipients: [{
          name: testData.recipientName,
          email: testData.recipientEmail,
          role: 'signer' as const,
          message: testData.message || undefined
        }],
        subject: testData.subject || undefined,
        message: testData.message || 'Please review and sign the attached contract.',
        requireSignature: true
      };

      const result = await contractSending.sendContract(sendOptions);

      if (result.success) {
        toast.success(`Contract sent successfully! ${result.message}`);
        console.log("Send result:", result);
      } else {
        toast.error(`Failed to send: ${result.message}`);
        console.error("Send failed:", result);
      }
    } catch (error) {
      console.error("Test error:", error);
      toast.error("Failed to send contract");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLink = async () => {
    if (!testData.contractId) {
      toast.error("Please enter a contract ID");
      return;
    }

    try {
      setLoading(true);

      const result = await contractSending.generateShareableLink(testData.contractId, {
        expiresIn: 72,
        allowDownload: true,
        allowSignature: true
      });

      if (result.success && result.data) {
        // Copy to clipboard
        await navigator.clipboard.writeText(result.data.shareUrl);
        toast.success("Shareable link copied to clipboard!");
        console.log("Generated link:", result.data.shareUrl);
      } else {
        toast.error("Failed to generate link");
      }
    } catch (error) {
      console.error("Link generation error:", error);
      toast.error("Failed to generate link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Contract Sending Test</CardTitle>
          <CardDescription>
            Test the contract sending functionality with sample data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contractId">Contract ID *</Label>
              <Input
                id="contractId"
                placeholder="Enter contract ID from database"
                value={testData.contractId}
                onChange={(e) => setTestData(prev => ({ ...prev, contractId: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  placeholder="John Doe"
                  value={testData.recipientName}
                  onChange={(e) => setTestData(prev => ({ ...prev, recipientName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Recipient Email *</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={testData.recipientEmail}
                  onChange={(e) => setTestData(prev => ({ ...prev, recipientEmail: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject (Optional)</Label>
              <Input
                id="subject"
                placeholder="Contract Signature Request"
                value={testData.subject}
                onChange={(e) => setTestData(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input
                id="message"
                placeholder="Please review and sign the contract"
                value={testData.message}
                onChange={(e) => setTestData(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleTest} 
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Sending..." : "Send Contract via Email"}
            </Button>
            
            <Button 
              onClick={handleGenerateLink} 
              disabled={loading}
              variant="outline"
              className="flex-1"
            >
              {loading ? "Generating..." : "Generate Share Link"}
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Instructions:</h4>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Make sure your backend is running on the configured port</li>
              <li>Ensure SMTP settings are configured in your .env file</li>
              <li>Use a valid contract ID from your database</li>
              <li>Check console for detailed logs</li>
              <li>Check your email for the sent contract</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}