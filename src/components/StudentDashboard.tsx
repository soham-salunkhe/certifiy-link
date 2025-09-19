import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface StudentDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

interface Certificate {
  id: string;
  name: string;
  institution: string;
  uploadDate: string;
  status: "verified" | "pending" | "failed";
  hash: string;
}

export const StudentDashboard = ({ userEmail, onLogout }: StudentDashboardProps) => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "1",
      name: "Bachelor of Computer Science",
      institution: "MIT",
      uploadDate: "2024-01-15",
      status: "verified",
      hash: "a1b2c3d4e5f6..."
    },
    {
      id: "2", 
      name: "Data Science Certificate",
      institution: "Stanford University",
      uploadDate: "2024-01-10",
      status: "pending",
      hash: "x1y2z3a4b5c6..."
    }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate processing
    setTimeout(() => {
      const newCert: Certificate = {
        id: Date.now().toString(),
        name: files[0].name.replace('.pdf', ''),
        institution: "Detected automatically",
        uploadDate: new Date().toISOString().split('T')[0],
        status: "pending",
        hash: Math.random().toString(36).substring(2, 15) + "..."
      };

      setCertificates(prev => [newCert, ...prev]);
      setIsUploading(false);
      setUploadProgress(0);

      toast({
        title: "Certificate uploaded successfully",
        description: "Your certificate is being processed for verification.",
      });
    }, 2000);
  };

  const getStatusIcon = (status: Certificate["status"]) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Certificate["status"]) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success-light text-success">Verified</Badge>;
      case "pending":
        return <Badge className="bg-warning-light text-warning">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <Badge variant="outline">{userEmail}</Badge>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Certificate</TabsTrigger>
            <TabsTrigger value="certificates">My Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload New Certificate
                </CardTitle>
                <CardDescription>
                  Upload your academic certificates for verification. Supported formats: PDF, JPG, PNG
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="certificate-upload">Certificate File</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Drop your certificate here</p>
                      <p className="text-muted-foreground">or click to browse</p>
                      <Input
                        id="certificate-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isUploading}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('certificate-upload')?.click()}
                        disabled={isUploading}
                        className="mt-4"
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading and processing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="bg-primary/5 rounded-lg p-4">
                  <h4 className="font-medium mb-2">What happens after upload?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Metadata extraction and analysis</li>
                    <li>• Cryptographic hash generation</li>
                    <li>• Cross-verification with institutional databases</li>
                    <li>• QR code validation (if present)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <div className="space-y-4">
              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    My Certificates ({certificates.length})
                  </CardTitle>
                  <CardDescription>
                    View and manage your uploaded certificates
                  </CardDescription>
                </CardHeader>
              </Card>

              {certificates.map((cert) => (
                <Card key={cert.id} className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{cert.name}</h3>
                          {getStatusIcon(cert.status)}
                        </div>
                        <p className="text-muted-foreground">{cert.institution}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Uploaded: {cert.uploadDate}</span>
                          <span>Hash: {cert.hash}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(cert.status)}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {certificates.length === 0 && (
                <Card className="shadow-[var(--shadow-soft)]">
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No certificates uploaded yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload your first certificate to get started with verification.
                    </p>
                    <Button onClick={() => {}} className="bg-gradient-to-r from-primary to-primary-light">
                      Upload Certificate
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};