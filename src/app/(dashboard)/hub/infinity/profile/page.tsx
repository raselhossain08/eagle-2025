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
  Infinity,
  CreditCard,
  TrendingUp,
  Settings,
  Crown,
  Star,
  Zap
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

export default function InfinityPlanProfile() {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20"></div>
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                  <Crown className="w-8 h-8 text-amber-400" />
                  Infinity Plan Profile
                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold">
                    ULTIMATE
                  </Badge>
                </CardTitle>
                <CardDescription className="text-slate-300 text-lg mt-2">
                  Ultimate investment experience with unlimited features and white-glove service
                </CardDescription>
              </div>
              <Button
                onClick={() => editMode ? updateProfile() : setEditMode(true)}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold"
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

        {/* VIP Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-400 flex items-center gap-2 text-sm">
                <Crown className="w-4 h-4" />
                VIP STATUS
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-bold text-white">INFINITY</p>
              <p className="text-amber-200 text-sm">Ultimate Tier</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4" />
                VERIFICATION
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-bold text-white">{profile?.profileCompletion?.percentage || 0}%</p>
              <p className="text-slate-300 text-sm">Complete</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                KYC LEVEL
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-bold text-white">{formatKycLevel(profile?.kycStatus?.level || 'none')}</p>
              <p className="text-slate-300 text-sm">Verification</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center gap-2 text-sm">
                <Star className="w-4 h-4" />
                PRIORITY
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-bold text-white">MAX</p>
              <p className="text-slate-300 text-sm">Support Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Content */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="personal" className="text-slate-300 data-[state=active]:text-black data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400">
              Personal
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-slate-300 data-[state=active]:text-black data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400">
              Contact
            </TabsTrigger>
            <TabsTrigger value="employment" className="text-slate-300 data-[state=active]:text-black data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400">
              Career
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-slate-300 data-[state=active]:text-black data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400">
              Financial
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-slate-300 data-[state=active]:text-black data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400">
              Documents
            </TabsTrigger>
            <TabsTrigger value="preferences" className="text-slate-300 data-[state=active]:text-black data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400">
              Preferences
            </TabsTrigger>
            <TabsTrigger value="exclusive" className="text-slate-300 data-[state=active]:text-black data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400">
              Exclusive
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-400" />
                  Executive Profile Information
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Comprehensive personal details for Infinity tier white-glove service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName" className="text-slate-300">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={editMode ? formData.personalInfo?.middleName || '' : profile?.personalInfo?.middleName || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo!, middleName: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="Middle name (optional)"
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
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
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
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
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
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="Your nationality"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dependents" className="text-slate-300">Number of Dependents</Label>
                    <Input
                      id="dependents"
                      type="number"
                      value={editMode ? formData.personalInfo?.dependents || 0 : profile?.personalInfo?.dependents || 0}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo!, dependents: parseInt(e.target.value) || 0 }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="0"
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
                  <Phone className="w-5 h-5 text-amber-400" />
                  Executive Contact Information
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
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone" className="text-slate-300">Executive Assistant / Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      value={editMode ? formData.contactInfo?.alternatePhone || '' : profile?.contactInfo?.alternatePhone || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        contactInfo: { ...formData.contactInfo!, alternatePhone: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
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
                  <Building2 className="w-5 h-5 text-amber-400" />
                  Executive Career & Compensation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employer" className="text-slate-300">Company / Organization</Label>
                    <Input
                      id="employer"
                      value={editMode ? formData.employment?.employer || '' : profile?.employment?.employer || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        employment: { ...formData.employment!, employer: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-slate-300">Executive Title / Position</Label>
                    <Input
                      id="jobTitle"
                      value={editMode ? formData.employment?.jobTitle || '' : profile?.employment?.jobTitle || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        employment: { ...formData.employment!, jobTitle: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="CEO, CTO, Managing Director, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-slate-300">Industry Sector</Label>
                    <Input
                      id="industry"
                      value={editMode ? formData.employment?.industry || '' : profile?.employment?.industry || ''}
                      onChange={(e) => editMode && setFormData({
                        ...formData,
                        employment: { ...formData.employment!, industry: e.target.value }
                      })}
                      disabled={!editMode}
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="Technology, Finance, Healthcare, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome" className="text-slate-300">Annual Compensation (USD)</Label>
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
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400"
                      placeholder="1000000"
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
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  Ultra High Net Worth Financial Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="investmentExperience" className="text-slate-300">Investment Experience Level</Label>
                    <Select
                      value={editMode ? formData.financialProfile?.investmentExperience || '' : profile?.financialProfile?.investmentExperience || ''}
                      onValueChange={(value) => editMode && setFormData({
                        ...formData,
                        financialProfile: { ...formData.financialProfile!, investmentExperience: value as any }
                      })}
                      disabled={!editMode}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="extensive">Extensive (Institutional Level)</SelectItem>
                        <SelectItem value="professional">Professional Fund Manager</SelectItem>
                        <SelectItem value="moderate">Moderate (Family Office)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="riskTolerance" className="text-slate-300">Risk Appetite</Label>
                    <Select
                      value={editMode ? formData.financialProfile?.riskTolerance || '' : profile?.financialProfile?.riskTolerance || ''}
                      onValueChange={(value) => editMode && setFormData({
                        ...formData,
                        financialProfile: { ...formData.financialProfile!, riskTolerance: value as any }
                      })}
                      disabled={!editMode}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-amber-400">
                        <SelectValue placeholder="Select risk appetite" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="very_aggressive">Ultra High Risk / High Return</SelectItem>
                        <SelectItem value="aggressive">Aggressive Growth</SelectItem>
                        <SelectItem value="moderate">Balanced Portfolio</SelectItem>
                        <SelectItem value="conservative">Capital Preservation</SelectItem>
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
                  <FileText className="w-5 h-5 text-amber-400" />
                  Infinity Tier Document Vault
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Premium document management with instant verification and unlimited storage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-amber-400/50 rounded-lg p-8 text-center bg-gradient-to-br from-amber-500/10 to-yellow-500/10">
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                      <Upload className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">Infinity Document Upload</p>
                      <p className="text-amber-200">White-glove verification with instant processing</p>
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
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold"
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Premium Document
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Upload Progress */}
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Processing with priority verification...</span>
                      <span className="text-amber-400">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-3 bg-slate-700" />
                  </div>
                )}

                {/* Uploaded Documents List */}
                {documents.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">Document Vault</h4>
                    <div className="grid gap-4">
                      {documents.map((document) => (
                        <Card key={document.id} className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-amber-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                  <FileText className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                  <p className="font-semibold text-white text-lg">{document.filename}</p>
                                  <p className="text-amber-200">
                                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)} • 
                                    {(document.fileSize / 1024 / 1024).toFixed(2)} MB • 
                                    Uploaded {new Date(document.uploadedAt).toLocaleDateString()}
                                  </p>
                                  {document.description && (
                                    <p className="text-slate-400 mt-1">{document.description}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge 
                                  className={document.isVerified 
                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold' 
                                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold'
                                  }
                                >
                                  {document.isVerified ? (
                                    <>
                                      <Check className="w-3 h-3 mr-1" />
                                      Verified
                                    </>
                                  ) : (
                                    'Processing'
                                  )}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDocument(document.id)}
                                  className="text-amber-400 border-amber-400 hover:bg-amber-400/10"
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
                <Alert className="bg-gradient-to-r from-amber-900/50 to-yellow-900/50 border-amber-500">
                  <Crown className="h-5 w-5 text-amber-400" />
                  <AlertDescription className="text-amber-100">
                    <strong className="text-lg">Infinity Tier Privileges:</strong>
                    <ul className="mt-2 list-disc list-inside space-y-2 text-sm">
                      <li>Instant verification with dedicated compliance team</li>
                      <li>Unlimited file size and storage capacity</li>
                      <li>Advanced encryption and secure vault storage</li>
                      <li>24/7 white-glove document support</li>
                      <li>Direct line to executive verification team</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-400" />
                  Executive Preferences & Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white text-lg">White-Glove Service Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <Label className="text-amber-200 font-medium">Dedicated Account Manager</Label>
                          <p className="text-slate-400 text-sm">Assigned personal wealth advisor</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <Label className="text-amber-200 font-medium">24/7 Concierge Support</Label>
                          <p className="text-slate-400 text-sm">Round-the-clock assistance</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <Label className="text-amber-200 font-medium">Private Market Access</Label>
                          <p className="text-slate-400 text-sm">Exclusive investment opportunities</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white text-lg">Executive Communication</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <Label className="text-amber-200 font-medium">Executive Briefings</Label>
                          <p className="text-slate-400 text-sm">Daily market intelligence reports</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <Label className="text-amber-200 font-medium">Private Events Invitations</Label>
                          <p className="text-slate-400 text-sm">Exclusive networking events</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <Label className="text-amber-200 font-medium">Direct Executive Line</Label>
                          <p className="text-slate-400 text-sm">Bypass all queues for support</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exclusive Features */}
          <TabsContent value="exclusive">
            <Card className="bg-gradient-to-br from-slate-800/50 to-amber-900/20 border-amber-500/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className="w-6 h-6 text-amber-400" />
                  Infinity Exclusive Features
                </CardTitle>
                <CardDescription className="text-amber-200">
                  Ultra-premium features available only to Infinity tier members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-400/50">
                    <CardHeader>
                      <CardTitle className="text-amber-300 flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Portfolio Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">AI-Powered Analytics</span>
                        <Badge className="bg-green-500 text-white">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Real-time Optimization</span>
                        <Badge className="bg-green-500 text-white">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Risk Management Suite</span>
                        <Badge className="bg-green-500 text-white">Active</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50">
                    <CardHeader>
                      <CardTitle className="text-purple-300 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Exclusive Access
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Private Equity Deals</span>
                        <Badge className="bg-green-500 text-white">Unlocked</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Hedge Fund Access</span>
                        <Badge className="bg-green-500 text-white">Unlocked</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Pre-IPO Opportunities</span>
                        <Badge className="bg-green-500 text-white">Unlocked</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}