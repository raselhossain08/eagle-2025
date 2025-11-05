"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  DollarSign, 
  Shield, 
  Camera, 
  Upload, 
  Check, 
  X, 
  Edit3,
  Save,
  AlertCircle,
  FileText,
  Calendar,
  Globe,
  Lock,
  Download,
  Eye,
  Trash2,
  Diamond,
  CreditCard,
  TrendingUp,
  Settings
} from 'lucide-react';

// Import our services
import { subscriberProfileService, SubscriberProfile } from '@/lib/services';

interface UploadedDocument {
  id: string;
  type: string;
  filename: string;
  fileSize: number;
  description: string;
  uploadedAt: string;
  isVerified: boolean;
  mimeType: string;
}

export default function DiamondPlanProfile() {
  const [profile, setProfile] = useState<SubscriberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [formData, setFormData] = useState<Partial<SubscriberProfile>>({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      
      // Load profile data
      const profileResponse = await subscriberProfileService.getMyProfile();
      
      if (profileResponse.success && profileResponse.data) {
        setProfile(profileResponse.data);
        setFormData(profileResponse.data);
      } else {
        // Initialize with empty profile structure
        const emptyProfile: SubscriberProfile = {
          personalInfo: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: undefined,
            nationality: '',
            maritalStatus: undefined
          },
          contactInfo: {
            primaryPhone: '',
            alternatePhone: '',
            addresses: []
          },
          employment: {
            employmentStatus: undefined,
            employer: '',
            jobTitle: '',
            industry: '',
            annualIncome: {
              amount: 0,
              currency: 'USD'
            }
          },
          financialProfile: {
            investmentExperience: undefined,
            riskTolerance: undefined,
            timeHorizon: undefined
          },
          kycStatus: {
            status: 'not_started',
            level: 'none',
            completedSteps: []
          },
          profileCompletion: {
            percentage: 0,
            completedSections: [],
            missingFields: []
          }
        };
        setProfile(emptyProfile);
        setFormData(emptyProfile);
      }

      // Load documents
      const documentsResponse = await subscriberProfileService.getMyDocuments();
      if (documentsResponse.success && documentsResponse.data) {
        setDocuments(documentsResponse.data);
      }
      
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      
      const response = await subscriberProfileService.updateMyProfile(formData);
      
      if (response.success && response.data) {
        setProfile(response.data);
        setEditMode(false);
        toast.success('Profile updated successfully');
      } else {
        throw new Error(response.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, documentType: string, description?: string) => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await subscriberProfileService.uploadDocument(file, documentType, description);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.success) {
        toast.success('Document uploaded successfully');
        
        // Refresh profile and documents data
        await loadProfile();
        
        // Complete KYC step if identity document
        if (documentType === 'identity' || documentType === 'passport') {
          await subscriberProfileService.completeKycStep('identity_verification');
        }
      } else {
        throw new Error(response.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const response = await subscriberProfileService.deleteDocument(documentId);
      
      if (response.success) {
        toast.success('Document deleted successfully');
        await loadProfile(); // Refresh data
      } else {
        throw new Error(response.error || 'Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const handleViewDocument = async (documentId: string) => {
    try {
      const response = await subscriberProfileService.getDocumentUrl(documentId);
      
      if (response.success && response.data?.url) {
        window.open(response.data.url, '_blank');
      } else {
        throw new Error(response.error || 'Failed to get document URL');
      }
    } catch (error) {
      console.error('Error viewing document:', error);
      toast.error('Failed to open document');
    }
  };

  // Use helper functions from service
  const getKycStatusColor = (status: string) => subscriberProfileService.getKycStatusColor(status);
  const getKycLevelColor = (level: string) => subscriberProfileService.getKycLevelColor(level);
  const formatKycStatus = (status: string) => subscriberProfileService.formatKycStatus(status);
  const formatKycLevel = (level: string) => subscriberProfileService.formatKycLevel(level);

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <Diamond className="w-6 h-6 text-purple-400" />
                  Diamond Plan Profile
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Premium profile features with advanced analytics and priority support
                </CardDescription>
              </div>
              <Button
                onClick={() => editMode ? updateProfile() : setEditMode(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={loading}
              >
                {editMode ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Completion */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Profile Completion & Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Overall Progress</span>
                  <span className="text-purple-400 font-medium">
                    {profile?.profileCompletion?.percentage || 0}%
                  </span>
                </div>
                <Progress 
                  value={profile?.profileCompletion?.percentage || 0} 
                  className="h-3 bg-slate-700"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Badge className={getKycStatusColor(profile?.kycStatus?.status || 'not_started')}>
                    {formatKycStatus(profile?.kycStatus?.status || 'not_started')}
                  </Badge>
                  <span className="text-slate-300">KYC Status</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getKycLevelColor(profile?.kycStatus?.level || 'none')}>
                    {formatKycLevel(profile?.kycStatus?.level || 'none')}
                  </Badge>
                  <span className="text-slate-300">Verification Level</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-purple-100 text-purple-800">
                    DIAMOND TIER
                  </Badge>
                  <span className="text-slate-300">Plan Level</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Profile Content */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="personal" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-purple-600">
              Personal
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-purple-600">
              Contact
            </TabsTrigger>
            <TabsTrigger value="employment" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-purple-600">
              Employment
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-purple-600">
              Financial
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-purple-600">
              Documents
            </TabsTrigger>
            <TabsTrigger value="preferences" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-purple-600">
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-slate-300">
                  Enhanced personal details for Diamond tier verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                    <Input
                      id="firstName"
                      value={editMode ? formData.personalInfo?.firstName || '' : profile?.personalInfo?.firstName || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo!, firstName: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                    <Input
                      id="lastName"
                      value={editMode ? formData.personalInfo?.lastName || '' : profile?.personalInfo?.lastName || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo!, lastName: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-slate-300">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={editMode ? formData.personalInfo?.dateOfBirth || '' : profile?.personalInfo?.dateOfBirth || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo!, dateOfBirth: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality" className="text-slate-300">Nationality</Label>
                    <Input
                      id="nationality"
                      value={editMode ? formData.personalInfo?.nationality || '' : profile?.personalInfo?.nationality || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo!, nationality: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="Your nationality"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-400" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryPhone" className="text-slate-300">Primary Phone</Label>
                    <Input
                      id="primaryPhone"
                      value={editMode ? formData.contactInfo?.primaryPhone || '' : profile?.contactInfo?.primaryPhone || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        contactInfo: { ...formData.contactInfo!, primaryPhone: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone" className="text-slate-300">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      value={editMode ? formData.contactInfo?.alternatePhone || '' : profile?.contactInfo?.alternatePhone || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        contactInfo: { ...formData.contactInfo!, alternatePhone: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employment Information */}
          <TabsContent value="employment">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  Employment & Income Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employer" className="text-slate-300">Employer</Label>
                    <Input
                      id="employer"
                      value={editMode ? formData.employment?.employer || '' : profile?.employment?.employer || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        employment: { ...formData.employment!, employer: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-slate-300">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={editMode ? formData.employment?.jobTitle || '' : profile?.employment?.jobTitle || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        employment: { ...formData.employment!, jobTitle: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="Your position"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome" className="text-slate-300">Annual Income (USD)</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={editMode ? formData.employment?.annualIncome?.amount || 0 : profile?.employment?.annualIncome?.amount || 0}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        employment: { 
                          ...formData.employment!, 
                          annualIncome: { 
                            amount: parseInt(e.target.value) || 0, 
                            currency: 'USD' 
                          } 
                        }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="100000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Profile */}
          <TabsContent value="financial">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Advanced Financial Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="investmentExperience" className="text-slate-300">Investment Experience</Label>
                    <Select
                      value={editMode ? formData.financialProfile?.investmentExperience || '' : profile?.financialProfile?.investmentExperience || ''}
                      onValueChange={(value) => editMode && setFormData({
                        ...formData,
                        financialProfile: { ...formData.financialProfile!, investmentExperience: value as any }
                      })}
                      disabled={!editMode}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="limited">Limited (1-3 years)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-7 years)</SelectItem>
                        <SelectItem value="extensive">Extensive (7+ years)</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="riskTolerance" className="text-slate-300">Risk Tolerance</Label>
                    <Select
                      value={editMode ? formData.financialProfile?.riskTolerance || '' : profile?.financialProfile?.riskTolerance || ''}
                      onValueChange={(value) => editMode && setFormData({
                        ...formData,
                        financialProfile: { ...formData.financialProfile!, riskTolerance: value as any }
                      })}
                      disabled={!editMode}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select risk tolerance" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                        <SelectItem value="very_aggressive">Very Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Premium Document Management
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Enhanced document verification for Diamond tier members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-purple-400/50 rounded-lg p-8 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-white">Upload Premium Documents</p>
                      <p className="text-slate-400">Enhanced verification with priority processing</p>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="file"
                        id="documentUpload"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, 'identity');
                          }
                        }}
                      />
                      <Button 
                        onClick={() => document.getElementById('documentUpload')?.click()}
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Upload Progress */}
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Uploading...</span>
                      <span className="text-purple-400">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2 bg-slate-700" />
                  </div>
                )}

                {/* Uploaded Documents List */}
                {documents.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Uploaded Documents</h4>
                    <div className="grid gap-4">
                      {documents.map((document) => (
                        <Card key={document.id} className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="w-8 h-8 text-purple-400" />
                                <div>
                                  <p className="font-medium text-white">{document.filename}</p>
                                  <p className="text-sm text-slate-300">
                                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)} • 
                                    {(document.fileSize / 1024 / 1024).toFixed(2)} MB • 
                                    Uploaded {new Date(document.uploadedAt).toLocaleDateString()}
                                  </p>
                                  {document.description && (
                                    <p className="text-sm text-slate-400 mt-1">{document.description}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  className={document.isVerified 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                  }
                                >
                                  {document.isVerified ? (
                                    <>
                                      <Check className="w-3 h-3 mr-1" />
                                      Verified
                                    </>
                                  ) : (
                                    'Pending'
                                  )}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDocument(document.id)}
                                  className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteDocument(document.id)}
                                  className="text-red-400 border-red-400 hover:bg-red-400/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Document Guidelines */}
                <Alert className="bg-purple-900/50 border-purple-700">
                  <AlertCircle className="h-4 w-4 text-purple-400" />
                  <AlertDescription className="text-purple-200">
                    <strong>Diamond Tier Requirements:</strong>
                    <ul className="mt-1 list-disc list-inside space-y-1 text-sm">
                      <li>Enhanced verification with priority processing</li>
                      <li>Maximum file size: 10MB (Premium)</li>
                      <li>Advanced document authentication</li>
                      <li>Dedicated support for verification issues</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences (Diamond Exclusive) */}
          <TabsContent value="preferences">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Diamond Tier Preferences
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Exclusive preferences and settings for Diamond members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Communication Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="prioritySupport" className="text-slate-300">Priority Support Notifications</Label>
                        <Switch id="prioritySupport" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketInsights" className="text-slate-300">Premium Market Insights</Label>
                        <Switch id="marketInsights" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="exclusiveOffers" className="text-slate-300">Exclusive Investment Offers</Label>
                        <Switch id="exclusiveOffers" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Privacy & Security</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enhancedSecurity" className="text-slate-300">Enhanced Security Monitoring</Label>
                        <Switch id="enhancedSecurity" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dataAnalytics" className="text-slate-300">Advanced Analytics Tracking</Label>
                        <Switch id="dataAnalytics" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="privateMode" className="text-slate-300">Private Portfolio Mode</Label>
                        <Switch id="privateMode" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}