"use client";

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import toast from 'react-hot-toast';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Building,
  DollarSign,
  Settings,
  Globe,
  Lock,
  Shield,
  FileText,
  Download,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Save,
  Check,
  AlertCircle,
  Star,
  Briefcase,
  Heart,
  Bell
} from 'lucide-react';
import {
  subscriberProfileService,
  SubscriberProfile,
  PersonalInfo,
  ContactInfo,
  Employment,
  FinancialProfile,
  CommunicationPreferences,
  PrivacyPreferences,
  CreateIdentityDocumentData,
  Address,
  IdentityDocument
} from '@/lib/services/core/subscriberProfile.service';

function MyProfileContent() {
  const [profile, setProfile] = useState<SubscriberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  const [employment, setEmployment] = useState<Employment>({});
  const [financialProfile, setFinancialProfile] = useState<FinancialProfile>({});
  const [communicationPrefs, setCommunicationPrefs] = useState<CommunicationPreferences>({});
  const [privacyPrefs, setPrivacyPrefs] = useState<PrivacyPreferences>({});

  // Dialog states
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [documentForm, setDocumentForm] = useState<CreateIdentityDocumentData>({
    type: 'passport',
    number: '',
    issuingCountry: '',
    issuingState: '',
    issueDate: '',
    expiryDate: ''
  });

  // UI states
  const [editingSection, setEditingSection] = useState<string>('');
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await subscriberProfileService.getMyProfile();
      
      if (response.success) {
        const profileData = response.data;
        setProfile(profileData);
        
        // Initialize form states
        setPersonalInfo(profileData.personalInfo || {});
        setContactInfo(profileData.contactInfo || {});
        setEmployment(profileData.employment || {});
        setFinancialProfile(profileData.financialProfile || {});
        setCommunicationPrefs(profileData.communicationPreferences || {});
        setPrivacyPrefs(profileData.privacyPreferences || {});
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (section: string) => {
    try {
      setSaving(true);
      
      let updateData: Partial<SubscriberProfile> = {};
      
      switch (section) {
        case 'personal':
          updateData = { personalInfo };
          break;
        case 'contact':
          updateData = { contactInfo };
          break;
        case 'employment':
          updateData = { employment };
          break;
        case 'financial':
          updateData = { financialProfile };
          break;
        case 'communication':
          updateData = { communicationPreferences: communicationPrefs };
          break;
        case 'privacy':
          updateData = { privacyPreferences: privacyPrefs };
          break;
      }

      const response = await subscriberProfileService.updateMyProfile(updateData);
      
      if (response.success) {
        setProfile(response.data);
        setEditingSection('');
        toast.success('Profile updated successfully');
        
        // Complete KYC step if applicable
        if (section === 'personal' && personalInfo.firstName && personalInfo.lastName && personalInfo.dateOfBirth) {
          try {
            await subscriberProfileService.completeKycStep('personal_info');
          } catch (error) {
            // Don't show error for KYC step completion - it's optional
          }
        }
        
        if (section === 'contact' && contactInfo.addresses?.length) {
          try {
            await subscriberProfileService.completeKycStep('address_verification');
          } catch (error) {
            // Don't show error for KYC step completion - it's optional
          }
        }

        if (section === 'employment' && employment.employmentStatus) {
          try {
            await subscriberProfileService.completeKycStep('employment_verification');
          } catch (error) {
            // Don't show error for KYC step completion - it's optional
          }
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAddDocument = async () => {
    try {
      if (!documentForm.type || !documentForm.number) {
        toast.error('Document type and number are required');
        return;
      }

      const response = await subscriberProfileService.addIdentityDocument(documentForm);
      
      if (response.success) {
        setProfile(response.data);
        setShowDocumentDialog(false);
        resetDocumentForm();
        toast.success('Document added successfully');
        
        // Complete identity verification step
        try {
          await subscriberProfileService.completeKycStep('identity_verification');
        } catch (error) {
          // Don't show error for KYC step completion - it's optional
        }
      }
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Failed to add document');
    }
  };

  const handleExportProfile = async () => {
    try {
      const response = await subscriberProfileService.exportMyProfile();
      
      if (response.success) {
        const blob = new Blob([JSON.stringify(response.data, null, 2)], { 
          type: 'application/json' 
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `my-profile-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast.success('Profile exported successfully');
      }
    } catch (error) {
      console.error('Error exporting profile:', error);
      toast.error('Failed to export profile');
    }
  };

  const resetDocumentForm = () => {
    setDocumentForm({
      type: 'passport',
      number: '',
      issuingCountry: '',
      issuingState: '',
      issueDate: '',
      expiryDate: ''
    });
  };

  const addAddress = () => {
    const newAddresses = [...(contactInfo.addresses || []), {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      isPrimary: (contactInfo.addresses || []).length === 0,
      type: 'home' as const
    }];
    setContactInfo({ ...contactInfo, addresses: newAddresses });
  };

  const updateAddress = (index: number, field: string, value: any) => {
    const newAddresses = [...(contactInfo.addresses || [])];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setContactInfo({ ...contactInfo, addresses: newAddresses });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading your profile...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportProfile}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Profile Completion Card */}
      {profile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Profile Completion
            </CardTitle>
            <CardDescription>
              Complete your profile to unlock all features and improve your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={profile.profileCompletion?.percentage || 0} className="flex-1" />
              <span className="font-medium">{profile.profileCompletion?.percentage || 0}%</span>
            </div>
            {profile.profileCompletion?.missingFields && profile.profileCompletion.missingFields.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Missing fields:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.profileCompletion.missingFields.map((field: any, idx: number) => (
                    <Badge 
                      key={idx} 
                      variant={field.importance === 'required' ? 'destructive' : field.importance === 'recommended' ? 'default' : 'secondary'}
                    >
                      {field.field} ({field.importance})
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* KYC Status Card */}
      {profile?.kycStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verification Status
            </CardTitle>
            <CardDescription>
              Your account verification and compliance status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>KYC Status</Label>
                <div className="mt-1">
                  <Badge className={subscriberProfileService.getKycStatusColor(profile.kycStatus.status || 'not_started')}>
                    {subscriberProfileService.formatKycStatus(profile.kycStatus.status || 'not_started')}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Verification Level</Label>
                <div className="mt-1">
                  <Badge className={subscriberProfileService.getKycLevelColor(profile.kycStatus.level || 'none')}>
                    {subscriberProfileService.formatKycLevel(profile.kycStatus.level || 'none')}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Completed Steps</Label>
                <div className="mt-1">
                  <span className="text-sm">{profile.kycStatus.completedSteps?.length || 0} steps completed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your basic personal details
                  </CardDescription>
                </div>
                {editingSection === 'personal' ? (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditingSection('')}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSaveSection('personal')} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setEditingSection('personal')}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName || ''}
                    onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                    disabled={editingSection !== 'personal'}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName || ''}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                    disabled={editingSection !== 'personal'}
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={personalInfo.middleName || ''}
                    onChange={(e) => setPersonalInfo({...personalInfo, middleName: e.target.value})}
                    disabled={editingSection !== 'personal'}
                    placeholder="Enter your middle name (optional)"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalInfo.dateOfBirth ? personalInfo.dateOfBirth.split('T')[0] : ''}
                    onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                    disabled={editingSection !== 'personal'}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={personalInfo.gender || ''}
                    onValueChange={(value) => setPersonalInfo({...personalInfo, gender: value as any})}
                    disabled={editingSection !== 'personal'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={personalInfo.nationality || ''}
                    onChange={(e) => setPersonalInfo({...personalInfo, nationality: e.target.value})}
                    disabled={editingSection !== 'personal'}
                    placeholder="Enter your nationality"
                  />
                </div>
                <div>
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={personalInfo.maritalStatus || ''}
                    onValueChange={(value) => setPersonalInfo({...personalInfo, maritalStatus: value as any})}
                    disabled={editingSection !== 'personal'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="separated">Separated</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    min="0"
                    value={personalInfo.dependents || ''}
                    onChange={(e) => setPersonalInfo({...personalInfo, dependents: parseInt(e.target.value) || 0})}
                    disabled={editingSection !== 'personal'}
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Update your contact details and addresses
                  </CardDescription>
                </div>
                {editingSection === 'contact' ? (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditingSection('')}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSaveSection('contact')} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setEditingSection('contact')}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Phone Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primaryPhone">Primary Phone</Label>
                    <Input
                      id="primaryPhone"
                      value={contactInfo.primaryPhone || ''}
                      onChange={(e) => setContactInfo({...contactInfo, primaryPhone: e.target.value})}
                      disabled={editingSection !== 'contact'}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      value={contactInfo.alternatePhone || ''}
                      onChange={(e) => setContactInfo({...contactInfo, alternatePhone: e.target.value})}
                      disabled={editingSection !== 'contact'}
                      placeholder="+1 (555) 987-6543 (optional)"
                    />
                  </div>
                </div>

                {/* Addresses */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label>Addresses</Label>
                    {editingSection === 'contact' && (
                      <Button variant="outline" size="sm" onClick={addAddress}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Address
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {(contactInfo.addresses || []).map((address: Address, idx: number) => (
                      <Card key={idx} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Street Address</Label>
                            <Input
                              value={address.street || ''}
                              onChange={(e) => updateAddress(idx, 'street', e.target.value)}
                              disabled={editingSection !== 'contact'}
                              placeholder="123 Main Street"
                            />
                          </div>
                          <div>
                            <Label>City</Label>
                            <Input
                              value={address.city || ''}
                              onChange={(e) => updateAddress(idx, 'city', e.target.value)}
                              disabled={editingSection !== 'contact'}
                              placeholder="New York"
                            />
                          </div>
                          <div>
                            <Label>State</Label>
                            <Input
                              value={address.state || ''}
                              onChange={(e) => updateAddress(idx, 'state', e.target.value)}
                              disabled={editingSection !== 'contact'}
                              placeholder="NY"
                            />
                          </div>
                          <div>
                            <Label>Postal Code</Label>
                            <Input
                              value={address.postalCode || ''}
                              onChange={(e) => updateAddress(idx, 'postalCode', e.target.value)}
                              disabled={editingSection !== 'contact'}
                              placeholder="10001"
                            />
                          </div>
                          <div>
                            <Label>Country</Label>
                            <Input
                              value={address.country || ''}
                              onChange={(e) => updateAddress(idx, 'country', e.target.value)}
                              disabled={editingSection !== 'contact'}
                              placeholder="United States"
                            />
                          </div>
                          <div>
                            <Label>Address Type</Label>
                            <Select
                              value={address.type || 'home'}
                              onValueChange={(value) => updateAddress(idx, 'type', value)}
                              disabled={editingSection !== 'contact'}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="home">Home</SelectItem>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="billing">Billing</SelectItem>
                                <SelectItem value="shipping">Shipping</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Switch
                            checked={address.isPrimary || false}
                            onCheckedChange={(checked) => updateAddress(idx, 'isPrimary', checked)}
                            disabled={editingSection !== 'contact'}
                          />
                          <Label>Primary Address</Label>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employment Tab */}
        <TabsContent value="employment">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employment Information</CardTitle>
                  <CardDescription>
                    Update your employment and income details
                  </CardDescription>
                </div>
                {editingSection === 'employment' ? (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditingSection('')}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSaveSection('employment')} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setEditingSection('employment')}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Select
                    value={employment.employmentStatus || ''}
                    onValueChange={(value) => setEmployment({...employment, employmentStatus: value as any})}
                    disabled={editingSection !== 'employment'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self_employed">Self Employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employer">Employer</Label>
                  <Input
                    id="employer"
                    value={employment.employer || ''}
                    onChange={(e) => setEmployment({...employment, employer: e.target.value})}
                    disabled={editingSection !== 'employment'}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={employment.jobTitle || ''}
                    onChange={(e) => setEmployment({...employment, jobTitle: e.target.value})}
                    disabled={editingSection !== 'employment'}
                    placeholder="Your job title"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={employment.industry || ''}
                    onChange={(e) => setEmployment({...employment, industry: e.target.value})}
                    disabled={editingSection !== 'employment'}
                    placeholder="Technology, Finance, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="annualIncome">Annual Income (USD)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    min="0"
                    value={employment.annualIncome?.amount || ''}
                    onChange={(e) => setEmployment({
                      ...employment, 
                      annualIncome: {
                        ...employment.annualIncome,
                        amount: parseInt(e.target.value) || 0,
                        currency: 'USD'
                      }
                    })}
                    disabled={editingSection !== 'employment'}
                    placeholder="50000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Profile Tab */}
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Financial Profile</CardTitle>
                  <CardDescription>
                    Investment experience and financial information
                  </CardDescription>
                </div>
                {editingSection === 'financial' ? (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditingSection('')}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSaveSection('financial')} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setEditingSection('financial')}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Investment Experience</Label>
                  <Select
                    value={financialProfile.investmentExperience || ''}
                    onValueChange={(value) => setFinancialProfile({...financialProfile, investmentExperience: value as any})}
                    disabled={editingSection !== 'financial'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="limited">Limited</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="extensive">Extensive</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Risk Tolerance</Label>
                  <Select
                    value={financialProfile.riskTolerance || ''}
                    onValueChange={(value) => setFinancialProfile({...financialProfile, riskTolerance: value as any})}
                    disabled={editingSection !== 'financial'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="very_aggressive">Very Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Investment Time Horizon</Label>
                  <Select
                    value={financialProfile.timeHorizon || ''}
                    onValueChange={(value) => setFinancialProfile({...financialProfile, timeHorizon: value as any})}
                    disabled={editingSection !== 'financial'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time horizon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short_term">Short Term (&lt; 3 years)</SelectItem>
                      <SelectItem value="medium_term">Medium Term (3-10 years)</SelectItem>
                      <SelectItem value="long_term">Long Term (&gt; 10 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            {/* Communication Preferences */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Communication Preferences</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications and communications
                    </CardDescription>
                  </div>
                  {editingSection === 'communication' ? (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setEditingSection('')}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleSaveSection('communication')} disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => setEditingSection('communication')}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Preferred Language</Label>
                      <Input
                        value={communicationPrefs.preferredLanguage || 'en'}
                        onChange={(e) => setCommunicationPrefs({...communicationPrefs, preferredLanguage: e.target.value})}
                        disabled={editingSection !== 'communication'}
                        placeholder="en"
                      />
                    </div>
                    <div>
                      <Label>Timezone</Label>
                      <Input
                        value={communicationPrefs.timezone || 'America/New_York'}
                        onChange={(e) => setCommunicationPrefs({...communicationPrefs, timezone: e.target.value})}
                        disabled={editingSection !== 'communication'}
                        placeholder="America/New_York"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Email Notifications</Label>
                    <div className="mt-2 space-y-3">
                      {[
                        { key: 'marketing', label: 'Marketing emails' },
                        { key: 'transactional', label: 'Transaction notifications' },
                        { key: 'security', label: 'Security alerts' },
                        { key: 'newsletter', label: 'Newsletter' },
                        { key: 'promotions', label: 'Promotions and offers' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                          <Switch
                            checked={communicationPrefs.emailNotifications?.[item.key as keyof typeof communicationPrefs.emailNotifications] || false}
                            onCheckedChange={(checked) => setCommunicationPrefs({
                              ...communicationPrefs,
                              emailNotifications: {
                                ...communicationPrefs.emailNotifications,
                                [item.key]: checked
                              }
                            })}
                            disabled={editingSection !== 'communication'}
                          />
                          <Label>{item.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Preferences */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Privacy Preferences</CardTitle>
                    <CardDescription>
                      Control your data privacy and sharing settings
                    </CardDescription>
                  </div>
                  {editingSection === 'privacy' ? (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setEditingSection('')}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleSaveSection('privacy')} disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => setEditingSection('privacy')}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>Profile Visibility</Label>
                    <Select
                      value={privacyPrefs.profileVisibility || 'private'}
                      onValueChange={(value) => setPrivacyPrefs({...privacyPrefs, profileVisibility: value as any})}
                      disabled={editingSection !== 'privacy'}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="contacts_only">Contacts Only</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Data Sharing</Label>
                    <div className="mt-2 space-y-3">
                      {[
                        { key: 'analytics', label: 'Analytics data for improving service' },
                        { key: 'marketing', label: 'Marketing and personalization' },
                        { key: 'thirdParty', label: 'Share with trusted third parties' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                          <Switch
                            checked={privacyPrefs.dataSharing?.[item.key as keyof typeof privacyPrefs.dataSharing] || false}
                            onCheckedChange={(checked) => setPrivacyPrefs({
                              ...privacyPrefs,
                              dataSharing: {
                                ...privacyPrefs.dataSharing,
                                [item.key]: checked
                              }
                            })}
                            disabled={editingSection !== 'privacy'}
                          />
                          <Label>{item.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Identity Documents</CardTitle>
                  <CardDescription>
                    Manage your identity verification documents
                  </CardDescription>
                </div>
                <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={resetDocumentForm}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Identity Document</DialogTitle>
                      <DialogDescription>
                        Add a new identity document for verification.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="docType">Document Type</Label>
                        <Select
                          value={documentForm.type}
                          onValueChange={(value) => setDocumentForm({...documentForm, type: value as any})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="drivers_license">Driver's License</SelectItem>
                            <SelectItem value="national_id">National ID</SelectItem>
                            <SelectItem value="ssn_last4">SSN (Last 4 digits)</SelectItem>
                            <SelectItem value="tax_id">Tax ID</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="docNumber">Document Number</Label>
                        <Input
                          id="docNumber"
                          value={documentForm.number}
                          onChange={(e) => setDocumentForm({...documentForm, number: e.target.value})}
                          placeholder="Enter document number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="issuingCountry">Issuing Country</Label>
                        <Input
                          id="issuingCountry"
                          value={documentForm.issuingCountry}
                          onChange={(e) => setDocumentForm({...documentForm, issuingCountry: e.target.value})}
                          placeholder="United States"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="issueDate">Issue Date</Label>
                          <Input
                            id="issueDate"
                            type="date"
                            value={documentForm.issueDate}
                            onChange={(e) => setDocumentForm({...documentForm, issueDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            value={documentForm.expiryDate}
                            onChange={(e) => setDocumentForm({...documentForm, expiryDate: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddDocument}>
                        Add Document
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile?.identityDocuments?.length ? (
                  profile.identityDocuments.map((doc: IdentityDocument, idx: number) => (
                    <Card key={idx} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium capitalize">{doc.type.replace('_', ' ')}</h4>
                          <p className="text-sm text-muted-foreground">
                            {doc.issuingCountry && `Issued in ${doc.issuingCountry}`}
                            {doc.expiryDate && ` • Expires ${new Date(doc.expiryDate).toLocaleDateString()}`}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowSensitiveData(!showSensitiveData)}
                            >
                              {showSensitiveData ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                            {showSensitiveData && doc.number && (
                              <span className="text-sm font-mono">{doc.number}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={doc.isVerified ? "default" : "outline"}>
                            {doc.isVerified ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Verified
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Pending
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Documents Added</h3>
                    <p className="text-muted-foreground mb-4">
                      Add your identity documents to complete the verification process.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function MyProfile() {
  return (
    <ProtectedRoute>
      <MyProfileContent />
    </ProtectedRoute>
  );
}
