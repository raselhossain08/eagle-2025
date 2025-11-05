"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, Calendar, CreditCard, Plus, Search, Eye, Pen, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { getUserContracts, type SignedContract } from "@/lib/services/api/contracts";
import { getContractPDFUrl, downloadContractPDF } from "@/lib/utils/pdf-utils";
import { DynamicContract } from "./dynamic-contract";
import { SmartContractSelector } from "./smart-contract-selector";
import { 
  getContractTemplates, 
  type ContractTemplate 
} from "@/lib/services/api/contract-templates";
import { 
  formatProductType,
  getContractStatusInfo,
  contractToTemplateVariables
} from "@/lib/utils/contract-utils";
import { 
  dashboardSignature, 
  SignatureUtils 
} from "@/lib/services/dashboard-signature";
import { ContractSendModal } from "./contract-send-modal";

export function ContractsManager() {
  const [contracts, setContracts] = useState<SignedContract[]>([]);
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("my-contracts");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContract, setSelectedContract] = useState<SignedContract | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [contractToSend, setContractToSend] = useState<SignedContract | null>(null);

  useEffect(() => {
    loadContracts();
    loadTemplates();
  }, []);

  const loadContracts = async () => {
    try {
      setLoading(true);
      const userContracts = await getUserContracts();
      setContracts(userContracts);
    } catch (error) {
      console.error("Error loading contracts:", error);
      toast.error("Failed to load contracts");
    } finally {
      setLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      const response = await getContractTemplates({
        status: 'active',
        limit: 50,
      });
      setTemplates(response.templates);
    } catch (error) {
      console.error("Error loading templates:", error);
      toast.error("Failed to load contract templates");
    }
  };

  const handleDownloadPDF = async (contract: SignedContract) => {
    try {
      await downloadContractPDF(contract);
      toast.success("Contract downloaded successfully");
    } catch (error) {
      console.error("Error downloading contract:", error);
      toast.error("Failed to download contract");
    }
  };

  const handleSendContract = (contract: SignedContract) => {
    setContractToSend(contract);
    setShowSendModal(true);
  };

  const handleSendComplete = () => {
    toast.success("Contract sent successfully");
    setContractToSend(null);
    setShowSendModal(false);
  };

  const getStatusBadge = (contract: SignedContract) => {
    // Check if contract has signature first
    if (contract.signature) {
      const signatureBadge = SignatureUtils.getStatusBadge(contract);
      return (
        <Badge 
          variant={signatureBadge.variant}
          className={signatureBadge.className}
          title="Contract is digitally signed"
        >
          {signatureBadge.icon} {signatureBadge.text}
        </Badge>
      );
    }

    // Fallback to regular status
    const statusInfo = getContractStatusInfo(contract.status);
    const colorClasses = {
      gray: "bg-gray-500/10 text-gray-500 border-gray-500/30",
      yellow: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
      blue: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      green: "bg-green-500/10 text-green-500 border-green-500/30",
      red: "bg-red-500/10 text-red-500 border-red-500/30",
      purple: "bg-purple-500/10 text-purple-500 border-purple-500/30",
      orange: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    };

    return (
      <Badge 
        className={colorClasses[statusInfo.color as keyof typeof colorClasses] || colorClasses.gray}
        title={statusInfo.description}
      >
        {statusInfo.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filterContracts = () => {
    let filtered = [...contracts];

    if (searchTerm) {
      filtered = filtered.filter(contract =>
        contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(contract => contract.status === statusFilter);
    }

    return filtered;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading contracts...</p>
        </div>
      </div>
    );
  }

  const filteredContracts = filterContracts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contract Management</h2>
          <p className="text-muted-foreground">Manage contracts with dynamic templates from dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">
            {filteredContracts.length} of {contracts.length} Contract{contracts.length !== 1 ? 's' : ''}
          </Badge>
          <Button size="sm" onClick={() => setActiveTab("create-contract")}>
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-contracts">My Contracts</TabsTrigger>
          <TabsTrigger value="create-contract">Create Contract</TabsTrigger>
          <TabsTrigger value="templates">Browse Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="my-contracts" className="space-y-6">
          {/* Search and Filter Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Search Contracts</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, email, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Filter by Status</Label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="signed">Signed</option>
                    <option value="payment_pending">Payment Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Actions</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}>
                      Clear Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contracts List */}
          {filteredContracts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {contracts.length === 0 ? 'No Contracts Found' : 'No Matching Contracts'}
                </h3>
                <p className="text-muted-foreground">
                  {contracts.length === 0 
                    ? "You haven't signed any contracts yet. Subscribe to a package to get started."
                    : "Try adjusting your search or filter criteria."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredContracts.map((contract) => {
                const pdfInfo = getContractPDFUrl(contract);
                
                return (
                  <Card key={contract._id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {formatProductType(contract.productType)}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Contract ID: {contract._id}
                          </p>
                        </div>
                        {getStatusBadge(contract)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Customer</p>
                          <p className="text-sm">{contract.name}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p className="text-sm">{contract.email}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Signed Date
                          </p>
                          <p className="text-sm">{formatDate(contract.signedDate)}</p>
                        </div>
                        
                        {contract.amount && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              Amount
                            </p>
                            <p className="text-sm">${contract.amount}</p>
                          </div>
                        )}
                      </div>

                      {contract.subscriptionType && (
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">Subscription:</span>
                          <Badge variant="outline" className="capitalize">
                            {contract.subscriptionType}
                          </Badge>
                          {contract.subscriptionStartDate && contract.subscriptionEndDate && (
                            <span className="text-muted-foreground">
                              {formatDate(contract.subscriptionStartDate)} - {formatDate(contract.subscriptionEndDate)}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {pdfInfo.isCloudinary ? (
                            <span className="flex items-center gap-1">
                              ☁️ Dynamic Template
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              📄 Legacy Contract
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPDF(contract)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendContract(contract)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedContract(contract)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          {contract.signature ? (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => dashboardSignature.openAuditTrail(contract._id)}
                              title="View signature audit trail"
                            >
                              <Pen className="h-4 w-4 mr-2" />
                              Audit Trail
                            </Button>
                          ) : SignatureUtils.canSign(contract) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => dashboardSignature.initiateSignatureProcess(contract._id)}
                              title="Initiate signature process"
                            >
                              <Pen className="h-4 w-4 mr-2" />
                              Sign Contract
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="create-contract" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Contract</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select a template and provide variables to create a dynamic contract
              </p>
            </CardHeader>
            <CardContent>
              <SmartContractSelector
                onContractSelected={(template, variables) => {
                  console.log('Contract selected:', template.name, variables);
                  toast.success(`Selected template: ${template.name}`);
                }}
                onContractRendered={(renderedContract) => {
                  console.log('Contract rendered:', renderedContract);
                  toast.success('Contract rendered successfully!');
                }}
              />
            </CardContent>
          </Card>
          
          {/* Signature Management Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pen className="h-5 w-5" />
                Digital Signature Features
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Advanced signature capabilities available through admin dashboard
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Electronic Signatures</h4>
                    <p className="text-xs text-muted-foreground">Legally binding digital signatures with audit trail</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Eye className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Witness Support</h4>
                    <p className="text-xs text-muted-foreground">Multi-party signature with witness validation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Audit Trail</h4>
                    <p className="text-xs text-muted-foreground">Complete signature history and metadata tracking</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Admin Access Required:</strong> Full signature workflow, witness management, and advanced contract features are available through the admin dashboard. Contact your administrator for signature permissions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Contract Templates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Templates synced from admin dashboard - {templates.length} available
              </p>
            </CardHeader>
            <CardContent>
              {templates.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Templates Available</h3>
                  <p className="text-gray-600">Templates will appear here when created in the admin dashboard.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template._id} className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">ID: {template.templateId}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {template.category.replace('_', ' ')}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              v{template.versionString}
                            </Badge>
                          </div>
                          
                          {template.metadata?.description && (
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {template.metadata.description}
                            </p>
                          )}
                          
                          <div className="text-xs text-gray-500">
                            {template.content?.variables?.length || 0} variable(s)
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                            <Button 
                              size="sm"
                              className="text-xs"
                              onClick={() => setActiveTab("create-contract")}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Use
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Contract Detail View */}
      {selectedContract && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Contract Details - {formatProductType(selectedContract.productType)}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedContract(null)}>
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Signature Status Section */}
            {selectedContract.signature && (
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Pen className="h-4 w-4" />
                    Digital Signature Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="text-muted-foreground">Signature Date</Label>
                      <p>{formatDate(selectedContract.signedDate)}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Method</Label>
                      <Badge variant="secondary">Electronic</Badge>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Status</Label>
                      <Badge variant="default" className="bg-green-500">
                        Signed
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Actions</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.open(`${process.env.NEXT_PUBLIC_DASHBOARD_URL || '/dashboard'}/contracts?audit=${selectedContract._id}`, '_blank');
                        }}
                      >
                        View Audit Trail
                      </Button>
                    </div>
                  </div>
                  
                  {selectedContract.signature && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        ✓ This contract has been digitally signed with full audit trail and legal compliance.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Contract Content */}
            <DynamicContract
              templateId={selectedContract.productType}
              variables={contractToTemplateVariables(selectedContract)}
              preview={true}
            />
            
            {/* Dashboard Integration Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Administrative Actions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Advanced contract management available through admin dashboard
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dashboardSignature.openContractInDashboard(selectedContract._id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Open in Dashboard
                  </Button>
                  
                  {!selectedContract.signature && SignatureUtils.canSign(selectedContract) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => dashboardSignature.initiateSignatureProcess(selectedContract._id)}
                    >
                      <Pen className="h-4 w-4 mr-2" />
                      Initiate Signature
                    </Button>
                  )}
                  
                  {selectedContract.signature && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dashboardSignature.openAuditTrail(selectedContract._id)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Audit Trail
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dashboardSignature.createSimilarContract(selectedContract.productType)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Similar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Contract Send Modal */}
      <ContractSendModal
        open={showSendModal}
        onOpenChange={setShowSendModal}
        contract={contractToSend}
        onSendComplete={handleSendComplete}
      />
    </div>
  );
}