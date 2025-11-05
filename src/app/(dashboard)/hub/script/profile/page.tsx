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
  Trash2
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

export default function ScriptProfilePage() {
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
      const profileResponse = await subscriberProfileService.getMyProfile();
      if (profileResponse.success && profileResponse.data) {
        setProfile(profileResponse.data);
        setFormData(profileResponse.data);
      }

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
        await loadProfile();
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
        await loadProfile();
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

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-6 h-6 text-amber-400" />
                  Script Hub Profile
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Manage your Script Hub profile and documents
                </CardDescription>
              </div>
              <Button
                onClick={() => editMode ? updateProfile() : setEditMode(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white"
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

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="personal" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-amber-600">
              Personal
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-amber-600">
              Contact
            </TabsTrigger>
            <TabsTrigger value="employment" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-amber-600">
              Employment
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-amber-600">
              Financial
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-amber-600">
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-slate-300">
                  Your basic personal details for identity verification
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Identity Documents
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Upload identity documents for verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-white">Upload Documents</p>
                      <p className="text-slate-400">Drag and drop files or click to browse</p>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="file"
                        id="documentUploadScript"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, 'passport');
                          }
                        }}
                      />
                      <Button 
                        onClick={() => document.getElementById('documentUploadScript')?.click()}
                        className="bg-amber-600 hover:bg-amber-700"
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Uploading...</span>
                      <span className="text-amber-400">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2 bg-slate-700" />
                  </div>
                )}

                {documents.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Uploaded Documents</h4>
                    <div className="grid gap-4">
                      {documents.map((document) => (
                        <Card key={document.id} className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="w-8 h-8 text-amber-400" />
                                <div>
                                  <p className="font-medium text-white">{document.filename}</p>
                                  <p className="text-sm text-slate-300">
                                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)} • 
                                    {(document.fileSize / 1024 / 1024).toFixed(2)} MB • 
                                    Uploaded {new Date(document.uploadedAt).toLocaleDateString()}
                                  </p>
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

                <Alert className="bg-slate-900/50 border-slate-700">
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                  <AlertDescription className="text-slate-300">
                    <strong>Document Requirements:</strong>
                    <ul className="mt-1 list-disc list-inside space-y-1 text-sm">
                      <li>Supported formats: JPG, PNG, PDF</li>
                      <li>Maximum file size: 5MB</li>
                      <li>Documents must be clear and legible</li>
                      <li>Valid government-issued ID required</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
