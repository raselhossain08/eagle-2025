"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Send, 
  Mail, 
  Users, 
  Link, 
  Calendar, 
  FileText, 
  Plus, 
  X,
  Clock,
  Shield,
  Download
} from "lucide-react";
import { toast } from "react-hot-toast";
import { contractSending, type ContractSendOptions } from "@/lib/services/contract-sending";
import type { SignedContract } from "@/lib/services/api/contracts";

interface ContractSendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: SignedContract | null;
  onSendComplete?: () => void;
}

interface Recipient {
  id: string;
  name: string;
  email: string;
  role: 'signer' | 'viewer' | 'approver';
  message?: string;
}

export function ContractSendModal({ 
  open, 
  onOpenChange, 
  contract, 
  onSendComplete 
}: ContractSendModalProps) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [bulkEmails, setBulkEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminderInterval, setReminderInterval] = useState("3");
  const [requireSignature, setRequireSignature] = useState(true);

  // Single recipient form
  const [newRecipient, setNewRecipient] = useState<Omit<Recipient, 'id'>>({
    name: '',
    email: '',
    role: 'signer',
    message: ''
  });

  const handleAddRecipient = () => {
    if (!newRecipient.name.trim() || !newRecipient.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newRecipient.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Check for duplicates
    if (recipients.some(r => r.email === newRecipient.email)) {
      toast.error('Email address already added');
      return;
    }

    const recipient: Recipient = {
      ...newRecipient,
      id: Date.now().toString()
    };

    setRecipients([...recipients, recipient]);
    setNewRecipient({
      name: '',
      email: '',
      role: 'signer',
      message: ''
    });
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const handleSendContract = async () => {
    if (!contract) return;

    try {
      setLoading(true);

      let finalRecipients: Recipient[] = [];

      if (activeTab === "email" && recipients.length > 0) {
        finalRecipients = recipients;
      } else if (activeTab === "bulk" && bulkEmails.trim()) {
        // Parse bulk emails
        const emails = bulkEmails
          .split(/[,;\n]/)
          .map(email => email.trim())
          .filter(email => email.length > 0);

        finalRecipients = emails.map((email, index) => ({
          id: index.toString(),
          name: email.split('@')[0],
          email,
          role: 'signer' as const,
          message: message
        }));
      }

      if (finalRecipients.length === 0) {
        toast.error('Please add at least one recipient');
        return;
      }

      const sendOptions: ContractSendOptions = {
        contractId: contract._id,
        recipients: finalRecipients.map(r => ({
          name: r.name,
          email: r.email,
          role: r.role,
          message: r.message || message
        })),
        subject: subject || `Contract Signature Request - ${contract.name}`,
        message: message || 'Please review and sign the attached contract.',
        dueDate: dueDate || undefined,
        reminderInterval: parseInt(reminderInterval),
        requireSignature
      };

      const result = await contractSending.sendContract(sendOptions);

      if (result.success) {
        toast.success(`Contract sent to ${result.data?.sentCount || finalRecipients.length} recipient(s)`);
        onSendComplete?.();
        onOpenChange(false);
        
        // Reset form
        setRecipients([]);
        setBulkEmails("");
        setMessage("");
        setSubject("");
      } else {
        toast.error(result.message || 'Failed to send contract');
      }
    } catch (error) {
      console.error('Send contract error:', error);
      toast.error('Failed to send contract');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateShareLink = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      
      const result = await contractSending.generateShareableLink(contract._id, {
        expiresIn: 72, // 3 days
        allowDownload: true,
        allowSignature: requireSignature
      });

      if (result.success && result.data) {
        // Copy link to clipboard
        await navigator.clipboard.writeText(result.data.shareUrl);
        toast.success('Shareable link copied to clipboard');
      } else {
        toast.error('Failed to generate shareable link');
      }
    } catch (error) {
      console.error('Generate link error:', error);
      toast.error('Failed to generate shareable link');
    } finally {
      setLoading(false);
    }
  };

  if (!contract) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Contract for Signature
          </DialogTitle>
          <DialogDescription>
            Share "{contract.name}" with others for signature or review
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email">Email Recipients</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Send</TabsTrigger>
              <TabsTrigger value="link">Share Link</TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-6">
              {/* Add Recipient Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Add Recipients</CardTitle>
                  <CardDescription>
                    Add individual recipients for contract signature or review
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        placeholder="Recipient name"
                        value={newRecipient.name}
                        onChange={(e) => setNewRecipient(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        placeholder="recipient@example.com"
                        value={newRecipient.email}
                        onChange={(e) => setNewRecipient(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select value={newRecipient.role} onValueChange={(value: any) => setNewRecipient(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="signer">Signer (Required)</SelectItem>
                          <SelectItem value="viewer">Viewer (Read Only)</SelectItem>
                          <SelectItem value="approver">Approver</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Personal Message (Optional)</Label>
                      <Input
                        placeholder="Personal note for this recipient"
                        value={newRecipient.message}
                        onChange={(e) => setNewRecipient(prev => ({ ...prev, message: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddRecipient} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Recipient
                  </Button>
                </CardContent>
              </Card>

              {/* Recipients List */}
              {recipients.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recipients ({recipients.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recipients.map((recipient) => (
                      <div key={recipient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-sm">{recipient.name}</p>
                            <p className="text-xs text-gray-600">{recipient.email}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {recipient.role}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveRecipient(recipient.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="bulk" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bulk Send</CardTitle>
                  <CardDescription>
                    Send to multiple recipients at once using comma, semicolon, or line-separated emails
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Addresses</Label>
                    <Textarea
                      placeholder="user1@example.com, user2@example.com&#10;user3@example.com"
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-gray-600">
                      Separate emails with commas, semicolons, or new lines
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="link" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Generate Shareable Link</CardTitle>
                  <CardDescription>
                    Create a secure link that can be shared with anyone
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>Expires in 3 days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Secure access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-purple-500" />
                      <span>Download allowed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-orange-500" />
                      <span>Signature {requireSignature ? 'enabled' : 'disabled'}</span>
                    </div>
                  </div>
                  
                  <Button onClick={handleGenerateShareLink} className="w-full" disabled={loading}>
                    <Link className="h-4 w-4 mr-2" />
                    {loading ? 'Generating...' : 'Generate & Copy Link'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Common Settings */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Send Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email Subject</Label>
                  <Input
                    placeholder={`Contract Signature Request - ${contract.name}`}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date (Optional)</Label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Please review and sign the attached contract at your earliest convenience."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Reminder Interval (Days)</Label>
                  <Select value={reminderInterval} onValueChange={setReminderInterval}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Daily</SelectItem>
                      <SelectItem value="3">Every 3 days</SelectItem>
                      <SelectItem value="7">Weekly</SelectItem>
                      <SelectItem value="14">Bi-weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Signature Required</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requireSignature"
                      checked={requireSignature}
                      onChange={(e) => setRequireSignature(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="requireSignature">Recipients must sign</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendContract} disabled={loading}>
            {loading ? 'Sending...' : 'Send Contract'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}