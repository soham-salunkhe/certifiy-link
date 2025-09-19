import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Upload, Search, CheckCircle, GraduationCap, Users, Settings } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: Upload,
      title: "Upload Certificates",
      description: "Students can securely upload their academic certificates and documents for verification."
    },
    {
      icon: Search,
      title: "Instant Verification",
      description: "Recruiters can quickly verify the authenticity of certificates using advanced hash comparison."
    },
    {
      icon: CheckCircle,
      title: "Fraud Detection",
      description: "Our system detects tampered or fake certificates by cross-verifying metadata and hashes."
    }
  ];

  const roles = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Upload and verify your academic certificates to build trust with potential employers.",
      color: "from-primary to-primary-light"
    },
    {
      icon: Users,
      title: "Recruiters",
      description: "Verify candidate certificates instantly to make confident hiring decisions.",
      color: "from-success to-success/80"
    },
    {
      icon: Settings,
      title: "Administrators",
      description: "Manage institutional records and maintain the certificate database.",
      color: "from-warning to-warning/80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-light">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CertVerify</span>
          </div>
          <Button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-[var(--shadow-soft)]"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary-dark bg-clip-text text-transparent">
              Academic Certificate Authentication
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure, fast, and reliable verification system to detect fake academic certificates and build trust in education credentials.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-[var(--shadow-medium)] text-lg px-8 py-6"
            >
              Start Verifying
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our advanced verification system uses cryptographic hashing and metadata analysis to ensure certificate authenticity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-[var(--shadow-medium)] transition-all duration-300 border-0 shadow-[var(--shadow-soft)]">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary/10 to-primary-light/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Who Can Use CertVerify?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform serves multiple stakeholders in the education and recruitment ecosystem.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-[var(--shadow-medium)] transition-all duration-300 border-0 shadow-[var(--shadow-soft)]">
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-5`} />
              <CardHeader className="relative">
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${role.color}`}>
                  <role.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-center">{role.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base text-center">
                  {role.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary/10 via-primary-light/5 to-primary/10 border-primary/20 shadow-[var(--shadow-strong)]">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students, recruiters, and institutions who trust CertVerify for secure certificate authentication.
            </p>
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-[var(--shadow-medium)] text-lg px-8 py-6"
            >
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 CertVerify. Securing academic credentials with technology.</p>
        </div>
      </footer>
    </div>
  );
};