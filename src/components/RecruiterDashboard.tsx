import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Shield, CheckCircle, AlertTriangle, FileText, User, Calendar, Hash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RecruiterDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

interface VerificationResult {
  id: string;
  studentName: string;
  studentEmail: string;
  certificateName: string;
  institution: string;
  issueDate: string;
  verificationDate: string;
  status: "verified" | "invalid" | "tampered";
  confidence: number;
  hash: string;
  metadata: {
    fileSize: string;
    uploadDate: string;
    format: string;
  };
}

export const RecruiterDashboard = ({ userEmail, onLogout }: RecruiterDashboardProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [recentVerifications] = useState<VerificationResult[]>([
    {
      id: "1",
      studentName: "John Doe",
      studentEmail: "john.doe@email.com",
      certificateName: "Bachelor of Computer Science",
      institution: "MIT",
      issueDate: "2023-05-15",
      verificationDate: "2024-01-15",
      status: "verified",
      confidence: 98,
      hash: "a1b2c3d4e5f6789...",
      metadata: {
        fileSize: "2.3 MB",
        uploadDate: "2024-01-10",
        format: "PDF"
      }
    },
    {
      id: "2",
      studentName: "Jane Smith", 
      studentEmail: "jane.smith@email.com",
      certificateName: "Master of Data Science",
      institution: "Stanford University",
      issueDate: "2022-12-10",
      verificationDate: "2024-01-14",
      status: "invalid",
      confidence: 15,
      hash: "x1y2z3a4b5c6789...",
      metadata: {
        fileSize: "1.8 MB",
        uploadDate: "2024-01-12",
        format: "PDF"
      }
    }
  ]);

  const handleVerification = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search query",
        description: "Enter student email or certificate ID to verify.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      const mockResult: VerificationResult = {
        id: Math.random().toString(36),
        studentName: "Alice Johnson",
        studentEmail: searchQuery,
        certificateName: "Bachelor of Engineering",
        institution: "IIT Delhi",
        issueDate: "2023-07-20",
        verificationDate: new Date().toISOString().split('T')[0],
        status: Math.random() > 0.3 ? "verified" : "invalid",
        confidence: Math.floor(Math.random() * 40) + 60,
        hash: Math.random().toString(36).substring(2, 15) + "...",
        metadata: {
          fileSize: "2.1 MB",
          uploadDate: "2024-01-08",
          format: "PDF"
        }
      };

      setVerificationResult(mockResult);
      setIsVerifying(false);

      toast({
        title: "Verification completed",
        description: `Certificate status: ${mockResult.status}`,
        variant: mockResult.status === "verified" ? "default" : "destructive"
      });
    }, 2000);
  };

  const getStatusIcon = (status: VerificationResult["status"]) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "invalid":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "tampered":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
    }
  };

  const getStatusBadge = (status: VerificationResult["status"]) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success-light text-success">Verified</Badge>;
      case "invalid":
        return <Badge variant="destructive">Invalid</Badge>;
      case "tampered":
        return <Badge className="bg-warning-light text-warning">Tampered</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
            <Badge variant="outline">{userEmail}</Badge>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="verify" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verify">Verify Certificate</TabsTrigger>
            <TabsTrigger value="history">Verification History</TabsTrigger>
          </TabsList>

          <TabsContent value="verify">
            <div className="space-y-6">
              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Certificate Verification
                  </CardTitle>
                  <CardDescription>
                    Verify the authenticity of academic certificates by searching student email or certificate ID
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search">Student Email or Certificate ID</Label>
                      <Input
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter student email or certificate ID"
                        onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={handleVerification}
                        disabled={isVerifying}
                        className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary transition-all duration-300"
                      >
                        {isVerifying ? (
                          <>
                            <Shield className="h-4 w-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Verify
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Verification Process</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Hash comparison with stored certificates</li>
                      <li>• Metadata validation and tamper detection</li>
                      <li>• Cross-reference with institutional databases</li>
                      <li>• QR code authentication (if available)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {verificationResult && (
                <Card className="shadow-[var(--shadow-medium)] border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {getStatusIcon(verificationResult.status)}
                        Verification Result
                      </span>
                      {getStatusBadge(verificationResult.status)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Student Information</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{verificationResult.studentName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground text-sm">{verificationResult.studentEmail}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Certificate Details</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{verificationResult.certificateName}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {verificationResult.institution}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              Issued: {verificationResult.issueDate}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Verification Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Confidence Score</span>
                              <span className={`font-bold ${getConfidenceColor(verificationResult.confidence)}`}>
                                {verificationResult.confidence}%
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Hash className="h-4 w-4" />
                              <span className="font-mono text-xs">{verificationResult.hash}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Metadata</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div>Format: {verificationResult.metadata.format}</div>
                            <div>Size: {verificationResult.metadata.fileSize}</div>
                            <div>Uploaded: {verificationResult.metadata.uploadDate}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Verification History ({recentVerifications.length})
                </CardTitle>
                <CardDescription>
                  Recent certificate verifications performed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVerifications.map((verification) => (
                    <Card key={verification.id} className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{verification.studentName}</h4>
                              {getStatusIcon(verification.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {verification.certificateName} - {verification.institution}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Verified: {verification.verificationDate}</span>
                              <span className={getConfidenceColor(verification.confidence)}>
                                Confidence: {verification.confidence}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(verification.status)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {recentVerifications.length === 0 && (
                    <div className="text-center py-12">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No verifications yet</h3>
                      <p className="text-muted-foreground">
                        Start verifying certificates to see your history here.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};